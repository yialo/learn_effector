import { createEffect } from 'effector';

const successOrFailureFx = createEffect<{ isOk: boolean }, string>(({ isOk }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isOk) {
        resolve('OK')
      } else {
        reject('Not OK');
      }
    });
  });
});

successOrFailureFx.pending.watch((state) => {
  console.log('[watch] successOrFailureFx.pending, new state', state);
});

successOrFailureFx.finally.watch((value) => {
  const { params, status } = value;

  if (status === 'done') {
    console.log('[watch] successOrFailureFx.finally called with params', params, 'result', value.result);
  } else {
    console.log('[watch] successOrFailureFx.finally called with params', params, 'error', value.error);
  }
});

successOrFailureFx.doneData.watch((result) => {
  console.log('[watch] successOrFailureFx.doneData, result', result);
});

successOrFailureFx.failData.watch((reason) => {
  console.log('[watch] successOrFailureFx.failData, error', reason);
});

// Look: .inFlight fires before .pending (except initialization triggers, where in subscription order)
successOrFailureFx.inFlight.watch((count) => {
  console.log('[watch] successOrFailureFx.inFlight, count', count);
});

console.group('Actions');

successOrFailureFx({ isOk: true });
successOrFailureFx({ isOk: false });

console.groupEnd();
