const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenvExpand = require('dotenv-expand');
dotenvExpand.expand(require('dotenv').config());
const PORT = process.env.PORT || 5000;

const connectToDB = require('./database');

const appRoutes = require('./routes');

const runApp = async () => {
	// initialize express app
	const app = express();

	// use cors, bodyparser
	app.use(cors());
	app.use(bodyParser.json());
	app.use(appRoutes);
	await connectToDB();
	app.listen(PORT, () => console.log(`App running on port ${PORT}`));
};

runApp();
