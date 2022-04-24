import { createEffect } from 'effector';

const throwerFx = createEffect(async (num: number) => {
  throw new Error(String(num + 1));
});

// Look: .pending triggers after effect call and after .fail/.failData
throwerFx.pending.watch((state) => {
  console.log('[watch] throwerFx.pending, new state', state);
});

throwerFx.watch((params) => {
  console.log('[watch] throwerFx called with params', params);
});

throwerFx.failData.watch((error) => {
  console.log('[watch] throwerFx.failData, error', error.message);
});

throwerFx.fail.watch(({ error, params }) => {
  console.log('[watch] throwerFx.fail, params', params, 'error', error.message);
});

throwerFx(1);
