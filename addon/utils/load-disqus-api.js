import DisqusCache from 'ember-disqus/utils/disqus-cache';
import Ember from 'ember';
import defaultFor from 'ember-disqus/utils/default-for';

export default function loadFilepickerApi(context, fileName) {
  const ENV = context.container.lookupFactory('config:environment');

  let documentIsReady, filePath, cachedValue, shortname, shouldLazyLoad;

  Ember.assert('You must set a disqus.shortname option in your config/environment module', ENV.disqus && ENV.disqus.shortname);

  shortname = ENV.disqus.shortname;
  shouldLazyLoad = defaultFor(ENV.disqus.lazyLoad, true);
  filePath = `//${shortname}.disqus.com/${fileName}.js`;
  cachedValue = DisqusCache[filePath];

  /* Set the shortname property on the window */

  if (!window.disqus_shortname) {
    window.disqus_shortname = shortname;
  }

  documentIsReady = document.readyState === 'complete';

  /* Check to see is everything else in the app has loaded for lazy loading */

  if (cachedValue) {

    /* Allow the cache to store methods for testing purposes, etc */

    if (Ember.typeOf(cachedValue) === 'function') {
      cachedValue();
    }

    /* If window has the related Disqus property, don't load anything... */

    return;
  } else if (!shouldLazyLoad || documentIsReady) {

    /* ... Else if we're ready to load the Disqus API, load it... */

    Ember.$.getScript(fileName).then(function() {
      if (Ember.typeOf(context.disqusCallback) === 'function') {
        context.disqusCallback(); // Ensure context
      }
    });

    DisqusCache[filePath] = true; // So we know API has loaded
  } else {

    /* ... Else wait a small period and check again to see if the Ember app has fully loaded. */

    Ember.run.debounce(this, function() {
      loadFilepickerApi(context, fileName);
    }, 200);
  }
}
