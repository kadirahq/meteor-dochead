Tinytest.addAsync('Server - setTitle and getTitle', function(test, done) {
  var id = Random.id();
  var handle = OnSsrContext(function(html) {
    var title = `<title>${id}</title>`
    test.equal(html, title);
    test.equal(DocHead.getTitle(), id);
    handle.stop();
    done();
  });
  DocHead.setTitle(id);
});

Tinytest.addAsync('Server - addMeta', function(test, done) {
  var metaInfo = {name: "description", content: "hello content"};
  var handle = OnSsrContext(function(html) {
    var metaTag = `<meta name="${metaInfo.name}" content="${metaInfo.content}" />`;
    test.equal(html, metaTag);
    handle.stop();
    done();
  });
  DocHead.addMeta(metaInfo);
});


function OnSsrContext(fn) {
  SsrContext.addToHead = fn;
  function stop() {
    SsrContext.addToHead = null;
  }

  return {
    stop: stop
  };
}
