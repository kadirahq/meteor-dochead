if(Package['kadira:flow-router-ssr']) {
  var FlowRouter = Package['kadira:flow-router-ssr'].FlowRouter;
  // remove added tags when changing routes
  FlowRouter.triggers.enter(function() {
    Meteor.startup(DocHead.removeDocHeadAddedTags);
  });
}
