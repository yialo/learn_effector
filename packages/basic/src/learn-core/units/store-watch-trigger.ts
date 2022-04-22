import { createEvent, createStore } from 'effector';

const freeEv = createEvent<number>();
const boundEv = createEvent<number>();

const $number = createStore<number>(0).on(boundEv, (prevState, num) => prevState + num);

freeEv.watch(() => {
  console.log('[watch] freeEv called');
});

$number.watch(freeEv, (state, numFromEvent) => {
  console.log('[watch] $number after freeEv call, state', state, 'numFromEvent', numFromEvent);
});

// Look: general watcher (without specific trigger) calls first
$number.watch((state) => {
  console.log('[watch] $number', state);
});

freeEv.watch(() => {
  console.log('[watch] freeEv called');
});

freeEv(1);
freeEv(2);
