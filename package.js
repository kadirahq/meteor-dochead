Package.describe({
  name: 'kadira:dochead',
  summary: 'Isomorphic way to manipulate document.head for Meteor apps',
  version: '1.1.1',
  git: 'https://github.com/kadirahq/meteor-dochead.git'
});

Npm.depends({
  'load-script': '1.0.0'
});

var configure = function(api) {
  api.use(['jsx@0.2.1', 'jquery']);
  api.use('kadira:flow-router-ssr@3.3.0', ['client', 'server'], {weak: true});
  api.use('cosmos:browserify@0.7.0', 'client');

  api.addFiles('package.browserify.js', 'client');
  api.addFiles('lib/both.jsx', ['client', 'server']);
  api.addFiles('lib/flow_router.jsx', ['client']);
};

Package.onUse(function(api) {
  configure(api);
  api.export('DocHead');
});

Package.onTest(function(api) {
  api.addFiles('test/init.jsx', 'server');
  configure(api);
  api.use(['react', 'tinytest', 'random']);

  api.addAssets('test/fakescript.js', 'client');
  api.addFiles('test/client.jsx', 'client');
  api.addFiles('test/server.jsx', 'server');
});
