(function() {
	'use strict';

	requirejs.config({
		baseUrl: 'js',
		urlArgs: 'nocache=' + Date.now(),

		paths: {
			'promise': 'lib/promise',
		},
	})(['router']);

	/**
	 * Imported Globals:
	 *  - $
	 *  - _
	 *  - Backbone
	 *  - Handlebars
	 */

})();
