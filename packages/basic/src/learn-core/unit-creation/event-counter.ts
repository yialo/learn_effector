import { createEvent, createStore } from 'effector';

const incrementedBy = createEvent<number>();
const decrementedBy = createEvent<number>();
const resetCounter = createEvent();

const counter$ = createStore(0)
  .on(incrementedBy, (state, value) => state + value)
  .on(decrementedBy, (state, value) => state - value)
  .reset(resetCounter);

counter$.watch((newState) => {
  console.log(`counter updated: ${newState}`);
});

incrementedBy(2);
incrementedBy(5);
decrementedBy(3);
resetCounter();
