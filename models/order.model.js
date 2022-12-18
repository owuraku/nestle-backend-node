const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
	{
		orderId: {
			type: Number,
			required: true,
			unique: true,
		},
		userId: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			required: true,
		},
		products: [
			{
				productId: {
					type: String,
				},
				quantity: {
					type: Number,
					default: 1,
				},
				unitPrice: {
					type: Number,
					required: true,
					default: 0,
				},
				totalPrice: {
					type: Number,
					required: true,
					default: 0,
				},
			},
		],
		pickUpPoint: {
			type: Object,
			required: true,
		},
		status: {
			type: String,
			default: 'pending',
		},
		deliveryDate: {
			type: Date,
			required: true,
		},
		paymentReference: {
			type: String,
			required: true,
		},
		orderType: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('order', OrderSchema);
