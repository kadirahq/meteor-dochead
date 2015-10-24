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
      document.getElementsByTagName('head')[0].appendChild(meta);
    } else {
      this._addToHead(meta);
    }
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
    let meta;
    if (Meteor.isClient) {
      meta = document.createElement(type);
      for (let key in metaInfo) {
        if (metaInfo.hasOwnProperty(key)) {
          meta.setAttribute(key, metaInfo[key]);
        }
      }
      meta.setAttribute('dochead', '1');
    } else {
      let props = "";
      for (let key in metaInfo) {
        props += `${key}="${metaInfo[key]}" `;
      }
      props += 'dochead="1"';
      meta = `<${type} ${props}/>`;
    }
    return meta;
  },
  _addLdJsonScript(stringifiedObject) {
    let scriptTag;
    if (Meteor.isClient) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('dochead', '1');
      scriptTag.appendChild(document.createTextNode(stringifiedObject));
      document.getElementsByTagName('head')[0].appendChild(scriptTag);
    } else {
      scriptTag = `<script type="application/ld+json" dochead="1">${stringifiedObject}</script>`;
      this._addToHead(scriptTag);
    }
  },
  removeDocHeadAddedTags() {
    if (Meteor.isClient) {
      const elements = document.querySelectorAll('[dochead="1"]');
      for (let key in elements) {
        if (elements.hasOwnProperty(key)) {
          elements[key].parentNode.removeChild(elements[key]);
        }
      }
    }
  }
};
