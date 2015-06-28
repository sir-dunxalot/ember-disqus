import { moduleForComponent, test } from 'ember-qunit';
import setupUnitTest from '../../helpers/setup-unit-test';

const identifier = 'index';

let component;

moduleForComponent('disqus-comment-count', 'Unit | Component | disqus comment count', {
  unit: true,

  beforeEach(assert) {
    setupUnitTest(this, {
      stub: 'count',

      stubAs() {
        assert.ok(true,
          'The cached function should be called to indicate the component called loadDisqusApi on render');
      },
    });

    component = this.subject({
      identifier: identifier // Pass in identifier
    });
  }
});

test('it renders', function(assert) {

  assert.expect(5);

  assert.equal(component._state, 'preRender',
    'The component instance should be created successfully');

  this.render();

  assert.equal(component._state, 'inDOM',
    'The component should render on the page');

  assert.ok(component.$().hasClass('disqus-comment-count'),
    'The component should have a .disqus-comment-count class');

  assert.equal(component.$().data('disqus-identifier'), identifier,
    'The component should have the correct data-disqus-identifier attribute bound');

});
