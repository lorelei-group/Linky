define(function(require) {
	'use strict';

	var Link = require('models/link');
	var all;

	var All = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage('links'),
		model: Link,
	});

	var all = new All();
	all.fetch();

	return Backbone.Collection.extend({
		model: Link,

		initialize: function(desktop) {
			this.desktop = desktop;
		},

		fetch: function() {
			var desktop = this.desktop;
			this.reset(all.filter(function(link) {
				return link.get('desktop') === desktop;
			}));
		}
	});
});
