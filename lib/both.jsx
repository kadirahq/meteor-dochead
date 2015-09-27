var FlowRouter = null;
if (Package['kadira:flow-router-ssr']) {
  FlowRouter = Package['kadira:flow-router-ssr'].FlowRouter;
}

DocHead = {
  currentTitle: null,
  setTitle(title) {
    if (Meteor.isClient) {
      document.title = title;
    } else {
      this.currentTitle = title;
      var titleHtml = `<title>${title}</title>`;
      this._addToHead(titleHtml);
    }
  },
  addMeta(info) {
    this._addTag(info, 'meta');
  },
  addLink(info) {
    this._addTag(info, 'link');
  },
  getTitle() {
    if (Meteor.isClient) {
      return document.title;
    }
    return this.currentTitle;
  },
  loadScript(url, options, callback) {
    if (Meteor.isClient) {
      npmLoadScript(url, options, callback);
    }
  },
  _addTag(info, tag) {
    var meta = this._buildTag(info, tag);
    if (Meteor.isClient) {
      $('head').append(meta);
    } else {
      this._addToHead(meta);
    }
  },
  _addToHead(html) {
    // only work there is kadira:flow-router-ssr
    if (!FlowRouter) {
      return;
    }

    var ssrContext = FlowRouter.ssrContext.get();
    if (ssrContext) {
      ssrContext.addToHead(html);
    }
  },
  _buildTag(metaInfo, type) {
    var props = "";
    for (var key in metaInfo) {
      props += `${key}="${metaInfo[key]}" `;
    }
    props += 'dochead="1"';
    var meta = `<${type} ${props}/>`;
    return meta;
  },
  removeDocHeadAddedTags() {
    if (Meteor.isClient) {
      $('[dochead="1"]', document.head).remove();
    }
  }
};
