const router = require('express').Router();
const { ProductController: Controller } = require('../controllers');
const ProductValidationSchema = require('../Validators/Product.validator');
const { validateSchema } = require('../middlewares');

router
	.route('/')
	.get(Controller.getAll)
	.post(validateSchema(ProductValidationSchema), Controller.addProduct);

router
	.route('/:id')
	.get(Controller.getOne)
	.patch(Controller.edit)
	.put(Controller.edit)
	.delete(Controller.delete);

module.exports = router;
