define(function() {
	'use strict';

	var colors = [ 'red', 'blue', 'orange', 'yellow', 'gray', 'purple' ];

	return Backbone.View.extend({

		render: function() {
			this.$el.addClass('desktop');
			this.$el.css('background-color', colors[this.model.get('index')]);
		}
	});
});
