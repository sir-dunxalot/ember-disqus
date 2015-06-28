import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-disqus/tests/helpers/start-app';

var application;

module('Acceptance | eggs', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /eggs', function(assert) {
  visit('/eggs');

  andThen(function() {
    assert.equal(currentURL(), '/eggs');
  });
});
