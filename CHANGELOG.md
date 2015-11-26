# Change Log

### v1.4.0
* Make `DocHead.getTitle()` reactive. See: [#25](https://github.com/kadirahq/meteor-dochead/pull/25)

### v1.3.2
* Use ES2015 for-of loops and it resolves the bug in Safari introduce in 1.3.0. [See More](https://github.com/kadirahq/meteor-dochead/commit/c0ce85d573e5dbf8cfa0ae02fa7f777743059276#commitcomment-14028289)

### v1.3.1
* Fix issue of not working in Safari after the removal of jQuwery. See: [#https://github.com/kadirahq/meteor-dochead/issues/18]()

### v1.3.0
* Remove JQuery dependancy. See: [#17](https://github.com/kadirahq/meteor-dochead/pull/17)

### v1.2.2
* Update browserify to 0.8.0

### v1.2.1
* Update browserify to 0.7.2

### v1.2.0

* Add support for [JSON + LD](https://github.com/kadirahq/meteor-dochead#docheadaddldjsonscriptjsonobj)
* Written in pure ECMASCRIPT. See: [#8](https://github.com/kadirahq/meteor-dochead/pull/8) 

### v1.1.0

* Add support for <link> tags via `DocHead.addLink` API.
* Now tags will be automatically removed in the client for every route change.
