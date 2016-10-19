# ember-cli-node-modules-to-vendor

[![npm version](https://badge.fury.io/js/ember-cli-node-modules-to-vendor.svg)](https://badge.fury.io/js/ember-cli-node-modules-to-vendor)
[![Build Status](https://travis-ci.org/kellyselden/ember-cli-node-modules-to-vendor.svg?branch=master)](https://travis-ci.org/kellyselden/ember-cli-node-modules-to-vendor)

Easily import packages (non ember addons) from `node_modules` (you can import from any folder if you want to)

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

// ...

var app = new EmberApp(defaults, {
  nodeModulesToVendor: [
    new Funnel('node_modules/some-package/dist/js', {
      files: ['only-this-file.js']
    })
  ]
});

// ...
```

You can conditionally import, for say, FastBoot support

```js
// ember-cli-build.js

// ...

function isFastBoot() {
  return process.env.EMBER_CLI_FASTBOOT === 'true';
}

// ...

var nodeModulesToVendor;
if (!isFastBoot()) {
  nodeModulesToVendor.push('node_modules/location-origin/dist');
}

var app = new EmberApp(defaults, {
  nodeModulesToVendor: nodeModulesToVendor
});

if (!isFastBoot()) {
  app.import('vendor/a-file-from-the-folder-above.js');
}

// ...
```
