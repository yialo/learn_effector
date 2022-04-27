import { createEvent, createEffect, merge } from 'effector';

const submitButtonClicked = createEvent<number>();

const waitForNumberFx = createEffect((num: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num);
    }, 100);
  });
});

const submitOrWaitEv = merge([submitButtonClicked, waitForNumberFx.pending, waitForNumberFx]);

submitOrWaitEv.watch((value) => {
  console.log('[watch] submitOrWaitEv', value);
});

submitButtonClicked(2);
waitForNumberFx(3);
