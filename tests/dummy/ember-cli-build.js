/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    nodeModulesToVendor: [
      '_node_modules/test-string',
      new Funnel('_node_modules/test-funnel', {
        files: ['test-funnel.js']
      })
    ]
  });

  app.import('vendor/test-string.js', {
    using: [{ transformation: 'amd', as: 'test-string' }]
  });
  app.import('vendor/test-funnel.js', {
    using: [{ transformation: 'amd', as: 'test-funnel' }]
  });

  return app.toTree();
};
