import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('disqus-comments', 'Integration | Component | disqus comments', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('setup', () => {
    return true;
  });

  this.render(hbs`{{disqus-comments identifier='index' setup=setup}}`);

  assert.equal(window.disqus_identifier, "index", "component loaded");
});
