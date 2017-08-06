'use strict';

const expect = require('chai').expect;
const denodeify = require('denodeify');
const request = denodeify(require('request'));
const AddonTestApp = require('ember-cli-addon-tests').AddonTestApp;

describe('Acceptance | ember-cli-build', function() {
  this.timeout(300000);

  let app;

  before(function() {
    app = new AddonTestApp();

    return app.create('dummy', {
      fixturesPath: 'tests',
      skipInstall: true
    }).then(() => {
      app.editPackageJSON(pkg => {
        pkg.devDependencies['broccoli-funnel'] = process.env.npm_package_devDependencies_broccoli_funnel;
      });

      return app.run('npm', 'install');
    }).then(() => {
      return app.startServer();
    });
  });

  after(function() {
    return app.stopServer();
  });

  it('can load the package', function() {
    return request('http://localhost:49741/assets/vendor.js')
      .then(response => {
        expect(response.body).to.contain('The string works!');
        expect(response.body).to.contain('The funnel works!');
      });
  });
});
