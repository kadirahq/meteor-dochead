let onSsrContext = function(fn) {
  SsrContext.addToHead = fn;
  let stop = function() {
    SsrContext.addToHead = null;
  };
  return {
    stop: stop
  };
};

Tinytest.addAsync('Server - setTitle and getTitle', function(test, done) {
  const id = Random.id();
  let handle = onSsrContext(function(html) {
    const title = `<title>${id}</title>`;
    test.equal(html, title);
    test.equal(DocHead.getTitle(), id);
    handle.stop();
    done();
  });
  DocHead.setTitle(id);
});

Tinytest.addAsync('Server - addMeta', function(test, done) {
  const metaInfo = {name: "description", content: "hello content"};
  let handle = onSsrContext(function(html) {
    const metaTag = `<meta name="${metaInfo.name}" content="${metaInfo.content}" dochead="1"/>`;
    test.equal(html, metaTag);
    handle.stop();
    done();
  });
  DocHead.addMeta(metaInfo);
});

Tinytest.addAsync('Server - addLdJsonScript', function(test, done) {
  const snippet = {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    url: 'http://www.example.com',
    logo: 'http://www.example.com/images/logo.png'
  };
  let handle = onSsrContext(function(html) {
    const scriptTag = '<script type="application/ld+json" dochead="1">' +
      '{' +
        '"@context":"http://schema.org",' +
        '"@type":"Organization",' +
        '"url":"http://www.example.com",' +
        '"logo":"http://www.example.com/images/logo.png"}' +
    '</script>';
    test.equal(html, scriptTag);
    handle.stop();
    done();
  });
  DocHead.addLdJsonScript(snippet);
});
