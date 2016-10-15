'use strict';
let path = require('path');
let Transform = require('stream').Transform;
let Material = require('fuller-material-file');

let SrcFile = function(fuller, options) {
  fuller.bind(this);
  this.src = options.src;
  this.dst = options.dst;
};

SrcFile.prototype = {
  build: function(src, dst) {
    let self = this;

    let next = new Transform({
      objectMode: true,
      transform: function(mat, enc, cb) {
        cb(null, mat);
      }
    });

    process.nextTick(function() {
      let srcfile = path.join(self.src, src);
      let newMat = new Material({
        id: dst,
        path: srcfile
      })
      .dst(path.join(self.dst, dst))
      .error(function(err) {
        self.error(err);
      });

      self.addDependencies(srcfile, dst);
      next.write(newMat);
      next.end();
    });

    return next;
  }
};


module.exports = SrcFile;
