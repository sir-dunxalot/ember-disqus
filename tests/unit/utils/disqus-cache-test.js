import Ember from 'ember';
import disqusCache from '../../../utils/disqus-cache';
import { module, test } from 'qunit';

module('Unit | Utility | disqus cache');

test('it works', function(assert) {

  assert.expect(3);

  assert.ok(disqusCache,
    'The Disqus cache should exist in the application');

  assert.equal(Ember.typeOf(disqusCache), 'object',
    'The Disqus cache should be POJO');

  assert.ok(disqusCache.isDisqusCache,
    'The Disqus cache should be identifiable by a isDisqusCache flag');

});
