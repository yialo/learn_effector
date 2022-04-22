import { createEvent, createStore, is } from 'effector';

console.group('Initialization');

const added = createEvent<number>();
const $sum = createStore(0);

console.log('is.event($sum.updates)?', is.event($sum.updates));
console.log('$sum.shortName =', $sum.shortName);
console.log('$sum.defaultState =', $sum.defaultState);

$sum.on(added, (sum, num) => sum + num);

$sum.watch((value) => {
  console.log('[watch] $sum updated with', value);
});

// Look: not triggered on init phase
$sum.updates.watch((value) => {
  console.log('[watch] $sum.updates updated with', value);
})

console.groupEnd();

console.group('Actions');

added(1);
console.log('$sum.getState() returns', $sum.getState());

console.groupEnd();
