/*jshint -W069 */

define(function() {
	'use strict';

	Handlebars.registerHelper('times', function(count, options) {
		return Handlebars.helpers['each'].call(this, new Array(count || 0).join().split(','), options);
	});

	return {
		load: function(name, parentRequire, done) {
			var fn = Handlebars.compile(document.getElementById(name).innerHTML);
			done(function() {
				var args = _.toArray(arguments).map(function(arg) {
					return arg && arg.toJSON ? arg.toJSON() : arg;
				});

				return fn(args.reduce(_.extend, {}));
			});
		}
	};

});
