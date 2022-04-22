import { createEvent, createStore } from 'effector';

const firstEv = createEvent<number>();
const secondEv = createEvent<number>();
const thirdEv = createEvent<number>();

firstEv.watch((value) => {
  console.log('[watch] firstEv called with', value);
});
secondEv.watch((value) => {
  console.log('[watch] secondEv called with', value);
});
thirdEv.watch((value) => {
  console.log('[watch] thirdEv called with', value);
});

const $sum = createStore(0);

$sum.on([firstEv, secondEv], (prevSum, numberPassed) => {
  console.log('[on] $sum for [firstEv, secondEv] called');
  return prevSum + numberPassed;
});

const sumSubscription = $sum.watch((newState) => {
  console.log('[watch] $sum: newState', newState);
});

const $additional = createStore(0);

$additional.watch((newState) => {
  console.log('[watch] $additional: newState', newState);
});

firstEv(2);
secondEv(3);

// Look: $additional always updates after $sum,
// because of the former is subscribed to the later

$additional.on($sum, (prevState, stateFromSum) => {
  console.log('[on] $additional for $sum called');
  return prevState + stateFromSum;
});

$sum.on(firstEv, (prevSum, numberPassed) => {
  console.log('[on] $sum REPLACED reducer for firstEv called');
  return prevSum + numberPassed * 2;
});

$sum.on(thirdEv, (prevSum, numberPassed) => {
  console.log('[on] $sum for thirdEv called');
  return prevSum + numberPassed * 2;
});

firstEv(1);
secondEv(1);
thirdEv(1);

$additional.off($sum);

sumSubscription();
console.log('--- $sum watching stopped');

firstEv(1);
secondEv(1);

const renewedSumSubscription = $sum.watch((newState) => {
  console.log('[watch] $sum: newState', newState);
});
console.log('--- $sum watching renewed');

firstEv(1);
secondEv(1);

renewedSumSubscription.unsubscribe();
console.log('--- $sum watching stopped again');

firstEv(1);
secondEv(1);
