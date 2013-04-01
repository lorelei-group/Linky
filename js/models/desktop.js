define(function(require) {
	'use strict';

	var Link = require('models/link');
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

		addLink: function(link) {
			if (!(link instanceof Link))
				link = new Link(link);

			link.set('desktop', this.id);
			return link;
		},

		refreshLinks: function() {
			this.links = new Links(this.id);
			this.links.fetch();
		}
	});
});
