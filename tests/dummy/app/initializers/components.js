import Component from '@ember/component';

export function initialize(/* container, application */) {

  Component.reopen({
    attributeBindings: ['data-test'],
    'data-test': null,
  });

}

export default {
  name: 'components',
  initialize: initialize
};
