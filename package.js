Package.describe({
  name: 'kadira:dochead',
  summary: 'Isomorphic way to manipulate document.head for Meteor apps',
  version: '1.0.0',
  git: 'https://github.com/kadirahq/meteor-dochead.git'
});

Npm.depends({
  'load-script':'1.0.0'
});

Package.onUse(function(api) {
  configure(api);
  api.export('DocHead');
});

Package.onTest(function(api) {
  api.addFiles('test/init.jsx', 'server');
  configure(api);
  api.use('react');
  api.use('tinytest');
  api.use('random');

  api.addFiles('test/fakescript.js', 'client', {isAsset: true});
  api.addFiles('test/client.jsx', 'client');
  api.addFiles('test/server.jsx', 'server');
});


function configure(api) {
  api.versionsFrom('1.0');

  api.use('jsx');
  api.use('kadira:flow-router-ssr@3.0.0', ['client', 'server'], {weak: true});
  api.use('cosmos:browserify@0.5.0', 'client');

  api.addFiles('package.browserify.js', 'client');
  api.addFiles('lib/both.jsx', ['client', 'server']);
}