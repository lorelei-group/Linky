define(function(require) {
	'use strict';

	var page = require('views/page');

	var Router = Backbone.Router.extend({

		routes: {
			'desktop/:id': 'desktop',
			'*actions': 'unknown'
		},

		initialize: function() {
			Backbone.history.start();
			page.render();
		},

		desktop: function(id) {
			page.show(id);
		},

		unknown: function() {
			page.show('error');
			console.log('Default handler');
		}

	});

	return new Router();

});
