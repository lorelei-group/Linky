define(function(require) {
	'use strict';

	var Desktop = require('models/desktop');

	return Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage('desktop'),
		model: Desktop,
	});
});
