"use strict";
const FILE_ENCODING = "utf8";

let fs = require("fs");
let path = require("path");

let SrcFile = function(fuller, options) {
	fuller.bind(this);
	this.src = options.src;
};

SrcFile.prototype.build = function(file, master) {
	let self = this,
		src = path.join(this.src, file);
	this.addDependence(src, master);

	return fs.createReadStream(src, {encoding: FILE_ENCODING})
		.on("error", function(err) {
			self.error(err.toString().replace("Error:", ""));
		});
};


module.exports = SrcFile;
