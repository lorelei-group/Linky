define(function(require) {
	'use strict';

	var template = require('tpl!sample-page-content');

	return new (Backbone.View.extend({

		el: 'section#sample-page',

		events: {
			'click header': 'sayHi',
		},

		render: function(id) {
			this.$('.content').html(template({ id: id }));
		},

		sayHi: function() {
			alert('HI!');
		}
	}));
});
