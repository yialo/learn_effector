import { createEvent } from 'effector';

const firstEv = createEvent<number>();
const mappedEv = firstEv.map((value) => value * 2);
const prependedEv = firstEv.prepend<number>((value) => value * 3);

firstEv.watch((value) => {
  console.log('[watch] firstEv with', value);
});

mappedEv.watch((value) => {
  console.log('[watch] mappedEv with', value);
});

prependedEv.watch((value) => {
  console.log('[watch] prependedEv with', value);
});

prependedEv(1);

// NOTE: call of derived events is deprecated
mappedEv(2);
