import { createEvent } from 'effector';

const firstEv = createEvent<number>();
const secondEv = firstEv.map((value) => value * 2);

firstEv.watch((value) => {
  console.log('[watch] firstEv with', value);
});

secondEv.watch((value) => {
  console.log('[watch] secondEv with', value);
});

firstEv(1);

// NOTE: call of derived events is deprecated
secondEv(2);
