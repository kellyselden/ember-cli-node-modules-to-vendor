/* jshint node: true */
'use strict';

var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-node-modules-to-vendor',

  included: function(app) {
    this.app = app;
  },

  treeForVendor: function() {
    var app = this.app;
    var nodeModulesToVendor = app.options.nodeModulesToVendor || [];
    return mergeTrees(nodeModulesToVendor);
  }
};
