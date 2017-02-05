import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('waitForCommentsToLoad',
  function(app) {

    Ember.Test.registerWaiter(function() {
      const iframeExists = Ember.$('#disqus_thread iframe').length;
      const commentCounts = Ember.$('.disqus-comment-count');
      const commentsAreLoaded = commentCounts.filter(function() {
        return parseFloat(this.innerHTML) !== 0;
      }).length === commentCounts.length;

      return iframeExists && commentsAreLoaded;
    });

    app.testHelpers.wait();

  }
);
