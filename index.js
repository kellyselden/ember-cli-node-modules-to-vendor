/* eslint-env node */
'use strict';

const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-node-modules-to-vendor',

  included(app) {
    this.app = app;
  },

  treeForVendor() {
    let app = this.app;
    let nodeModulesToVendor = app.options.nodeModulesToVendor || [];
    return mergeTrees(nodeModulesToVendor);
  }
};
