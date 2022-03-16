import { createStore, createEvent, forward } from 'effector';

const GOOD_STRIKE_THRESHOLD = 300;

const strike = createEvent<number>();
const reallyGoodStrike = createEvent<number>();

const lastStrikeStrength$ = createStore(0, {
  updateFilter: (strength) => strength >= GOOD_STRIKE_THRESHOLD,
});

lastStrikeStrength$.on(strike, (_, strength) => strength);

forward({
  from: lastStrikeStrength$,
  to: reallyGoodStrike,
});

lastStrikeStrength$.watch(strike, (currentState) => {
  console.log(`currentState: ${currentState}`);
});

reallyGoodStrike.watch((strength) => {
  console.log(`Really good strike! Strength: ${strength}`);
});

strike(100);
strike(200);
strike(350);
strike(250);
