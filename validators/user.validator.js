const { User } = require('../models');

const userSchema = {
	email: {
		isEmail: {
			errorMessage: 'Email is not valid',
		},
		custom: {
			options: async (value, { req }) => {
				const { id } = req.params;
				if (id) {
					// editing omit current user when searching
					const current = await User.findById(id);
					if (current.email === value) return true;
				}
				const user = await User.findByEmail(value);
				return user ? Promise.reject('Email already exists') : true;
			},
		},
	},
};

module.exports = userSchema;
