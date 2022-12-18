//created file
//created file
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		sku: {
			type: String,
			required: true,
			unique: true,
		},
		quantity: {
			type: Number,
			default: 0,
		},
		createdBy: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			required: true,
		},
	});

module.exports = mongoose.model('product', ProductSchema);