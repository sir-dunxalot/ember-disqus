import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';

import inspect from '../helpers/inspect';
import waitForCommentsToLoad from '../helpers/wait-for-comments-to-load';

module('Acceptance | eggs', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /eggs', async function(assert) {
    await visit('/eggs');

    await waitForCommentsToLoad();

    const commentCount = inspect('eggs-comment-count');
    const comments = inspect('eggs-comments').find('iframe');

    assert.equal(currentURL(), '/eggs',
      'The URL is not correct');

    assert.equal(commentCount.html(), '2 Comments',
      'The correct comment count should have been added to the DOM');

    assert.ok(comments.attr('src').indexOf('disqus.com') > -1,
      'The comments iframe should have been added to the DOM');

  });

});
