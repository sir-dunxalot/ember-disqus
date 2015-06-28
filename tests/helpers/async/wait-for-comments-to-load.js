import Ember from 'ember';
import loadDisqusApi from 'ember-disqus/utils/load-disqus-api';

export default Ember.Test.registerAsyncHelper('waitForCommentsToLoad',
  function(app, fileName, callback) {

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
