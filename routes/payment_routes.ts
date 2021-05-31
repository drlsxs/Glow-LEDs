export {};
const express = require('express');
import Order from '../models/order';
import { log_error, log_request } from '../util';
const { isAuth, isAdmin } = require('../util');
require('dotenv').config();
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

const router = express.Router();

router.put('/:id/pay', isAuth, async (req: any, res: any) => {
	try {
		const order = await Order.findById(req.params.id).populate('user');
		// console.log({ order });
		const intent = await stripe.paymentIntents.create(
			{
				amount: (order.totalPrice * 100).toFixed(0),
				currency: 'usd',
				payment_method_types: [ 'card' ]
			},
			async (err: any, result: any) => {
				if (err) {
					console.log({ err });
					log_error({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Order',
						error: err,
						status: 500,
						success: false,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(500).send({ error: err, message: err.raw.message });
				} else {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Order',
						data: [ result ],
						status: 201,
						success: true,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});

					console.log({ payment_method: req.body.paymentMethod.id });
					await stripe.paymentIntents.confirm(
						result.id,
						{
							payment_method:
								process.env.NODE_ENV === 'production'
									? req.body.paymentMethod.id
									: 'pm_card_' + req.body.paymentMethod.card.brand
						},
						async (err: any, result: any) => {
							if (err) {
								console.log({ err });
								log_error({
									method: 'PUT',
									path: req.originalUrl,
									collection: 'Order',
									error: err,
									status: 500,
									success: false,
									ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
								});
								return res.status(404).send({ error: err, message: err.raw.message });
							} else {
								log_request({
									method: 'PUT',
									path: req.originalUrl,
									collection: 'Order',
									data: [ result ],
									status: 201,
									success: true,
									ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
								});
								order.isPaid = true;
								order.paidAt = Date.now();
								order.payment = {
									paymentMethod: 'stripe',
									charge: result,
									payment: req.body.paymentMethod
								};

								const updatedOrder = await order.save();
								if (updatedOrder) {
									log_request({
										method: 'PUT',
										path: req.originalUrl,
										collection: 'Order',
										data: [ updatedOrder ],
										status: 201,
										success: true,
										ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
									});
									res.send({ message: 'Order Paid.', order: updatedOrder });
								}
								// }
							}
						}
					);
				}
			}
		);
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'Order',
			error,
			status: 500,
			success: false
		});
		console.log({ error });
		res.status(500).send({ error, message: 'Error Paying for Order' });
	}
});

router.put('/guestcheckout/:id/pay', async (req: any, res: any) => {
	try {
		const order = await Order.findById(req.params.id);
		await stripe.paymentIntents.create(
			{
				amount: (order.totalPrice * 100).toFixed(0),
				currency: 'usd',
				payment_method_types: [ 'card' ]
			},
			async (err: any, result: any) => {
				if (err) {
					console.log({ err });
					log_error({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Order',
						error: err,
						status: 500,
						success: false,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(500).send({ error: err, message: err.raw.message });
				} else {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Order',
						data: [ result ],
						status: 201,
						success: true,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					await stripe.paymentIntents.confirm(
						result.id,
						{
							payment_method:
								process.env.NODE_ENV === 'production'
									? req.body.paymentMethod.id
									: 'pm_card_' + req.body.paymentMethod.card.brand
						},
						async (err: any, result: any) => {
							if (err) {
								log_error({
									method: 'PUT',
									path: req.originalUrl,
									collection: 'Order',
									error: err,
									status: 500,
									success: false,
									ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
								});
								return res.status(500).send({ error: err, message: err.raw.message });
							} else {
								log_request({
									method: 'PUT',
									path: req.originalUrl,
									collection: 'Order',
									data: [ result ],
									status: 201,
									success: true,
									ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
								});
								order.isPaid = true;
								order.paidAt = Date.now();
								order.payment = {
									paymentMethod: 'stripe',
									charge: result,
									payment: req.body.paymentMethod
								};
								const updatedOrder = await order.save();
								if (updatedOrder) {
									log_request({
										method: 'PUT',
										path: req.originalUrl,
										collection: 'Order',
										data: [ updatedOrder ],
										status: 201,
										success: true,
										ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
									});
									res.send({ message: 'Order Paid.', order: updatedOrder });
								}
							}
						}
					);
				}
			}
		);
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'Order',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Paying for Order' });
	}
});

router.put('/:id/refund', async (req: any, res: any) => {
	try {
		const order = await Order.findById(req.params.id);
		const refund = await stripe.refunds.create({
			payment_intent: order.payment.charge.id,
			amount: req.body.refund_amount * 100
		});
		if (refund) {
			log_request({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Order',
				data: [ refund ],
				status: 201,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			order.isRefunded = true;
			order.refundedAt = Date.now();
			order.payment = {
				paymentMethod: order.payment.paymentMethod,
				charge: order.payment.charge,
				refund: [ ...order.payment.refund, refund ],
				refund_reason: [ ...order.payment.refund_reason, req.body.refund_reason ]
			};
			const updated = await Order.updateOne({ _id: req.params.id }, order);
			if (updated) {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Order',
					data: [ updated ],
					status: 201,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(updated);
			} else {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Product',
					data: [ updated ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Order not Updated.' });
			}
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'Order',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Refunding Order' });
	}
});

// router.post('/create_stripe_account', async (req: any, res: any) => {
// 	try {
// 		const affiliate = req.body.affiliate;
// 		const account = await stripe.accounts.create({
// 			type: 'express',
// 			country: 'US',
// 			email: affiliate.user.emmail,
// 			capabilities: {
// 				// card_payments: {requested: true},
// 				transfers: { requested: true }
// 			}
// 		});
// 	} catch (error) {
// 		log_error({
// 			method: 'PUT',
// 			path: req.originalUrl,
// 			collection: 'Order',
// 			error,
// 			status: 500,
// 			success: false
// 		});
// 		res.status(500).send({ error, message: 'Error Refunding Order' });
// 	}
// });
// router.post('/create_stripe_account', async (req: any, res: any) => {
// 	try {
// 		const affiliate = req.body.affiliate;
// 		const account = await stripe.accounts.create({
// 			type: 'express',
// 			country: 'US',
// 			email: affiliate.user.emmail,
// 			capabilities: {
// 				// card_payments: {requested: true},
// 				transfers: { requested: true }
// 			}
// 		});
// 	} catch (error) {
// 		log_error({
// 			method: 'PUT',
// 			path: req.originalUrl,
// 			collection: 'Order',
// 			error,
// 			status: 500,
// 			success: false
// 		});
// 		res.status(500).send({ error, message: 'Error Refunding Order' });
// 	}
// });

export default router;
