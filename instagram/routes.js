const InstagramController = require('./controller');

/**
 * Medium Routes
 *
 * @constructor
 */
const InstagramRoutes = function(token) {
	this.init(token);
};
InstagramRoutes.prototype = {
	/**
	 * Medium api controller
	 */
	controller: null,
	/**
	 * Get posts endpoint
	 */
	postsEndpoint: '',
	/**
	 * Class initialization
	 */
	init: function (token) {
		this.controller = new InstagramController(token);
		this.postsEndpoint = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token;
	},
	/**
	 * Sets app routes for Medium
	 * @param app
	 */
	setRoutes: function(app) {
		this.setPostsRoute(app);
	},
	/**
	 * Sets route for posts
	 * @param app
	 */
	setPostsRoute: function(app) {
		app.route('/instagram').get(this.controller.getPosts.bind(this.controller, this.postsEndpoint));
	}
};

/**
 * Public API
 * @type MediumRoutes
 */
module.exports = InstagramRoutes;
