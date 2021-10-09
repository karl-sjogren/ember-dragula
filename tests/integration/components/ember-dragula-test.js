import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, setupOnerror, resetOnerror } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberDragula from '@zestia/ember-dragula/components/ember-dragula';
const { keys } = Object;

module('Integration | Component | ember-dragula', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(function () {
    resetOnerror();
  });

  test('it emits dragula events as actions', async function (assert) {
    assert.expect(19);

    const testArgs = ['a', 'b', 'c', 'd'];

    let drake;

    this.handleReady = (d) => (drake = d);

    this.test = (name, ...args) => {
      assert.step(name);
      assert.deepEqual(args, testArgs);
    };

    await render(hbs`
      <EmberDragula
        @onReady={{this.handleReady}}
        @onDrag={{fn this.test "drag"}}
        @onDragEnd={{fn this.test "dragEnd"}}
        @onDrop={{fn this.test "drop"}}
        @onCancel={{fn this.test "cancel"}}
        @onRemove={{fn this.test "remove"}}
        @onShadow={{fn this.test "shadow"}}
        @onOver={{fn this.test "over"}}
        @onOut={{fn this.test "out"}}
        @onCloned={{fn this.test "cloned"}}
      />
    `);

    keys(EmberDragula.events).forEach((name) => {
      drake.emit(name, ...testArgs);
    });

    assert.verifySteps([
      'drag',
      'dragEnd',
      'drop',
      'cancel',
      'remove',
      'shadow',
      'over',
      'out',
      'cloned'
    ]);
  });

  test('subclass', async function (assert) {
    assert.expect(2);

    setupOnerror((error) => {
      if (error.message === 'Not intended to be subclassed') {
        assert.step('throws');
        return;
      }

      throw error;
    });

    class MyDrgula extends EmberDragula {}

    this.owner.register('component:my-dragula', MyDrgula);

    await render(hbs`<MyDragula />`);

    assert.verifySteps(['throws']);
  });

  test('it adds container to drake when container is added', async function (assert) {
    assert.expect(1);

    let drake;

    this.handleReady = (d) => (drake = d);

    await render(hbs`
      <EmberDragula @onReady={{this.handleReady}} as |d|>
        <d.Container />
      </EmberDragula>
    `);

    assert.deepEqual(
      drake.containers[0],
      find('.ember-dragula__container:nth-child(1)')
    );
  });

  test('it removes container from drake when container is removed', async function (assert) {
    assert.expect(2);

    let drake;

    this.showContainer = true;
    this.handleReady = (d) => (drake = d);

    await render(hbs`
      <EmberDragula @onReady={{this.handleReady}} as |d|>
        {{#if this.showContainer}}
          <d.Container />
        {{/if}}
      </EmberDragula>
    `);

    assert.deepEqual(
      drake.containers[0],
      find('.ember-dragula__container:nth-child(1)')
    );

    this.set('showContainer', false);

    assert.deepEqual(drake.containers, []);
  });

  test('tear down', async function (assert) {
    assert.expect(2);

    let drake;

    this.show = true;
    this.handleReady = (d) => (drake = d);

    await render(hbs`
      {{#if this.show}}
        <EmberDragula @onReady={{this.handleReady}} />
      {{/if}}
    `);

    const originalDrakeDestroy = drake.destroy;

    drake.destroy = () => {
      assert.step('destroyed drake');
      originalDrakeDestroy();
    };

    this.set('show', false);

    assert.verifySteps(
      ['destroyed drake'],
      'drake is torn down when the component is torn down'
    );
  });
});
