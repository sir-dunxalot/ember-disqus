import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';

import inspect from '../helpers/inspect';
import waitForCommentsToLoad from '../helpers/wait-for-comments-to-load';

module('Acceptance | toast', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /toast', async function(assert) {
    await visit('/toast');

    await waitForCommentsToLoad();

    const commentCount = inspect('toast-comment-count');
    const comments = inspect('toast-comments').find('iframe');

    assert.equal(currentURL(), '/toast',
      'The URL is not correct');

    assert.equal(commentCount.html(), '1',
      'The correct comment count should have been added to the DOM with the removeNoun argument');

    assert.ok(comments.attr('src').indexOf('disqus.com') > -1,
      'The comments iframe should have been added to the DOM');

  });

});
