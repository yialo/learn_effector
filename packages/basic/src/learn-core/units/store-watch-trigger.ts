import { createEvent, createStore } from 'effector';

const freeEv = createEvent<number>();
const boundEv = createEvent<number>();

const $number = createStore<number>(0).on(boundEv, (prevState, num) => prevState + num);

boundEv.watch(() => {
  console.log('[watch] boundEv called');
});

$number.watch((state) => {
  console.log('[watch] $number updated to', state);
});

// Look: if store is not subscribed to event with .on,
// store watchers and event watchers calls in code order,
// otherwise event watchers calls first
$number.watch(freeEv, (state, numFromEvent) => {
  console.log('[watch] $number after freeEv call, state', state, 'numFromEvent', numFromEvent);
});

freeEv.watch(() => {
  console.log('[watch] freeEv called');
});

console.group('Actions started');

console.log('- 1st freeEv call');
freeEv(1);

$number.watch(boundEv, (state, numFromEvent) => {
  console.log('[watch] $number after boundEv call, state', state, 'numFromEvent', numFromEvent);
});

console.log('- 2nd freeEv call');
freeEv(2);

console.log('- boundEv call');
boundEv(3);

console.groupEnd();
