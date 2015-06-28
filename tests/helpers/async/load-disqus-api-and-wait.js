import Ember from 'ember';
import loadDisqusApi from 'ember-disqus/utils/load-disqus-api';

export default Ember.Test.registerAsyncHelper('loadDisqusApiAndWait',
  function(app, fileName, callback) {

    const currentRouteName = app.testHelpers.currentRouteName();
    const route = app.__container__.lookup(`route:${currentRouteName}`);

    let done = false;

    console.log('in async helper', done);

    /* Wait until the script is loaded before continuining
    the tests */

    Ember.run(function() {
      route.set('disqusCallback', function(retrievedFromCache) {
        // Ember.run(function() {

          if (Ember.typeOf(callback) === 'function') {
            callback(retrievedFromCache);
          }

          done = true;
        // });
      });
    });

    loadDisqusApi(route, fileName);

    Ember.Test.registerWaiter(function() {
      return done;
    });
  }
);
