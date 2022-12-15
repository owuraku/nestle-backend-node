const {
	validateSchemaFn,
	validateMongoId,
} = require('./validation.middleware');
const { authMiddleware } = require('./auth.middleware');

module.exports = {
	validateSchema: validateSchemaFn,
	validateMongoId,
	authMiddleware,
};
