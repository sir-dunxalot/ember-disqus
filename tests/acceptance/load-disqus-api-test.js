import DisqusCache from 'ember-disqus/utils/disqus-cache';
import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

/* Core tests abstracted for us in multiple tests */

function testFileName(assert, fileName) {
  const expectedShortname = 'emberdisqustest';

  visit('/load-disqus-api');

  /* Make a single request for the embed file */

  loadDisqusApiAndWait(fileName);

  andThen(function() {


    assert.equal(document.readyState, 'complete',
      'The document should have loaded before the Disqus API');

    assert.equal(window.disqus_shortname, expectedShortname,
      'The util should set the Disqus shortname on the window');

    assert.ok(DisqusCache[`//${expectedShortname}.disqus.com/${fileName}.js`],
      `The Disqus cache should indicate that the ${fileName} API file was loaded`);

  });

  /* Now request the script again check the cache is called and
  not the getScript function */

  loadDisqusApiAndWait(fileName, function(retrievedFromCache) {

    assert.ok(retrievedFromCache,
      `The cache should handle the second API call for ${fileName}`);

  });
}

module('Acceptance | load disqus api', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Default use of loadDisqusApi for embed', function(assert) {
  assert.expect(4);

  testFileName(assert, 'embed');
});

test('Default use of loadDisqusApi for embed', function(assert) {
  assert.expect(4);

  testFileName(assert, 'count');
});
