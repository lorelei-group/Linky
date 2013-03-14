/**
 * Copyright © 2009-2012 A. Matías Quezada
 */

(function(root) {

	var undefined;

	function extend(config) {
		var parent = this;
		var clazz = config.hasOwnProperty('constructor') ?
			config.constructor :
			function() { parent.apply(this, arguments) };

		var proto = clazz.prototype = Object.create(this.prototype);
		Object.keys(config).forEach(function(key) { proto[key] = config[key] });

		clazz.extend = extend;
		return clazz;
	}

	function print(object) {
		return '--[' + object + ']-- (' + (typeof object) + ')';
	}

	function printArray(arr) {
		return '[' + arr.map(print).join(',') + ']';
	}

	function message(self, text, objetive) {
		var end = objetive !== undefined ? ' ' + print(objetive) : '';
		return "Expected " + print(self.value) + self.to + text + end;
	}

	var ExpectationError = extend.call(Error, {
		constructor: function(message) {
			Error.call(this, message);
			this.message = message;
		}
	});

	var ExpectTools = extend.call(Object, {

		to: '',
		success: null,

		constructor: function(value) {
			this.value = value;
			this.and = this;
		},

		test: function(bool, message) {
			if (bool !== this.success)
				throw new ExpectationError(message);
			return this;
		}
	});

	/*
	 * Expectations
	 * Private class
	 * Instances of this class will be returned when call expect() function
	 * Each expectation instance has a subinstance 'not', than reverses the result
	 */
	var ExpectationBase = ExpectTools.extend({

		// Comparison expectations
		toBe: function(objetive) {
			return this.test(this.value === objetive, message(this, 'be', objetive));
		},
		toBeLike: function(objetive) {
			return this.test(this.value == objetive, message(this, 'be like', objetive));
		},
		toBeTrue: function() {
			return this.test(this.value === true, message(this, 'be', true));
		},
		toBeFalse: function() {
			return this.test(this.value === false, message(this, 'be', false));
		},
		toBeTruthy: function() {
			return this.test(!!this.value, message(this, 'be truthy'));
		},
		toBeFalsy: function() {
			return this.test(!this.value, message(this, 'be falsy'));
		},
		toBeNull: function() {
			return this.test(this.value === null, message(this, 'be', null));
		},
		toBeUndefined: function() {
			return this.test(typeof this.value === 'undefined', message(this, 'be undefined'));
		},
		toBeNullOrUndefined: function() {
			return this.test(this.value == null, message(this, 'be ' + print(undefined) + ' or ' + print(null)));
		},
		toBeNaN: function() {
			return this.test(isNaN(this.value), message(this, 'be', NaN));
		},

		// Numeric expectations
		toBeBetween: function(val1, val2) {
			return this.test(this.value >= Math.min(val1, val2) && this.value <= Math.max(val1, val2),
				'Expected ' + print(this.value) + this.to + 'be between ' + print(val1) + ' and ' + print(val2));
		},
		toBeLowerThan: function(num) {
			return this.test(this.value < num, message(this, 'be lower than', num));
		},
		toBeBiggerThan: function(num) {
			return this.test(this.value > num, message(this, 'be bigger than', num));
		},
		toBePositive: function() {
			return this.test(this.value > 0, message(this, 'be positive'));
		},
		toBeNegative: function() {
			return this.test(this.value < 0, message(this, 'be negative'));
		},

		// Class expectations
		toBeArray: function() {
			return this.test(Array.isArray(this.value), message(this, 'be a array'));
		},
		toBeFunction: function() {
			return this.test(this.value instanceof Function, message(this, 'be a function'));
		},
		toBeInstanceOf: function(clazz) {
			return this.test(this.value instanceof clazz, message(this, 'be instance of', clazz));
		},
		toHaveProperty: function(name) {
			return this.test(name in this.value, message(this, 'have property --[' + name + ']--'));
		},
		toHaveOwnProperty: function(name) {
			return this.test(this.value.hasOwnProperty(name), message(this, 'have property --[' + name + ']--'));
		},

		// Error handle expectations
		toThrowError: function() {
			if (!(this.value instanceof Function))
				throw new Error('Target is not a function');

			try {
				this.value.call(null);
			} catch (ex) {
				return this.test(true,
					'Expected --[' + this.value + ']-- ' + this.to + ' throw error but --[' +
					ex + ']-- thrown with message --[' + ex.message + ']--');
			}
			return this.test(false, 'Expected --[' + this.value + ']-- ' + this.to + ' throw a error');
		},
		toThrow: function(errorClass) {
			if (!(this.value instanceof Function))
				throw new Error('Target is not a function');
			try {
				this.value.call(null);
			} catch (ex) {
				return this.test(ex instanceof errorClass,
					'Expected --[' + this.value + ']-- ' + this.to + ' throw --[' + errorClass +
					']-- but --[' + ex + ']-- thrown');
			}
			return this.test(false, 'Expected --[' + this.value + ']-- ' + this.to + ' throw a error');
		}
	});

	var NegativeExpectation = ExpectationBase.extend({
		success: false,
		to: ' to not '
	});

	var Expectation = ExpectationBase.extend({
		success: true,
		to: ' to ',

		constructor: function(value) {
			ExpectationBase.call(this, value);
			this.not = new NegativeExpectation(value);
		}
	});


	function expect(value) {
		return new Expectation(value);
	}
	expect.ExpectTools = ExpectTools;
	expect.ExpecationBase = ExpectationBase;
	expect.Expectation = Expectation;

	if (typeof module !== 'undefined' && module.exports)
		module.exports = expect;
	else if (typeof define !== 'undefined' && define.amd)
		define(function() { return expect });
	else
		root.expect = expect;

})(this);


