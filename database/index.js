/*eslint-env node*/
const mongoose = require('mongoose');

const connectToDB = async () => {
	const connection = await mongoose
		.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
		.catch((err) => {
			console.error(err);
		});
	if (connection.connection) {
		console.log('Connected to DB successfully');
	}
};

module.exports = connectToDB;
