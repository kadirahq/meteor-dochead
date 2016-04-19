var FlowRouter = null;
if (Package['kadira:flow-router-ssr']) {
  FlowRouter = Package['kadira:flow-router-ssr'].FlowRouter;
}

if (Meteor.isClient) {
  var titleDependency = new Tracker.Dependency();
}

DocHead = {
  currentTitle: null,
  setTitle(title, context) {
    if (Meteor.isClient) {
      titleDependency.changed();
      document.title = title;
    } else {
      this.currentTitle = title;
      const titleHtml = `<title>${title}</title>`;
      this._addToHead(titleHtml, context);
    }
  },
  addMeta(info, context) {
    this._addTag(info, 'meta', context);
  },
  addLink(info, context) {
    this._addTag(info, 'link', context);
  },
  getTitle() {
    if (Meteor.isClient) {
      titleDependency.depend();
      return document.title;
    }
    return this.currentTitle;
  },
  addLdJsonScript(jsonObj) {
    const strObj = JSON.stringify(jsonObj);
    this._addLdJsonScript(strObj, context);
  },
  loadScript(url, options, callback) {
    if (Meteor.isClient) {
      npmLoadScript(url, options, callback);
    }
  },
  _addTag(info, tag, context) {
    const meta = this._buildTag(info, tag);
    if (Meteor.isClient) {
      document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', meta);
    } else {
      this._addToHead(meta, context);
    }
  },
  _addToHead(html, context) {
    // only work there is kadira:flow-router-ssr
    if (!FlowRouter) {
      return;
    }
    if(context)
      context.addToHead(html);
    let ssrContext = FlowRouter.ssrContext.get();
    if (ssrContext) {
      ssrContext.addToHead(html);
    }
  },
  _buildTag(metaInfo, type) {
    let props = "";
    for (let key in metaInfo) {
      props += `${key}="${metaInfo[key]}" `;
    }
    props += 'dochead="1"';
    var meta = `<${type} ${props}/>`;
    return meta;
  },
  _addLdJsonScript(stringifiedObject) {
    const scriptTag = `<script type="application/ld+json" dochead="1">${stringifiedObject}</script>`;
    if (Meteor.isClient) {
      document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', scriptTag);
    } else {
      this._addToHead(scriptTag, context);
    }
  },
  removeDocHeadAddedTags() {
    if (Meteor.isClient) {
      const elements = document.querySelectorAll('[dochead="1"]');
      // We use for-of here to loop only over iterable objects
      for (let element of elements) {
        element.parentNode.removeChild(element);
      }
    }
  }
};
