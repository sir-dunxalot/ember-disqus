import Ember from 'ember';
import layout from '../templates/components/disqus-comment-count';
import loadDisqusApi from 'ember-disqus/utils/load-disqus-api';

export default Ember.Component.extend({
  attributeBindings: ['identifier:data-disqus-identifier'],
  classNames: ['disqus-comment-count'],
  layout: layout,
  removeNoun: false,
  tagName: 'span',

  /* Options */

  identifier: null,

  disqusCallback() {
    const disqusWidgets = window.DISQUSWIDGETS;

    if (disqusWidgets) {
      disqusWidgets.getCount(); // Required when transitioning between routes
    }
  },

  /**
  Assert that all required properties have been passed to this component and, if required, load the `count.js` script.

  @method setup
  */

  setup: Ember.on('didInsertElement', function() {
    Ember.assert('A Disqus identifier must be set on the {{disqus-comment-count}} component', this.get('identifier'));

    if (this.get('removeNoun')) {
      this.get('element').addEventListener('DOMSubtreeModified', function(event) {
        const target = event.target;

        /* Remove non-digit characters. For example '8 Comments' --> '8' */

        target.textContent = target.textContent.replace(/[\D]/g, '');
      });
    }

    loadDisqusApi(this, 'count');
  }),
});
