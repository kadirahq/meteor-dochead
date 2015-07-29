SsrContext = {};
Package['kadira:flow-router-ssr'] = {
  FlowRouter: {
    ssrContext: {
      get: function() {
        return SsrContext;
      }
    }
  }
};