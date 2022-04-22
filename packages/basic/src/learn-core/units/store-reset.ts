import { createEvent, createStore } from 'effector';

type State = string[];

// Unit creation

const $items = createStore<State>([]);

const resetEv1 = createEvent();
const resetEv2 = createEvent();
const addEv = createEvent<string>()

// Model definition

console.group('Model definition');

$items.watch((items) => {
  console.log('[watch] $items changed:', `[${items.toString()}]`);
});

$items.on(addEv, (items, newItem) => {
  console.log('[on] added to $items:', { items: `[${items.toString()}]`, newItem });

  return [...items, newItem];
});

$items.reset([resetEv1, resetEv2]);

// Look: event watchers trigger before store watchers, even the former defined after the later
addEv.watch(() => {
  console.log('[watch] addEv called');
});

resetEv1.watch(() => {
  console.log('[watch] resetEv1 called');
});

resetEv2.watch(() => {
  console.log('[watch] resetEv2 called');
});

console.groupEnd();

// Actions

console.group('Actions');

addEv('thing 1');
resetEv1();
addEv('thing 2');
resetEv2();

$items.off(resetEv1);

addEv('thing 3');

console.log('-- Look: event is called, but store stays unchanged!');

resetEv1();
addEv('thing 4');
resetEv2();

console.groupEnd();
