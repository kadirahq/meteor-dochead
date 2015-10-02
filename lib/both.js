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
      const titleHtml = `<title>${title}</title>`;
      this._addToHead(titleHtml);
    }
  },
  addMeta(info) {
    this._addTag(info, 'meta');
  },
  setMeta(info) {
    if (!Meteor.isServer) {
      this._removeTag( info.name );
      this.addMeta(info);
    }
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
  addLdJsonScript(jsonObj) {
    const strObj = JSON.stringify(jsonObj);
    this._addLdJsonScript(strObj);
  },
  loadScript(url, options, callback) {
    if (Meteor.isClient) {
      npmLoadScript(url, options, callback);
    }
  },
  _addTag(info, tag) {
    const meta = this._buildTag(info, tag);
    if (Meteor.isClient) {
      $('head').append(meta);
    } else {
      this._addToHead(meta);
    }
  },
  _removeTag(metaName) {
    $(`meta[name="${metaName}"`).remove();
  },
  _addToHead(html) {
    // only work there is kadira:flow-router-ssr
    if (!FlowRouter) {
      return;
    }
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
      $('head').append(scriptTag);
    } else {
      this._addToHead(scriptTag);
    }
  },
  removeDocHeadAddedTags() {
    if (Meteor.isClient) {
      $('[dochead="1"]', document.head).remove();
    }
  }
};
