Package.describe({
  name: 'kadira:dochead',
  summary: 'Isomorphic way to manipulate document.head for Meteor apps',
  version: '1.3.0',
  git: 'https://github.com/kadirahq/meteor-dochead.git'
});

Npm.depends({
  'load-script': '1.0.0'
});

var configure = function(api) {
  api.versionsFrom('1.2');
  api.use(['es5-shim', 'ecmascript']);
  api.use('kadira:flow-router-ssr@3.3.0', ['client', 'server'], {weak: true});
  api.use('cosmos:browserify@0.8.0', 'client');

  api.addFiles('package.browserify.js', 'client');
  api.addFiles('lib/both.js', ['client', 'server']);
  api.addFiles('lib/flow_router.js', ['client']);
};

Package.onUse(function(api) {
  configure(api);
  api.export('DocHead');
});

Package.onTest(function(api) {
  api.addFiles('test/init.js', 'server');
  configure(api);
  api.use(['react', 'tinytest', 'random']);

  api.addAssets('test/fakescript.js', 'client');
  api.addFiles('test/client.js', 'client');
  api.addFiles('test/server.js', 'server');
});
