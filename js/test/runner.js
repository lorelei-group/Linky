//globals requirejs,mocha

(function() {
	'use strict';

	requirejs.config({
		baseUrl:'../',
		urlArgs: 'nocache=' + Date.now(),
	});

	requirejs([
		'test/a_package/some_logic_module.spec',
	], function() {
		mocha.run();
	});
})();
