import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';

import inspect from '../helpers/inspect';
import waitForCommentsToLoad from '../helpers/wait-for-comments-to-load';

module('Acceptance | bacon', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /bacon', async function(assert) {
    await visit('/bacon');

    await waitForCommentsToLoad();

    const commentCount = inspect('bacon-comment-count');
    const comments = inspect('bacon-comments');

    assert.equal(currentURL(), '/bacon',
      'The URL is not correct');

    assert.equal(commentCount.html(), '1 Comment',
      'The correct comment count should have been added to the DOM');

    assert.ok(comments.find('iframe').attr('src').indexOf('disqus.com') > -1,
      'The comments iframe should have been added to the DOM');
  });

});
