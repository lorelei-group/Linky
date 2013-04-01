define(function(require) {
	'use strict';

	var linkTpl = require('tpl!link');
	var colors = [ 'gray', 'red', 'blue', 'orange', 'yellow', 'gray', 'purple' ];

	return Backbone.View.extend({

		render: function() {
			console.log('Desktop.render',this.model.links);
			this.$el
				.addClass('desktop')
				.css('background-color', colors[this.model.get('index')])
				.html(this.model.links.map(linkTpl).join(''));
		}
	});
});
