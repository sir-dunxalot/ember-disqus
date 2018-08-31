import Ember from 'ember';
import defaultFor from 'ember-disqus/utils/default-for';
import layout from '../templates/components/disqus-comments';
import loadDisqusApi from 'ember-disqus/utils/load-disqus-api';
import setOnWindow from 'ember-disqus/utils/observers/set-on-window';

export default Ember.Component.extend({
  elementId: 'disqus_thread',
  classNames: ['disqus-comments'],

  /**
  Options that can be passed to identify the requested Disqus comment thread
  */

  categoryId: null,
  disqusUrl: null,
  identifier: null,
  title: null,
  layout: layout,

  /**
  Assert that all required properties have been passed to this component and, if required, load the `embed.js` script.

  The `#disqus_thread` element (this component) must be on the page before the `embed.js` script is loaded. Thus, we run this method on `didInsertElement`.

  @method setup
  */

  setup: Ember.on('didInsertElement', function() {
    Ember.assert('A Disqus identifier or disqusUrl must be set on the {{disqus-comments}} component', this.get('identifier') || this.get('disqusUrl'));

    if (!window.DISQUS) {
      loadDisqusApi(this, 'embed');
    } else {
      this.reset();
    }
  }),

  /**
  Adds ajax functionality to the comment thread. This method tells Disqus to load the comment thread with the given attributes.

  Usually you don't need to manually call this method - `ember-disqus` calls it in private methods.

  @method reset
  @param [identifier] the Disqus identifier to request the thread with. If not passed, will default to the component's current `identifier` property
  @param [title] the Disqus title to request the thread with. If not passed, will default to the component's current `title` property
  @param [disqus_url] the Disqus url to optionally request a thread from a different url if your site is whitelisted. If passed, `identifier` will be ignored.
  */

  reset: function(identifier, title, disqus_url) {
    Ember.run.debounce(this, function() {
      identifier = defaultFor(identifier, this.get('identifier'));
      disqus_url = defaultFor(disqus_url, this.get('disqusUrl'));
      title = defaultFor(title, this.get('title'));

      /** @ref https://help.disqus.com/customer/portal/articles/472107-using-disqus-on-ajax-sites */

      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = !disqus_url && identifier || undefined;
          this.page.url = disqus_url || window.location.href;
          this.page.title = title || undefined;
        }
      });
    }, 100);
  },

  /**
  Disqus requires that all it's properties be set on the window. These methods observe the Disqus attributes and set them as required when they change.
  */

  _setCategoryId: setOnWindow('categoryId', 'disqus_category_id'),
  _setDisqusUrl: setOnWindow('disqusUrl', 'disqus_url'),
  _setIdentifier: setOnWindow('identifier', 'disqus_identifier'),
  _setTitle: setOnWindow('title', 'disqus_title'),

  /**
  Update the disqus comment thread when one of the thread attributes being passed to this component changes.

  @method _updateDisqusComments
  @private

  @todo - need a better way of identifying if DISQUS is already loaded here
  */

  _updateDisqusComments: Ember.observer('categoryId', 'disqusUrl', 'identifier', 'shortname', 'title', function() {
    if (window.DISQUS) {
      Ember.run.debounce(this, this.reset, 100);
    }
  }),

});


