import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance | toast', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /toast', function(assert) {
  visit('/toast');

  waitForCommentsToLoad();

  andThen(function() {
    const commentCount = inspect('toast-comment-count');
    const comments = inspect('toast-comments').find('iframe');

    assert.equal(currentURL(), '/toast');

    assert.equal(commentCount.html(), '1',
      'The correct comment count should have been added to the DOM with the removeNoun argument');

    assert.ok(comments.attr('src').indexOf('disqus.com') > -1,
      'The comments iframe should have been added to the DOM');
  });
});
