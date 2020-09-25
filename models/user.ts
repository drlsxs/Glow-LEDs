import mongoose from 'mongoose';
export {};
// const mongoose = require('mongoose');

const cartSchema = {
	cartItems: { type: Array },
	deleted: { type: Boolean, default: false }
};

const userSchema = new mongoose.Schema(
	{
		first_name: { type: String, required: true },
		last_name: { type: String },
		email: {
			type: String,
			required: true,
			unique: true,
			index: true,
			dropDups: true
		},
		password: { type: String, required: true },
		isAdmin: { type: Boolean, required: true, default: false },
		isVerified: { type: Boolean, required: true, default: false },
		is_sponsored: { type: Boolean, required: true, default: false },
		cart: cartSchema,
		sponsor: { type: mongoose.Schema.Types.ObjectId, ref: 'Sponsor' },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const userModel = mongoose.model('User', userSchema);

export default userModel;

// module.exports = userModel;
