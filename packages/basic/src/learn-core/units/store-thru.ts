import { createEvent, createStore, Store } from 'effector';

const enhance = <T>(fn: (state: T) => T) => {
  return ($store: Store<T>) => $store.map(fn);
};

const added = createEvent<number>();

const $number = createStore(1);

$number.watch((value) => {
  console.log('[watch] $number updated to', value);
});

const $transformedNumber = $number
  .thru(enhance((v) => v * 2))
  .thru(enhance((v) => v + 3));

$transformedNumber.watch((value) => {
  console.log('[watch] $transformedNumber updated to', value);
});

$number.on(added, (sum, passed) => sum + passed);

added(1);
