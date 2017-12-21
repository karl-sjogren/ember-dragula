import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-dragula', 'Integration | Component | dragulember sortable', {
  integration: true
});


test('it listens for event on drop', async function(assert) {
  assert.expect(3);

  const fakeDrake = {
    on: (eventName, cb) => {
      if(eventName === 'drop') {
        cb('dropElm', 'source', 'target');
      }
    },
    destroy: () => {}
  };
  window.dragula = () => {
    return fakeDrake;
  };

  this.set('onDropAction', function(dropElm, source, target) {
    assert.equal(dropElm, 'dropElm');
    assert.equal(target, 'target');
    assert.equal(source, 'source');
  });

  await this.render(hbs`
    {{#ember-dragula drop=(action onDropAction)}}
      template block text
    {{/ember-dragula}}
  `);
});

test('it listens for event on drag', async function(assert) {
  assert.expect(2);

  const fakeDrake = {
    on: (eventName, cb) => {
      if(eventName === 'drag') {
        cb('el', 'source');
      }
    },
    destroy: () => {}
  };
  window.dragula = () => {
    return fakeDrake;
  };

  this.set('onDragAction', function(el, source) {
    assert.equal(el, 'el');
    assert.equal(source, 'source');
  });

  await this.render(hbs`
    {{#ember-dragula drag=(action onDragAction)}}
      template block text
    {{/ember-dragula}}
  `);
});

test('it listens for event on dragend', async function(assert) {
  assert.expect(1);

  const fakeDrake = {
    on: (eventName, cb) => {
      if(eventName === 'dragend') {
        cb('el');
      }
    },
    destroy: () => {}
  };
  window.dragula = () => {
    return fakeDrake;
  };

  this.set('onDragEndAction', function(el) {
    assert.equal(el, 'el');
  });

  await this.render(hbs`
    {{#ember-dragula dragend=(action onDragEndAction)}}
      template block text
    {{/ember-dragula}}
  `);
});

test('it listens for event on cancel', async function(assert) {
  assert.expect(3);

  const fakeDrake = {
    on: (eventName, cb) => {
      if(eventName === 'cancel') {
        cb('el', 'container', 'source');
      }
    },
    destroy: () => {}
  };
  window.dragula = () => {
    return fakeDrake;
  };

  this.set('onCancelAction', function(el, container, source) {
    assert.equal(el, 'el');
    assert.equal(container, 'container');
    assert.equal(source, 'source');
  });

  await this.render(hbs`
    {{#ember-dragula cancel=(action onCancelAction)}}
      template block text
    {{/ember-dragula}}
  `);
});

test('it listens for event on remove', async function(assert) {
  assert.expect(3);

  const fakeDrake = {
    on: (eventName, cb) => {
      if(eventName === 'remove') {
        cb('el', 'container', 'source');
      }
    },
    destroy: () => {}
  };
  window.dragula = () => {
    return fakeDrake;
  };

  this.set('onRemoveAction', function(el, container, source) {
    assert.equal(el, 'el');
    assert.equal(container, 'container');
    assert.equal(source, 'source');
  });

  await this.render(hbs`
    {{#ember-dragula remove=(action onRemoveAction)}}
      template block text
    {{/ember-dragula}}
  `);
});

test('it listens for event on shadow', async function(assert) {
  assert.expect(3);

  const fakeDrake = {
    on: (eventName, cb) => {
      if(eventName === 'shadow') {
        cb('el', 'container', 'source');
      }
    },
    destroy: () => {}
  };
  window.dragula = () => {
    return fakeDrake;
  };

  this.set('onShadowAction', function(el, container, source) {
    assert.equal(el, 'el');
    assert.equal(container, 'container');
    assert.equal(source, 'source');
  });

  await this.render(hbs`
    {{#ember-dragula shadow=(action onShadowAction)}}
      template block text
    {{/ember-dragula}}
  `);
});

test('it listens for event on over', async function(assert) {
  assert.expect(3);

  const fakeDrake = {
    on: (eventName, cb) => {
      if(eventName === 'over') {
        cb('el', 'container', 'source');
      }
    },
    destroy: () => {}
  };
  window.dragula = () => {
    return fakeDrake;
  };

  this.set('onOverAction', function(el, container, source) {
    assert.equal(el, 'el');
    assert.equal(container, 'container');
    assert.equal(source, 'source');
  });

  await this.render(hbs`
    {{#ember-dragula over=(action onOverAction)}}
      template block text
    {{/ember-dragula}}
  `);
});

test('it listens for event on out', async function(assert) {
  assert.expect(3);

  const fakeDrake = {
    on: (eventName, cb) => {
      if(eventName === 'out') {
        cb('el', 'container', 'source');
      }
    },
    destroy: () => {}
  };
  window.dragula = () => {
    return fakeDrake;
  };

  this.set('onOutAction', function(el, container, source) {
    assert.equal(el, 'el');
    assert.equal(container, 'container');
    assert.equal(source, 'source');
  });

  await this.render(hbs`
    {{#ember-dragula out=(action onOutAction)}}
      template block text
    {{/ember-dragula}}
  `);
});

test('it listens for event on cloned', async function(assert) {
  assert.expect(3);

  const fakeDrake = {
    on: (eventName, cb) => {
      if(eventName === 'cloned') {
        cb('el', 'container', 'source');
      }
    },
    destroy: () => {}
  };
  window.dragula = () => {
    return fakeDrake;
  };

  this.set('onClonedAction', function(el, container, source) {
    assert.equal(el, 'el');
    assert.equal(container, 'container');
    assert.equal(source, 'source');
  });

  await this.render(hbs`
    {{#ember-dragula cloned=(action onClonedAction)}}
      template block text
    {{/ember-dragula}}
  `);
});
