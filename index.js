/* eslint-env node */
'use strict';

const mergeTrees = require('broccoli-merge-trees');
const UnwatchedDir = require('broccoli-source').UnwatchedDir;

module.exports = {
  name: 'ember-cli-node-modules-to-vendor',

  included(app) {
    this._super.included.apply(this, arguments);
    this.app = app;
  },

  treeForVendor() {
    let app = this.app;
    let nodeModulesToVendor = app.options.nodeModulesToVendor || [];

    return mergeTrees(nodeModulesToVendor.map(function(asset) {
      if (typeof asset === 'string') {
        return new UnwatchedDir(asset);
      }

      return asset;
    }));
  }
};
