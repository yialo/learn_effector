import { restore, createEvent, createEffect } from 'effector';

const addEv = createEvent<number>();
const $syncAcc = restore(addEv, 0);

const waitAndResolveFx = createEffect((num: number) => Promise.resolve(num));
const $asyncAccAlways = restore(waitAndResolveFx, 0);

const waitFx = createEffect(({ isOk, num }: { isOk: boolean; num: number }) => {
  if (isOk) {
    return Promise.resolve(num);
  } else {
    return Promise.reject(num);
  }
});
// NOTE: it's impossible to restore from effect that always fails
const $asyncAccSometimes = restore(waitFx, 0);

// Look: watchers initially trigger in subscription order
$asyncAccAlways.watch((state) => {
  console.log('[watch] $asyncAccAlways, state', state);
});
$syncAcc.watch((state) => {
  console.log('[watch] $syncAcc, state', state);
});
$asyncAccSometimes.watch((state) => {
  console.log('[watch] $asyncAccSometimes, state', state);
});
$asyncAccSometimes.watch((state) => {
  console.log('[watch] $asyncAccSometimes, state', state);
});

console.group('Actions');

// Look: effects resolves after event, due to async nature of effect
waitAndResolveFx(4);
waitFx({ isOk: true, num: 5 });
// Look: no store update on effect failure
waitFx({ isOk: false, num: 2 });
addEv(3);
