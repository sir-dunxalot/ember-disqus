import { later } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('disqus-comment-count', 'Integration | Component | disqus comment count', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('setup', () => {
    true;
  });

  this.render(hbs`{{disqus-comment-count identifier='index' setup=setup}}`);

  assert.equal(this.$().text().trim(), '0');

  later(this, () => {
    true;
  }, 3000);

});
