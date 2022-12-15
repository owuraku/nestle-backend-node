const { checkSchema, validationResult } = require('express-validator');
const { ObjectId } = require('mongoose').Types;

const checkForErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

const validateSchemaFn = (schema) => {
	return [checkSchema(schema), checkForErrors];
};

const validateMongoId = () => {
	return (req, res, next) => {
		const { id } = req.params;
		const isValidMongoId = ObjectId.isValid(id);
		if (isValidMongoId) {
			return next();
		}
		res.status(400).send({ error: { message: 'Invalid MongoId' } });
	};
};

module.exports = { validateMongoId, validateSchemaFn };
