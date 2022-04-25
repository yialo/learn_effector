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

// NOTE: if last arg is not passed, works like overload with array as first param
const $combined = combine($numA, $numB, (a, b) => a + b);
const $combinedObject = combine({ a: $numA, b: $numB }, ({ a, b }) => a + b);
const $combinedArray = combine([$numA, $numB], ([a, b]) => a + b);

$combined.watch((state) => {
  console.log('[watch] $combined, state', state);
});
$combinedObject.watch((state) => {
  console.log('[watch] $combinedObject, state', state);
});
$combinedArray.watch((state) => {
  console.log('[watch] $combinedArray, state', state);
});

added(1);
added(1);
