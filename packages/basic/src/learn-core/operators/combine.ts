import { createStore, combine, createEvent } from 'effector';

const added = createEvent<number>();

const $numA = createStore(0);
const $numB = createStore(0);

$numA.on(added, (_, addend) => addend);

$numA.watch((state) => {
  console.log('[watch] $numA, state', state);
});

$numB.on(added, (_, addend) => addend * 2);

$numB.watch((state) => {
  console.log('[watch] $numB, state', state);
});

const $combined = combine($numA, $numB, (a, b) => a + b);

$combined.watch((state) => {
  console.log('[watch] $combined, state', state);
});

added(1);
added(1);
