define(function(require) {
	'use strict';

	return Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage('links'),

		defaults: {
			url: 'http://amatiasq.com',
			name: 'My Blog',
			icon: 'https://secure.gravatar.com/avatar/16f1be6c74eefc2a7f02d90707caf283',
			desktop: 0,
		}
	});
});
