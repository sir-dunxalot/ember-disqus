import $ from 'jquery';

import { find } from '@ember/test-helpers';
import selectorFor from './selector-for';

export default function(name, useJquery = true) {
  const element = find(selectorFor(name));

  if (useJquery) {
    return $(element);
  } else {
    return element;
  }
}
