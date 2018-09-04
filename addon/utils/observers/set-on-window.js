import { on } from '@ember/object/evented';
import { observer } from '@ember/object';

export default function setOnWindow(dependentKey, propertyName) {
  return on('init',
    observer(dependentKey, function() {
      window[propertyName] = this.get(dependentKey);
    })
  );
}
