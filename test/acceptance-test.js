var expect = require('chai').expect;
var RSVP = require('rsvp');
var request = RSVP.denodeify(require('request'));
var AddonTestApp = require('ember-cli-addon-tests').AddonTestApp;

describe('Acceptance | ember-cli-build', function() {
  this.timeout(300000);

  var app;

  before(function() {
    app = new AddonTestApp();

    return app.create('dummy', {
      fixturesPath: 'tests'
    }).then(function() {
      app.editPackageJSON(function(pkg) {
        pkg['devDependencies']['broccoli-funnel'] = process.env.npm_package_devDependencies_broccoli_funnel;
      });
      return app.run('npm', 'install');
    }).then(function() {
      return app.startServer();
    });
  });

  after(function() {
    return app.stopServer();
  });

  it('can load the package', function() {
    return request('http://localhost:49741/assets/vendor.js')
      .then(function(response) {
        expect(response.body).to.contain('The string works!');
        expect(response.body).to.contain('The funnel works!');
      });
  });
});
