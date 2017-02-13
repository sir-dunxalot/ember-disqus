import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('disqus-comments', 'Integration | Component | disqus comments', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('setup', () => {
    true;
  });

  this.render(hbs`{{disqus-comments identifier='index' setup=setup}}`);

  assert.equal(this.$().text().trim(), 'Loading comments...');

});
