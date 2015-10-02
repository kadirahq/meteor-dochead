Tinytest.add('Client - setTitle', function(test) {
  const id = Random.id();
  DocHead.setTitle(id);
  test.equal(document.title, id);
});

Tinytest.add('Client - getTitle', function(test) {
  const id = Random.id();
  document.title = id;
  test.equal(DocHead.getTitle(), id);
});

Tinytest.add('Client - addMeta', function(test) {
  const metaInfo = {name: "description", content: "awesome content"};
  DocHead.addMeta(metaInfo);
  const metaDom = $('meta[name=description]');
  test.equal(metaDom.attr('name'), metaInfo.name);
  test.equal(metaDom.attr('content'), metaInfo.content);
});

Tinytest.add('Client - setMeta', function(test) {
  const metaInfo = {name: "description", content: "awesome content"};
  const metaInfoUpdated = {name: "description", content: "NEW content"};
  DocHead.setMeta(metaInfo);
  test.equal($('meta[name=description]').attr('name'), metaInfo.name);
  test.equal($('meta[name=description]').attr('content'), metaInfo.content);
  test.equal( $('meta[name=description]').length, 1 );
  DocHead.setMeta(metaInfoUpdated);
  test.equal($('meta[name=description]').attr('content'), metaInfoUpdated.content);
  test.equal( $('meta[name=description]').length, 1 );
});

Tinytest.add('Client - addLdJsonScript', function(test, done) {
  const snippet = {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    url: 'http://www.example.com',
    logo: 'http://www.example.com/images/logo.png'
  };
  DocHead.addLdJsonScript(snippet);
  const tag = $('script[dochead="1"]');
  const obj = JSON.parse(tag.html());
  test.equal(obj, snippet);
});

Tinytest.add('Client - remove exising meta tags', function(test) {
  const metaInfo = {name: "description", content: "awesome content"};
  DocHead.addMeta(metaInfo);

  DocHead.removeDocHeadAddedTags();

  metaInfo.content = "nice one";
  DocHead.addMeta(metaInfo);

  const metaDom = $('meta[name=description]');
  test.equal(metaDom.attr('name'), metaInfo.name);
  test.equal(metaDom.attr('content'), metaInfo.content);

  // Only have the last one, even we add the same meta twice
  // DocHead differenciate meta by name
  // If not provided, it simply ignore them
  test.equal(metaDom.get().length, 1);
});

Tinytest.addAsync('Client - loadScript', function(test, done) {
  const scriptUrl = '/packages/local-test_kadira_dochead/test/fakescript.js';
  test.equal(window.fakeScriptLoaded, undefined);
  DocHead.loadScript(scriptUrl, function() {
    test.equal(window.fakeScriptLoaded, true);
    done();
  });
});
