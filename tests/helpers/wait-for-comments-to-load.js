import $ from 'jquery';

import { waitUntil } from '@ember/test-helpers';

export default async function() {

  await waitUntil(() => {
    const iframeExists = $('#disqus_thread iframe').length;
    const commentCounts = $('.disqus-comment-count');
    const commentsAreLoaded = commentCounts.filter(function() {
      return parseFloat(this.innerHTML) !== 0;
    }).length === commentCounts.length;

    return iframeExists && commentsAreLoaded;
  });

}
