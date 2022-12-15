const { User } = require('../models');
const { generateToken, decodeToken } = require('../utils');

class AuthController {
	async login(req, res) {
		// take credentials from request
		try {
			const { email, password } = req.body;
			const user = await User.verifyCredentialsAndReturnUser(
				email,
				password
			);
			if (!user) throw Error();
			const accessToken = generateToken(user);
			res.send({
				accessToken,
				message: 'Login successful',
			});
		} catch (error) {
			console.error(error);
			return res.status(400).send({
				message: 'Invalid credentials',
			});
		}
		// if user verification fails

		//  verify that the credentials are correct
		// send a token if it is
	}

	async register(req, res) {
		// take user details from request
		const { name, email, password } = req.body;
		try {
			const user = new User({ name, email, password });
			const savedUser = await user.save();
			const userData = savedUser.toJSON();
			delete userData.password;
			res.send({ message: 'registration successful', data: userData });
		} catch (error) {
			console.log(error);
			res.status(400).send({ message: 'unable to register' });
		}
	}

	// async changePassword(req, res) {}

	// async resetPassword(req, res) {}

	async verifyEmail(req, res) {
		try {
			const { token } = req.query;
			const decodedEmail = decodeToken(token);
			await User.findOneAndUpdate(
				{ email: decodedEmail },
				{ verified: true }
			);
			res.send({ message: 'Email verified' });
		} catch (error) {
			return res.status(400).send({ message: 'Invalid token' });
		}
	}

	async protected(req, res) {
		res.send({ message: 'You need to be logged in to see this' });
	}
}

module.exports = new AuthController();
