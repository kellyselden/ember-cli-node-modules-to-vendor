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

    let trees = nodeModulesToVendor.map(asset => {
      if (typeof asset === 'string') {
        asset = new UnwatchedDir(asset);
      }

      return asset;
    });

    return mergeTrees(trees);
  }
};
