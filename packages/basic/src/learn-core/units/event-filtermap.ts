import { createEvent, createStore, sample } from 'effector';

const enum Color {
  RED = 'RED',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
}

const COLORS = [Color.RED, Color.YELLOW, Color.GREEN];
const getRandomColor = () => {
  const colorIndex = Math.floor(Math.random() * COLORS.length);
  return COLORS[colorIndex];
};

const appleTaken = createEvent<Color>();

const redAppleTaken = appleTaken.filterMap((color) => {
  if (color === Color.RED) {
    return 1;
  }
});

const $bag = createStore(0);

$bag.on(redAppleTaken, (totalAmount, oneApple) => totalAmount + oneApple);

$bag.watch((applesAmount) => {
  console.log('[watch] applesAmount in $bag:', applesAmount);
});

const threeRedApplesReceived = sample({
  source: $bag,
  filter: (applesInBag) => applesInBag === 3,
});

threeRedApplesReceived.watch(() => {
  console.log('[watch] threeRedApplesReceived!');
});

for (let i = 0; i < 20; i++) {
  appleTaken(getRandomColor());
}
