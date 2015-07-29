Tinytest.add('Client - setTitle', function(test) {
  var id = Random.id();
  DocHead.setTitle(id);
  test.equal(document.title, id);
});

Tinytest.add('Client - getTitle', function(test) {
  var id = Random.id();
  document.title = id;
  test.equal(DocHead.getTitle(), id);
});

Tinytest.add('Client - addMeta', function(test) {
  var metaInfo = {name: "description", content: "awesome content"};
  DocHead.addMeta(metaInfo);
  var metaDom = $('meta[name=description]');
  test.equal(metaDom.attr('name'), metaInfo.name);
  test.equal(metaDom.attr('content'), metaInfo.content);
});

Tinytest.add('Client - addMeta twice with the same name', function(test) {
  var metaInfo = {name: "description", content: "awesome content"};
  DocHead.addMeta(metaInfo);

  metaInfo.content = "nice one";
  DocHead.addMeta(metaInfo);

  var metaDom = $('meta[name=description]');
  test.equal(metaDom.attr('name'), metaInfo.name);
  test.equal(metaDom.attr('content'), metaInfo.content);

  // Only have the last one, even we add the same meta twice
  // DocHead differenciate meta by name
  // If not provided, it simply ignore them
  test.equal(metaDom.get().length, 1);
});

Tinytest.addAsync('Client - loadScript', function(test, done) {
  var scriptUrl = '/packages/local-test_kadira_dochead/test/fakescript.js';
  test.equal(window.fakeScriptLoaded, undefined);
  DocHead.loadScript(scriptUrl, function() {
    test.equal(window.fakeScriptLoaded, true);
    done();
  });
});