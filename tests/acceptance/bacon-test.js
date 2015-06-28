import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance | bacon', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /bacon', function(assert) {
  visit('/bacon');

  waitForCommentsToLoad();

  andThen(function() {
    const commentCount = inspect('bacon-comment-count');
    const comments = inspect('bacon-comments').find('iframe');

    assert.equal(currentURL(), '/bacon');

    assert.equal(commentCount.html(), '1 Comment',
      'The correct comment count should have been added to the DOM');

    assert.ok(comments.attr('src').indexOf('disqus.com') > -1,
      'The comments iframe should have been added to the DOM');
  });
});
