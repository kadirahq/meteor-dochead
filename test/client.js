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

Tinytest.addAsync('Client - getTitle reactivity', function(test, next) {
  // Call the next function after we reactively received 3 title changes (+1
  // for Tracker.autorun immediate invocation).
  const n = 3;
  const titleChanged = _.after(n + 1, next);
  Tracker.autorun(() => {
    DocHead.getTitle();
    titleChanged();
  });
  _.times(n, () => {
    const id = Random.id();
    DocHead.setTitle(id);
    Tracker.flush();
  });
});


Tinytest.add('Client - addMeta', function(test) {
  const metaInfo = {name: "description", content: "awesome content"};
  DocHead.addMeta(metaInfo);
  const metaDom = document.querySelectorAll('meta[name=description]')[0];
  test.equal(metaDom.getAttribute('name'), metaInfo.name);
  test.equal(metaDom.getAttribute('content'), metaInfo.content);
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
