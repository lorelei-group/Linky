define(function(require) {
	'use strict';

	var Links = require('collections/links');

	return Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage('desktop'),
		defaults: {
			index: 0,
			links: [],
		},

		initialize: function() {
			_.bindAll(this, 'refreshLinks');
			this.on('change:index', this.refreshLinks);
			this.refreshLinks();
		},

		refreshLinks: function() {
			this.links = new Links(this.get('index'));
			this.links.fetch();
		}
	});
});
