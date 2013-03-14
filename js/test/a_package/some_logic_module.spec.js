define(function(require) {
	'use strict';

	var module = require('a_package/some_logic_module');

	describe('Some logic module behaviour', function() {

		describe('Method logicA', function() {
			it('should return always "A"', function() {
				expect(module.logicA()).toBe('A');
			});
		});

		describe('Method logicB', function() {
			it('should return always "B"', function() {
				expect(module.logicB()).toBe('B');
			});
		});

	});
});
