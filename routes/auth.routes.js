const router = require('express').Router();
const { AuthController } = require('../controllers');
const { validateSchema, authMiddleware } = require('../middlewares');
const { UserValidationSchema } = require('../validators');

router.post('/login', AuthController.login);
router.post(
	'/register',
	validateSchema(UserValidationSchema),
	AuthController.register
);
router.get('/verify', AuthController.verifyEmail);
router.get('/protected', authMiddleware, AuthController.protected);

module.exports = router;
