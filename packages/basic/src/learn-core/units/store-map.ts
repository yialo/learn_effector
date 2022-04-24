import { createEvent, createStore } from 'effector';

const numberAdded = createEvent<number>();

numberAdded.watch((value) => {
  console.log('[watch] numberAdded:', value);
});

const $total = createStore(1).on(numberAdded, (sum, num) => sum + num);

$total.watch((sum) => {
  console.log('[watch] $sum is now', sum);
});

// Look: on init, $total.watch calls before $mapped mapper
// because of $mapped is not exist at that point

const $mapped = $total.map((newTotalState, prevMappesState) => {
  console.log(
    '[map] $mapped updates:',
    'newTotalState',
    newTotalState,
    'prevMappesState',
    prevMappesState,
  );

  return newTotalState * 2;
});

$mapped.watch((mappedSum) => {
  console.log('[watch] $mapped is now', mappedSum);
});

numberAdded(2);
