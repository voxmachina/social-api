const MediumController = require('./controller');

/**
 * Medium Routes
 *
 * @constructor
 */
const MediumRoutes = function(username) {
	this.init(username);
};
MediumRoutes.prototype = {
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
	init: function (username) {
		this.controller = new MediumController(username);
		this.postsEndpoint = 'https://medium.com/@' + username + '/latest?format=json';
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
		app.route('/medium').get(this.controller.getPosts.bind(this.controller, this.postsEndpoint));
	}
};

/**
 * Public API
 * @type MediumRoutes
 */
module.exports = MediumRoutes;
