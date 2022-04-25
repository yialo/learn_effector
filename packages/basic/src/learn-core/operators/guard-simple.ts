import { createEffect, createEvent, guard } from 'effector';

const submitButtonClicked = createEvent();

const waitForNumberFx = createEffect((num: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num);
    }, 100);
  });
});

const $isIdle = waitForNumberFx.pending.map((isPending) => !isPending);

const targeted = guard({
  source: waitForNumberFx,
  filter: (fxValue) => fxValue > 3,
});

targeted.watch((value) => {
  console.log('[watch] targeted', value);
});

waitForNumberFx.watch((params) => {
  console.log('[watch] waitForNumberFx, params:', params);
});

waitForNumberFx(2);
