import Ember from 'ember';

export default function setOnWindow(dependentKey, propertyName) {
  return Ember.on('init',
    Ember.observer(dependentKey, function() {
      window[propertyName] = this.get(dependentKey);
    })
  );
}
