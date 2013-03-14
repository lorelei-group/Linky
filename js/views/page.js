define(function() {
	'use strict';

	return new (Backbone.View.extend({

		el: 'div#page-content',

		show: function(id) {
			this.$el.css('display', 'block');

			this.show = function(id) {
				this.$el.children().addClass('hidden');
				this.$('#' + id).removeClass('hidden');
			};

			return this.show(id);
		}

	}));
});
