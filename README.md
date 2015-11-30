# DocHead for Meteor

DocHead is an isomorphic way to manipulate `document.head` for Meteor apps.

With DocHead, you can easily set title and meta tags both in client and server using a single API. In the server side it'll use [FlowRouter SSR](https://github.com/kadirahq/flow-router/tree/ssr).

## Installation

~~~
meteor add kadira:dochead
~~~

## Usage

In the Client Side, you can use `DocHead` anywhere in your app. But in the server, you need to use `DocHead` inside a React Component. Otherwise, it can't work properly.

> In the server, you need to use `kadira:flow-router-ssr`

## API

#### DocHead.setTitle(titleName)

Set title to the page.

~~~js
var title = "FlowRouter Rocks";
DocHead.setTitle(title);
~~~

#### DocHead.getTitle()

Get the document title.

> This API is reactive on the client. It only detect changes you made with `DocHead.setTitle()`.

~~~js
var title = DocHead.getTitle();
console.log("This is the document.title", title);
~~~

#### DocHead.addMeta(metaInfo)

Add a Meta tag.

~~~js
var metaInfo = {name: "description", content: "FlowRouter SSR is Awesome"};
DocHead.addMeta(metaInfo);
~~~

#### DocHead.addLink(metaInfo)

Add a Link tag.

~~~js
var linkInfo = {rel: "icon", type: "image/png", href: "/icon.png"};
DocHead.addLink(linkInfo);
~~~

#### DocHead.addLdJsonScript(jsonObj)

Add a Script tag with type of `application/ld+json`.

~~~js
var richSnippet = { '@context': 'http://schema.org', '@type': 'Organization', url: 'http://www.example.com', logo: 'http://www.example.com/images/logo.png' };
DocHead.addLdJsonScript(richSnippet);
~~~

#### DocHead.loadScript(scriptName, options, callback) - [client only]

Load an script dynamically from the client side of your app. Both `options` and `callback` are optional.

Behind the scene `DocHead.loadScript` uses [`load-script`](https://www.npmjs.com/package/load-script) npm module. Visit here to learn more about [options](https://www.npmjs.com/package/load-script#opts).

~~~js
var gaScript = 'https://www.google-analytics.com/analytics.js';
DocHead.loadScript(gaScript, function() {
    // Google Analytics loaded
    ga('create', 'UA-XXXX-Y', 'auto');
    ga('send', 'pageview');
});
~~~

#### DocHead.removeDocHeadAddedTags()

When you add meta tags multiple times, older tags will be kept in the `document.head`. So, we need to clean them. For that, we can use this API.

Practially, we can use this before a route change happen.

> `DocHead.removeDocHeadAddedTags()` is already [added](https://github.com/kadirahq/meteor-dochead/blob/master/lib/flow_router.js) to FlowRouter SSR.

**This API only functioning in the client. In the server, this does nothing.**

## Testing the package
```sh
meteor test-packages ./ --port 3010
```
