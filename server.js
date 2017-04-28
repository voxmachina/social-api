require('dotenv').config();

const express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	bodyParser = require('body-parser');

/**
 * App setup
 */
const allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');

	next();
};

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Medium
 * @type MediumRoutes
 */
const MediumRoutes = require('./medium/routes');
const mediumRoutes = new MediumRoutes(process.env.MEDIUM_USERNAME);
mediumRoutes.setRoutes(app);

/**
 * Instagram
 * @type InstagramRoutes
 */
const InstagramRoutes = require('./instagram/routes');
const instagramRoutes = new InstagramRoutes(process.env.INSTAGRAM_TOKEN);
instagramRoutes.setRoutes(app);

/**
 * Start server
 */
app.listen(port);
