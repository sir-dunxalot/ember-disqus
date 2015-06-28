import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-disqus/tests/helpers/start-app';

var application;

module('Acceptance | toast', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /toast', function(assert) {
  visit('/toast');

  andThen(function() {
    assert.equal(currentURL(), '/toast');
  });
});
