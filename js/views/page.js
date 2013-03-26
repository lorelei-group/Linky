define(function(require) {
	'use strict';

	var Desktops = require('collections/desktops');
	var DesktopView = require('views/desktop');

	return new (Backbone.View.extend({

		el: 'div#page-content',

		initialize: function() {
			_.bindAll(this, 'render');
			this.desktops = new Desktops();
			this.desktops.fetch();
			this.desktops.on('reset', this.render);
		},

		render: function() {
			this.$el.removeAttr('style');
			this.$el.empty();

			this.views = this.desktops.map(function(model) {
				 return new DesktopView({ model: model });
			});

			this.$el.append(this.views.map(function(view) {
				view.render();
				return view.el;
			}));

			this.show(0);
		},

		show: function(id) {
			this.$el.children()
				.addClass('hidden')
				.filter(':nth-child(' + (id + 1) + ')')
					.removeClass('hidden');
		}

	}));
});
