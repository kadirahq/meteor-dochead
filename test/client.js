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
  const metaDom = document.querySelectorAll('meta[name=description]')[0];
  test.equal(metaDom.getAttribute('name'), metaInfo.name);
  test.equal(metaDom.getAttribute('content'), metaInfo.content);
});

Tinytest.add('Client - addLdJsonScript', function(test, done) {
  const snippet = {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    url: 'http://www.example.com',
    logo: 'http://www.example.com/images/logo.png'
  };
  DocHead.addLdJsonScript(snippet);
  const tag = document.querySelectorAll('script[dochead="1"]')[0];
  const obj = JSON.parse(tag.innerHTML);
  test.equal(obj, snippet);
});

Tinytest.add('Client - remove exising meta tags', function(test) {
  const metaInfo = {name: "description", content: "awesome content"};
  DocHead.addMeta(metaInfo);

  DocHead.removeDocHeadAddedTags();

  metaInfo.content = "nice one";
  DocHead.addMeta(metaInfo);

  const metaDom = document.querySelectorAll('meta[name=description]');
  const metaDomSingle = metaDom[0];
  test.equal(metaDomSingle.getAttribute('name'), metaInfo.name);
  test.equal(metaDomSingle.getAttribute('content'), metaInfo.content);

  // Only have the last one, even we add the same meta twice
  // DocHead differenciate meta by name
  // If not provided, it simply ignore them
  test.equal(metaDom.length, 1);
});

Tinytest.addAsync('Client - loadScript', function(test, done) {
  const scriptUrl = '/packages/local-test_kadira_dochead/test/fakescript.js';
  test.equal(window.fakeScriptLoaded, undefined);
  DocHead.loadScript(scriptUrl, function() {
    test.equal(window.fakeScriptLoaded, true);
    done();
  });
});
