import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-disqus/tests/helpers/start-app';

var application;

module('Acceptance | bacon', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /bacon', function(assert) {
  visit('/bacon');

  andThen(function() {
    assert.equal(currentURL(), '/bacon');
  });
});
