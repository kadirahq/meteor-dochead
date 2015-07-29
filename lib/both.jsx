var FlowRouter = null;
if(Package['kadira:flow-router-ssr']) {
  FlowRouter = Package['kadira:flow-router-ssr'].FlowRouter;
}

DocHead = {
  currentTitle: null,
  setTitle(title) {
    if(Meteor.isClient) {
      document.title = title;
    } else {
      this.currentTitle = title;
      var titleHtml = `<title>${title}</title>`;
      this._addToHead(titleHtml);
    }
  },
  addMeta(info) {
    if(Meteor.isClient) {
      if(info.name) {
        var meta = $(`meta[name="${info.name}"]`);
        if(meta) {
          meta.remove();
        }
      }

      var meta = this._buildMetaTag(info);
      $('head').append(meta);
    } else {
      var meta = this._buildMetaTag(info);
      this._addToHead(meta);
    }
  },
  getTitle() {
    if(Meteor.isClient) {
      return document.title;
    } else {
      return this.currentTitle;
    }
  },
  loadScript(url, options, callback) {
    if(Meteor.isClient) {
      LoadScript(url, options, callback)
    }
  },
  _addToHead(html) {
    // only work there is kadira:flow-router-ssr
    if(!FlowRouter) {
      return;
    }

    var ssrContext = FlowRouter.ssrContext.get();
    if(ssrContext) {
      ssrContext.addToHead(html);
    }
  },
  _buildMetaTag(metaInfo) {
    var props = "";
    for(var key in metaInfo) {
      props += `${key}="${metaInfo[key]}" `;
    }
    var meta = `<meta ${props}/>`;
    return meta;
  }
};