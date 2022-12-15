const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
	// check if the request has a token
	try {
		const token = req.headers.authorization?.split(' ')[1];
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decoded;
	} catch (error) {
		return res.status(401).send({ message: 'User not authenticated' });
	}
	next();
};

module.exports = {
	authMiddleware,
};
