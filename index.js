"use strict";

module.exports = function(f, mat, options, next) {
	f.addDependencies(mat);
	next(null, mat);
};
