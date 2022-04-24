import { createEvent, createStore } from 'effector';

const added = createEvent<number>();
const $num = createStore(0);

$num.watch((value) => {
  console.log('[watch] $num', value);
});

added.watch((value) => {
  console.log('[watch] added', value);
});

$num.on(added, (state, payload) => state + payload);

console.group('Actions started');

added(1);
added(2);

console.groupEnd();
