# ember-cli-node-modules-to-vendor

[![Greenkeeper badge](https://badges.greenkeeper.io/kellyselden/ember-cli-node-modules-to-vendor.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/ember-cli-node-modules-to-vendor.svg)](https://badge.fury.io/js/ember-cli-node-modules-to-vendor)
[![Build Status](https://travis-ci.org/kellyselden/ember-cli-node-modules-to-vendor.svg?branch=master)](https://travis-ci.org/kellyselden/ember-cli-node-modules-to-vendor)

Easily import packages (non ember addons) from `node_modules` (you can import from any folder if you want to)

**NOTE:** From **Ember CLI version 2.15**, packages from `node_modules` folder can be imported directly using `app.import` in `ember-cli-build.js` file . Refer [here](https://emberjs.com/blog/2017/09/01/ember-2-15-released.html#toc_app-import-files-within-node_modules) for release notes.

## Installation

`ember install ember-cli-node-modules-to-vendor`

## Usage

```js
// ember-cli-build.js

// ...

var app = new EmberApp(defaults, {
  nodeModulesToVendor: [
    'node_modules/some-package/dist/js'
  ]
});

// then you can easily do
app.import('vendor/a-file-from-the-folder-above.js');

// ...
```

## Advanced Usage

You can supply a tree if you want finer control:

```js
// ember-cli-build.js

var Funnel = require('broccoli-funnel');
var UnwatchedDir = require('broccoli-source').UnwatchedDir;
// ...

var app = new EmberApp(defaults, {
  nodeModulesToVendor: [
    /* UnwatchedDir is optional, but it is rare to need a watcher assigned to a node_modules dependencies */
    new Funnel(new UnwatchedDir('node_modules/some-package/dist/js'), {
      destDir: 'some-package',
      files: ['only-this-file.js']
    })
  ]
});

app.import('vendor/some-package/only-this-file.js');
```

_Note: omitting the `destDir` option will place the file directly into the `vendor`
folder, so `app.import('vendor/only-this-file.js')` would be your import instead._

You can conditionally import:

```js
// ember-cli-build.js

// ...

function isDevelopment() {
  return EmberApp.env() !== 'production';
}

// ...

var nodeModulesToVendor = [];
if (isDevelopment()) {
  nodeModulesToVendor.push('node_modules/dev-helper/dist');
}

var app = new EmberApp(defaults, {
  nodeModulesToVendor: nodeModulesToVendor
});

if (isDevelopment()) {
  app.import('vendor/a-file-from-the-folder-above.js');
}

// ...
```
