/**
 * Imports
 */
const requestify = require('requestify');

/**
 * Medium Controller
 *
 * @param username
 * @constructor
 */
const Medium = function(username) {
	this.init(username);
};
Medium.prototype = {
	/**
	 * Medium username
	 */
	username: '',
	/**
	 * Medium CDN
	 */
	cdn: 'https://cdn-images-1.medium.com/max/',
	/**
	 * Medium URI
	 */
	mediumUri: 'https://medium.com/@',
	/**
	 * Image resolution
	 */
	imageResolution: 800,
	/**
	 * Class initialization
	 *
	 * @param username
	 */
	init: function(username) {
		this.username = username;
	},
	/**
	 * Parses the Medium response
	 *
	 * @param response
	 * @returns string
	 */
	parseResponse: function(response) {
		return response.body.substring(response.body.indexOf(';') + 5);
	},
	/**
	 * Tries to parse a response string as JSON
	 *
	 * @param response
	 */
	parseJson: function(response) {
		try {
			return JSON.parse(response);
		} catch(e) {
			throw "Invalid JSON";
		}
	},
	/**
	 * Returns a string response as JSON
	 *
	 * @param res
	 * @param response
	 */
	returnAsJson: function(res, response) {
		if (!response.payload || !response.payload.references || !response.payload.references.Post) {
			throw 'Invalid payload';
		}

		const responseArray = Object.keys(response.payload.references.Post)
			.map(key => response.payload.references.Post[key]);

		return res.json(responseArray.map(this.serializePost.bind(this)));
	},
	/**
	 * Serializes a Post
	 * @param item
	 * @returns JSON
	 */
	serializePost: function(item) {
		return {
			title: item.title,
			subtitle: item.content.subtitle,
			thumbnail: item.virtuals.previewImage.imageId ? this.cdn + this.imageResolution + '/' + item.virtuals.previewImage.imageId : null,
			url: this.mediumUri + this.username + '/' + item.uniqueSlug
		};
	},
	/**
	 * Returns as an Error
	 *
	 * @param e
	 * @returns JSON
	 */
	returnAsError: function(e) {
		return {error: true, msg: e};
	},
	/**
	 * Get all Medium posts
	 *
	 * @param endpoint
	 * @param req
	 * @param res
	 */
	getPosts: function(endpoint, req, res) {
		requestify.get(endpoint)
			.then(this.parseResponse)
			.then(this.parseJson)
			.then(this.returnAsJson.bind(this, res))
			.catch(this.returnAsError);
	}
};

/**
 * Public API
 * @type Medium
 */
module.exports = Medium;
