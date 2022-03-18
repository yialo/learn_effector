import { createEvent, createStore } from 'effector';

type State = string[];

const $items = createStore<State>([]);

const resetEv1 = createEvent();
const resetEv2 = createEvent();
const addEv = createEvent<string>()

$items.watch((items) => {
  console.log('watched: items:', items);
});

$items.on(addEv, (items, newItem) => {
  console.log('added:', { items, newItem });

  return [...items, newItem];
});

$items.reset(resetEv1);
$items.reset(resetEv2);

// addEv('thing 1');
// resetEv1();
// addEv('thing 2');
// resetEv2();

$items.off(resetEv1);
addEv('thing 3');
resetEv1();
addEv('thing 4');
resetEv2();
