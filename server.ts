export {};
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import config from './config';
const config = require('./config');
import { user_routes, product_routes, order_routes, email_routes } from './routes/index';
import Product from './models/product';
import User from './models/user';
// const htmlRoutes = require('./email_templates/html_routes');

mongoose
	.connect(config.RESTORED_MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.catch((error: { reason: any }) => console.log(error.reason));

const app = express();
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', user_routes);
app.use('/api/products', product_routes);
app.use('/api/orders', order_routes);
app.use('/api/emails', email_routes);
// app.use('/', htmlRoutes);
app.get('/api/config/paypal', (req, res) => {
	res.send(config.PAYPAL_CLIENT_ID);
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

// app.put('/api/all', async (req, res) => {
// 	// const product = await Product.updateMany({
// 	// 	// $rename: { shipping_price: 'volume' }
// 	// 	$set: { hidden: true }
// 	// 	// $unset: { shipping_price: 1 }
// 	// });
// 	// res.send(product);
// 	const product = await User.updateMany({ $set: { deleted: false } });
// 	console.log(product);
// 	res.send(product);
// });

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(config.PORT, () => {
	console.log('Server started at http://localhost:5000');
});
