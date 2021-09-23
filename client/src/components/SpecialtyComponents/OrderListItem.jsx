// React
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { format_date } from '../../utils/helper_functions';
import useClipboard from 'react-hook-clipboard';
import { createOrder, deleteOrder, listOrders, refundOrder } from '../../actions/orderActions';
import { API_Orders } from '../../utils';
import { LazyImage, Loading } from '../UtilityComponents';
import { determine_product_name } from '../../utils/react_helper_functions';

const OrderListItem = (props) => {
	const dispatch = useDispatch();
	const [ clipboard, copyToClipboard ] = useClipboard();

	const [ refund_state, set_refund_state ] = useState({});
	const [ refund_amount, set_refund_amount ] = useState(0);
	const [ refund_reason, set_refund_reason ] = useState('');
	const [ loading_label, set_loading_label ] = useState(false);

	const orderRefund = useSelector((state) => state.orderRefund);
	const { order: refund } = orderRefund;

	const update_refund_state = () => {
		set_refund_state(true);
		dispatch(refundOrder(props.order, true, refund_amount, refund_reason));
		// }
	};
	useEffect(
		() => {
			if (refund) {
				set_refund_state(refund.isRefunded);
			}
		},
		[ refund ]
	);

	const show_hide = (id) => {
		const row = document.getElementById(id);
		console.log(row);
		row.classList.toggle('hide-row');
	};
	const daysBetween = (date1, date2) => {
		// console.log({ date1: date1.toISOString() });
		// console.log({ date1 });
		// console.log({ date2: new Date(date2).getDay() });

		const diffTime = Math.abs(new Date(date2) - date1);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		// console.log(diffTime + ' milliseconds');
		// console.log(diffDays + ' days');
		return diffDays;
	};

	// function dates(current) {
	// 	const week = new Array();
	// 	// Starting Monday not Sunday
	// 	current.setDate(current.getDate() - current.getDay() + 1);
	// 	for (let i = 0; i < 7; i++) {
	// 		week.push(new Date(current));
	// 		current.setDate(current.getDate() + 1);
	// 	}
	// 	return week;
	// }
	// console.log(dates(new Date(2020, 1, 27)));

	const deleteHandler = (order) => {
		dispatch(deleteOrder(order._id));
	};

	const today = new Date();

	const create_label = async () => {
		set_loading_label(true);
		const { data } = await API_Orders.create_label(props.order, props.order.shipping.shipping_rate);
		window.open(data.postage_label.label_url, '_blank', 'width=600,height=400');
		console.log({ data });
		if (data) {
			set_loading_label(false);
		}
		console.log({ tracking_code: data.tracking_code });
		const request = await API_Orders.add_tracking_number(props.order, data.tracking_code, data);
		console.log(request);
		dispatch(listOrders('', '', '', 1, 10));
	};

	const create_return_label = async () => {
		set_loading_label(true);
		const { data } = await API_Orders.create_return_label(props.order, props.order.shipping.shipping_rate);
		window.open(data.postage_label.label_url, '_blank', 'width=600,height=400');
		console.log({ data });
		if (data) {
			set_loading_label(false);
		}
		console.log({ tracking_code: data.tracking_code });
		const request = await API_Orders.add_return_tracking_number(props.order, data.tracking_code, data);
		console.log(request);
		dispatch(listOrders('', '', '', 1, 10));
	};

	const buy_label = async () => {
		set_loading_label(true);
		const { data } = await API_Orders.buy_label(
			props.order.shipping.shipment_id,
			props.order.shipping.shipping_rate
		);
		window.open(data.postage_label.label_url, '_blank', 'width=600,height=400');
		if (data) {
			set_loading_label(false);
		}
		console.log({ tracking_code: data.tracking_code });
		const request = await API_Orders.add_tracking_number(props.order, data.tracking_code, data);
		console.log(request);
		dispatch(listOrders('', '', '', 1, 10));
	};
	const view_label = async () => {
		window.open(props.order.shipping.shipping_label.postage_label.label_url, '_blank', 'width=600,height=400');
	};
	const view_return_label = async () => {
		window.open(
			props.order.shipping.return_shipping_label.postage_label.label_url,
			'_blank',
			'width=600,height=400'
		);
	};
	// const open_email = async () => {
	// 	window.location.href = "mailto:user@example.com?subject=Subject&body=message%20goes%20here";
	// };

	const sendEmail = (message) => {
		const email = props.order.shipping.email;
		const subject = 'Your Glow LEDs Order';
		const emailBody = 'Hi ' + props.order.user.first_name;
		document.location = 'mailto:' + email + '?subject=' + subject + '&body=' + emailBody;
	};

	const create_duplicate_order = () => {
		console.log({ order: props.order });
		console.log({ user: props.order.user });
		dispatch(
			createOrder({
				orderItems: props.order.orderItems,
				shipping: props.order.shipping,
				itemsPrice: props.order.itemsPrice,
				shippingPrice: 0,
				taxPrice: 0,
				totalPrice: 0,
				user: props.order.user._id,
				order_note: `Replacement Order for ${props.order.shipping.first_name} ${props.order.shipping
					.last_name} - Original Order Number is ${props.order._id}`
			})
		);
		dispatch(listOrders());
	};

	return (
		<div className="home_page_divs" style={{ backgroundColor: props.determine_color(props.order) }} key={props.key}>
			<Loading loading={loading_label} />
			<div className="pb-15px mb-10px row" style={{ borderBottom: '1px solid white' }}>
				<div className="w-50per jc-b ">
					<div className="fs-16px">
						<h3>Order Placed</h3>
						<div>{props.order.createdAt && format_date(props.order.createdAt)}</div>
					</div>
					<div className="fs-16px">
						<h3>Total</h3>
						{!props.order.isRefunded && (
							<div>
								<div>
									${props.order.totalPrice ? (
										props.order.totalPrice.toFixed(2)
									) : (
										props.order.totalPrice
									)}
								</div>
							</div>
						)}
						{props.order.isRefunded && (
							<div>
								<del style={{ color: 'red' }}>
									<label style={{ color: 'white' }}>
										<div>
											${props.order.totalPrice ? (
												props.order.totalPrice.toFixed(2)
											) : (
												props.order.totalPrice
											)}
										</div>
									</label>
								</del>
							</div>
						)}
						{props.order.isRefunded && (
							<div>
								<div>
									-${(props.order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100).toFixed(2)}
								</div>
							</div>
						)}
						{props.order.isRefunded && (
							<div>
								<div>
									${(props.order.totalPrice -
										props.order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100).toFixed(2)}
								</div>
							</div>
						)}
					</div>
					{props.admin && (
						<div className="fs-16px">
							<h3>Since Order</h3>
							{daysBetween(today, props.order.createdAt) > 1 ? (
								`${daysBetween(today, props.order.createdAt)} Days`
							) : (
								`${daysBetween(today, props.order.createdAt)} Day`
							)}
						</div>
					)}
					<div className="fs-16px">
						<h3>Ship To</h3>
						<Link to={`/secure/glow/userprofile/${props.order.user && props.order.user._id}`}>
							{props.order.shipping.first_name} {props.order.shipping.last_name}
						</Link>
					</div>
				</div>
				<div className="w-50per jc-fe">
					<div className="">
						<div className="fs-16px">
							<div className="row ai-c">
								<h3 className="mr-10px">Order Number: </h3>
								<div>{props.order._id}</div>
							</div>
							{props.order.tracking_number && (
								<div className="row ai-c mb-2rem">
									<h3 className="mr-10px  mv-0px">Tracking Number: </h3>
									<div className="mt-0px">
										{' '}
										<a
											href={
												'https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=' +
												props.order.tracking_number
											}
											target="_blank"
											rel="noopener noreferrer"
											className="mv-2rem"
											style={{
												textDecoration: 'underline',
												color: 'white'
											}}
										>
											{props.order.tracking_number}
										</a>
									</div>
								</div>
							)}
						</div>
						<div className="row fs-16px jc-b ai-c">
							<Link to={'/secure/account/order/' + props.order._id}>
								<button className="btn primary">Order Details</button>
							</Link>
							<div>|</div>
							<button className="btn secondary">
								<Link to={'/secure/glow/emails/invoice/' + props.order._id}>View Invoice</Link>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="row ">
				<div className="small_screen_order jc-b ">
					<div className="wrap">
						{props.order.orderItems.map((item, index) => {
							return (
								<div className="row mt-15px" key={index}>
									<div className="column ai-c pos-rel">
										<Link to={'/collections/all/products/' + item.pathname}>
											<div className="">
												{!item.secondary_image && (
													<LazyImage
														className="order-image br-10px mr-15px w-70px h-70px"
														alt={item.name}
														title="Product Image"
														effect="blur"
														src={item.display_image && item.display_image}
													/>
												)}
												{item.secondary_image && (
													<div
														className={`double-image-cart-${item.name &&
														item.name.split('-')[1]
															? 'vertical'
															: ''} row`}
													>
														<LazyImage
															id="expandedImg"
															alt={item.name}
															title={item.name}
															className={`details-image-cart-${item.name &&
															item.name.split('-')[1]
																? 'top'
																: 'left'} m-0px`}
															src={item.display_image}
														/>
														<LazyImage
															id="expandedSecondaryImg"
															alt={item.name}
															title={item.name}
															className={`details-image-cart-${item.name &&
															item.name.split('-')[1]
																? 'bottom'
																: 'right'} `}
															src={item.secondary_image}
														/>
													</div>
												)}
											</div>
										</Link>
										{item.qty > 1 && (
											<div
												className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c bottom-0px right-5px"
												style={{
													backgroundColor: 'white',
													color: 'black',
													border: '1px solid #ccc'
												}}
											>
												<div className="mt-3px ml-2px">{item.qty}</div>
											</div>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="small_screen_order jc-b">
					<div className="mv-auto">
						{props.order.orderItems.map((item, index) => {
							return <div key={index}>{determine_product_name(item, true, props.order.createdAt)}</div>;
						})}
					</div>
				</div>
				<Link
					to={'/collections/all/products/category/' + props.order.orderItems[0].category}
					className="ai-c ml-1rem"
				>
					<button className="btn primary">Buy Again</button>
				</Link>
				{props.admin && (
					<div className="jc-fe column ml-auto ">
						<button className="btn icon h-3rem " onClick={() => show_hide(props.order._id)}>
							<i style={{ WebkitTransform: 'rotate(-180deg)' }} className="top-8px fas fa-sort-up" />
						</button>
					</div>
				)}
			</div>

			{props.admin && (
				<div id={props.order._id} className="expanded-row-content hide-row">
					<div className="jc-b pt-10px mt-10px" style={{ borderTop: '1px solid white' }}>
						<div className=" ">
							<h2>Shipping</h2>
							<div className="paragraph_font lh-25px">
								<div>
									{props.order.shipping.first_name} {props.order.shipping.last_name}
								</div>
								<div>
									{props.order.shipping.address_1} {props.order.shipping.address_2}
								</div>
								<div>
									{props.order.shipping.city}, {props.order.shipping.state}{' '}
									{props.order.shipping.postalCode}
								</div>
								<div>{props.order.shipping.country}</div>
								<div>{props.order.shipping.international && 'International'}</div>
								<div>{props.order.shipping.email}</div>
							</div>
						</div>
						<div className="column jc-b h-10rem w-20rem ml-1rem">
							<h2>Order Status</h2>
							<div>
								<div className="row ai-c">
									<div className="mv-5px">
										{props.order.isPaid ? (
											<i className="fas fa-check-circle" />
										) : (
											<i className="fas fa-times-circle" />
										)}
									</div>
									<div className="mh-10px">Paid</div>
									<div>{!props.order.paidAt ? '' : format_date(props.order.paidAt)}</div>
								</div>
							</div>
							<div>
								<div className="row ai-c">
									<div className="mv-5px">
										{props.order.isManufactured ? (
											<i className="fas fa-check-circle" />
										) : (
											<i className="fas fa-times-circle" />
										)}
									</div>
									<div className="mh-10px">Manufactured</div>

									<div>
										{!props.order.manufacturedAt ? '' : format_date(props.order.manufacturedAt)}
									</div>
								</div>
							</div>
							<div>
								<div className="row ai-c">
									<div className="mv-5px">
										{props.order.isPackaged ? (
											<i className="fas fa-check-circle" />
										) : (
											<i className="fas fa-times-circle" />
										)}
									</div>
									<div className="mh-10px">Packaged</div>

									<div>{!props.order.packagedAt ? '' : format_date(props.order.packagedAt)}</div>
								</div>
							</div>
							<div>
								<div className="row ai-c">
									<div className="mv-5px">
										{props.order.isShipped ? (
											<i className="fas fa-check-circle" />
										) : (
											<i className="fas fa-times-circle" />
										)}
									</div>
									<div className="mh-10px">Shipped</div>

									<div>{!props.order.shippedAt ? '' : format_date(props.order.shippedAt)}</div>
								</div>
							</div>
							<div>
								<div className="row ai-c">
									<div className="mv-5px row">
										{props.order.isDelivered ? (
											<i className="fas fa-check-circle" />
										) : (
											<i className="fas fa-times-circle" />
										)}
									</div>
									<div className="mh-10px">Delivered</div>

									<div>{!props.order.deliveredAt ? '' : format_date(props.order.deliveredAt)}</div>
								</div>
							</div>
						</div>
						<ul className="m-0px">
							<h2>Meta Data</h2>
							<li className="row mv-2rem">
								<label className="phrase_font">Payment Method </label>
								<label className="ml-1rem">{props.order.payment.paymentMethod}</label>
							</li>
							<li className="row mv-2rem">
								<label className="phrase_font">Order Note: </label>
								<label className="ml-1rem">{props.order.order_note}</label>
							</li>
							<li className="row mv-2rem">
								<label className="phrase_font">Promo Code: </label>
								<label className="ml-1rem">{props.order.promo_code}</label>
							</li>
							<li className="row">
								<label className="phrase_font">Tracking Number: </label>

								<a
									href={
										'https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=' +
										props.order.tracking_number
									}
									target="_blank"
									rel="noopener noreferrer"
									className="mv-2rem ml-1rem"
									style={{
										textDecoration: 'underline',
										color: 'white'
									}}
								>
									{props.order.tracking_number}
								</a>
							</li>
							{props.order.return_tracking_number && (
								<li className="row">
									<label className="phrase_font">Return Tracking Number: </label>

									<a
										href={
											'https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=' +
											props.order.return_tracking_number
										}
										target="_blank"
										rel="noopener noreferrer"
										className="mv-2rem ml-1rem"
										style={{
											textDecoration: 'underline',
											color: 'white'
										}}
									>
										{props.order.return_tracking_number}
									</a>
								</li>
							)}

							{props.order.guest && (
								<li className="row">
									<label className="phrase_font">
										Guest Order: {props.order.guest ? 'True' : 'False'}{' '}
									</label>
								</li>
							)}
						</ul>

						<div className="jc-b">
							<div className="column w-25rem">
								{props.order.shipping.shipping_label && (
									<button className="btn secondary mv-5px" onClick={() => view_label()}>
										View Label
									</button>
								)}
								{props.order.shipping.return_shipping_label && (
									<button className="btn secondary mv-5px" onClick={() => view_return_label()}>
										View Return Label
									</button>
								)}
								<button className="btn secondary w-100per mv-10px" onClick={() => sendEmail('Hello')}>
									Send User a Message
								</button>
								<button
									className="btn secondary mv-5px"
									onClick={() => create_duplicate_order(props.order._id)}
								>
									Create Duplicate Order
								</button>
								<button className="btn secondary mv-5px">
									<Link to={'/secure/glow/editorder/' + props.order._id}>Edit Order</Link>
								</button>

								<button
									className="btn secondary mv-5px"
									onClick={() => dispatch(deleteOrder(props.order._id))}
								>
									Delete Order
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default OrderListItem;
