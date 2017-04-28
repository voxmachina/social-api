/**
 * Imports
 */
const requestify = require('requestify');

/**
 * Instagram Controller
 *
 * @param token
 * @constructor
 */
const Instagram = function(token) {
	this.init(token);
};
Instagram.prototype = {
	/**
	 * Instagram token
	 */
	token: '',
	/**
	 * Class initialization
	 *
	 * @param token
	 */
	init: function(token) {
		this.username = token;
	},
	/**
	 * Tries to parse a response string as JSON
	 *
	 * @param response
	 */
	parseJson: function(response) {
		try {
			return JSON.parse(response.body);
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
		if (!response.data) {
			throw 'Invalid payload';
		}

		return res.json(response.data.map(this.serializePost.bind(this)));
	},
	/**
	 * Serializes a Post
	 * @param item
	 * @returns JSON
	 */
	serializePost: function(item) {
		return {
			title: item.caption.text,
			location: item.location,
			thumbnail: item.images.low_resolution,
		  image: item.images.standard_resolution,
			url: item.link
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
			.then(this.parseJson)
			.then(this.returnAsJson.bind(this, res))
			.catch(this.returnAsError);
	}
};

/**
 * Public API
 * @type Medium
 */
module.exports = Instagram;
