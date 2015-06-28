import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance | eggs', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /eggs', function(assert) {
  visit('/eggs');

  waitForCommentsToLoad();

  andThen(function() {
    const commentCount = inspect('eggs-comment-count');
    const comments = inspect('eggs-comments').find('iframe');

    assert.equal(currentURL(), '/eggs');

    assert.equal(commentCount.html(), '2 Comments',
      'The correct comment count should have been added to the DOM');

    assert.ok(comments.attr('src').indexOf('disqus.com') > -1,
      'The comments iframe should have been added to the DOM');
  });
});
