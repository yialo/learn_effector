import { createEvent, createStore, createEffect } from 'effector';

type State = string[];

/* Unit creation */

const $items = createStore<State>([]);

const resetEv1 = createEvent();
const resetEv2 = createEvent();
const addEv = createEvent<string>()

const addFx = createEffect<{ value: string }, string, Error>(({ value }) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      console.log('timeout inside addFx!');
      resolve(value);
    }, 100);
  })
});

/* Model definition */

console.group('Model definition');

console.log('Look: only store watchers called on init, not event/effect ones');

$items.watch((items) => {
  console.log('[watch] $items changed:', `[${items.toString()}]`);
});

$items.on(addEv, (items, newItem) => {
  console.log('[on] added to $items by addEv:', { items: `[${items.toString()}]`, newItem });
  return [...items, newItem];
});

$items.on(addFx.doneData, (items, nextItem) => {
  console.log('[on] added to $items by addFx.doneData:', { items: `[${items.toString()}]`, nextItem });
  return [...items, nextItem];
});

$items.reset([resetEv1, resetEv2]);

// Look: event/effect watchers trigger before store watchers, even the former ones defined after the laters

addEv.watch(() => {
  console.log('[watch] addEv called');
});

resetEv1.watch(() => {
  console.log('[watch] resetEv1 called');
});

resetEv2.watch(() => {
  console.log('[watch] resetEv2 called');
});

addFx.watch(() => {
  console.log('[watch] addFx called');
});

addFx.doneData.watch(() => {
  console.log('[watch] addFx.doneData called');
});

// Look: effect 'done' event calls before 'doneData' one

addFx.done.watch(({ params, result }) => {
  console.log('[watch] addFx.done called', { params, result });
});

console.groupEnd();

/* Sync actions */

console.group('Sync actions');

addFx({ value: 'thing 0' });

addEv('thing 1');
resetEv1();
addEv('thing 2');
resetEv2();

$items.off(resetEv1);

addEv('thing 3');

console.log('Look: event is called, but store stays unchanged');

resetEv1();
addEv('thing 4');
resetEv2();

console.groupEnd();

/* Async actions */

console.group('Async actions');
