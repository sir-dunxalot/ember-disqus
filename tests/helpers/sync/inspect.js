import Ember from 'ember';
import selectorFor from '../selector-for';

const { $ } = Ember;

export default Ember.Test.registerHelper('inspect',
  function(app, name, useJquery = true) {
    const element = find(selectorFor(name))[0];

    if (useJquery) {
      return $(element);
    } else {
      return element;
    }
  }
);
