# @zestia/ember-dragula

<a href="https://badge.fury.io/js/%40zestia%2Fember-dragula"><img src="https://badge.fury.io/js/%40zestia%2Fember-dragula.svg" alt="npm version" height="18"></a> &nbsp; <a href="http://travis-ci.org/zestia/ember-dragula"><img src="https://travis-ci.org/zestia/ember-dragula.svg?branch=master"></a> &nbsp; <a href="https://david-dm.org/zestia/ember-dragula#badge-embed"><img src="https://david-dm.org/zestia/ember-dragula.svg"></a> &nbsp; <a href="https://david-dm.org/zestia/ember-dragula#dev-badge-embed"><img src="https://david-dm.org/zestia/ember-dragula/dev-status.svg"></a> &nbsp; <a href="https://emberobserver.com/addons/@zestia/ember-dragula"><img src="https://emberobserver.com/badges/-zestia-ember-dragula.svg"></a>

This Ember addon provides support for drag and drop using [dragula](https://bevacqua.github.io/dragula/)

## Installation

```
ember install @zestia/ember-dragula
```

## Demo

https://zestia.github.io/ember-dragula

## Example

```handlebars
<EmberDragula as |d|>
  <d.Container>
    {{#each this.listOne as |item|}}
      {{item}}
    {{/each}}
  </d.Container>

  <d.Container>
    {{#each this.listTwo as |item|}}
      {{item}}
    {{/each}}
  </d.Container>
</EmberDragula>

```

## Options

@zestia/ember-dragula supports the full range of options that dragula accepts, see: [https://github.com/bevacqua/dragula#dragulacontainers-options](https://github.com/bevacqua/dragula#dragulacontainers-options)

To supply options:

```handlebars
<EmberDragula @options={{hash option=value}} as |d|>
  ...
</EmberDragula>

```

## Events

@zestia/ember-dragula supports the full range of events that dragula emits, see [https://github.com/bevacqua/dragula#drakeon-events](https://github.com/bevacqua/dragula#drakeon-events). These can be accessed by prefixing the event name with "on":

```handlebars
<EmberDragula @onDrag={{action "drag"}} @onDrop={{action "drop"}} @onCancel={{action "cancel"}} ... as |d|>
  <d.Container>
    {{#each this.listOne as |item|}}
      {{item}}
    {{/each}}
  </d.Container>

  <d.Container>
    {{#each this.listTwo as |item|}}
      {{item}}
    {{/each}}
  </d.Container>
</EmberDragula>
```

```JavaScript
  drop(el, target, source, sibling) {

  }
```

The dragula instance is emitted via an `onReady` action, and allows access to all functions and fields on `drake` (https://github.com/bevacqua/dragula#api):

```handlebars
<EmberDragula @onReady={{action "ready"}} as |d|>
  ...
</EmberDragula>

```

```JavaScript
  ready(drake) {

  }
```

## Test helpers

To simulate dragging and dropping, test helpers are provided:

```javascript
import { simulateDragDrop } from '@zestia/ember-dragula/test-support/helpers/simulate-drag-drop';
```

Within a test:

```javascript
const dragMe = find('.drag-me');
const dropHere = find('.drop-here');

await simulateDrag(dragMe);
await simulateDrop(dragMe, dropHere);
await simulateDragDrop(dragMe, dropHere);
```
