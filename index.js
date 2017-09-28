'use strict';
const path = require('path');
const Transform = require('stream').Transform;
const Material = require('fuller-material-file');

const Tool = function(fuller, options) {
  fuller.bind(this);
  this.src = options.src;
  this.dst = options.dst;
};

Tool.prototype = {
  build: function(src, dst) {
    const next = new Transform({
      objectMode: true,
      transform: (mat, enc, cb) => cb(null, mat)
    });

    process.nextTick(() => {
      const srcfile = path.join(this.src, src);
      const newMat = new Material({
        id: dst,
        path: srcfile
      })
        .dst(path.join(this.dst, dst))
        .error(err => this.error(err));

      this.addDependencies(srcfile, dst);
      next.write(newMat);
      next.end();
    });

    return next;
  }
};


module.exports = Tool;
