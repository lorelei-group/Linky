define(function(require) {
	'use strict';

	var page = require('views/page');

	var Router = Backbone.Router.extend({

		routes: {
			'sample/:id': 'samplePage',
			'*actions': 'render'
		},

		initialize: function() {
			Backbone.history.start();
		},

		render: function() {
			page.show('error');
			console.log('Default handler');
		},

		samplePage: function(id) {
			page.show('sample-page');
			require('views/sample_page').render(id);
		}

	});

	return new Router();

});
