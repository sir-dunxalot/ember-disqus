import { currentRouteName, getContext, waitUntil } from '@ember/test-helpers'
import { run } from '@ember/runloop';
import { typeOf } from '@ember/utils';

import loadDisqusApi from 'ember-disqus/utils/load-disqus-api';

export default function(fileName, callback) {
  const { owner } = getContext();
  const route = owner.lookup(`route:${currentRouteName()}`);

  let done = false;

  /* Wait until the script is loaded before continuining
  the tests */

  run(function() {
    route.set('disqusCallback', function(retrievedFromCache) {

      if (typeOf(callback) === 'function') {
        callback(retrievedFromCache);
      }

      done = true;

    });
  });

  loadDisqusApi(route, fileName);

  waitUntil(function() {
    return done;
  });

}
