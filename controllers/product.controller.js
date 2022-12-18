const { Product } = require('../models');

class ProductController {
	async getAll(req, res) {
		try {
			const products = await Product.find().exec();
			res.send({ data: products });
		} catch (err) {
			console.log(err);
			res.send({ data: [], message: err.message });
		}
	}

	async addProduct(req, res) {
		const product = new Product({
			name: req.body.name,
			sku: req.body.sku,
			quantity: req.body.quantity,
			createdBy: req.body.createdBy,
		});

		const savedProduct = await product.save().catch((err) => {
			return res.status(400).send({ message: 'Unable to save' });
		});
		res.status(201).send(savedProduct);
	}

	async getOne(req, res) {
		const { id } = req.params;
		const foundProduct = await Product.findById(id);
		if (foundProduct) {
			return res.send(foundProduct);
		}
		return res
			.status(404)
			.send({ message: `Product with id ${id} not found` });
	}

	async edit(req, res) {
		const { id } = req.params;
		const foundProduct = await Product.findById(id);
		if (!foundProduct) {
			return res.send({ message: `Product with id ${id} not found` });
		}
		const newData = new Product({
			name: req.body.name,
			sku: req.body.sku,
			quantity: req.body.quantity,
			createdBy: req.body.createdBy,
		});
		const updatedProduct = await Product.findIdAndUpdate(id, newData, {
			new: true,
		}).catch((err) => {
			return res
				.status(400)
				.send({ message: `Product with id ${id} updated successfully` });
		});
		return res.status(400).send(updatedProduct);
	}

	async delete(req, res) {
		const { id } = req.params;
		const deleted = await Product.findById(id);
		if (deleted) {
			return res.send('Deleted successfully');
		}
		return res
			.status(404)
			.send({ message: `Unable to delete product with id ${id}` });
	}
}
module.exports = new ProductController();
