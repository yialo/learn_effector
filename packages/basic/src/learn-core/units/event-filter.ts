import { createEvent } from 'effector';

const sneakersOfSizeReceived = createEvent<number>();

const sneakersBought = sneakersOfSizeReceived.filter({
  fn: (size) => size === 42,
});

sneakersOfSizeReceived.watch((size) => {
  console.log('[watch] sneakersOfSizeReceived:', size);
});

sneakersBought.watch((size) => {
  console.log('[watch] sneakersBought! Size:', size);
});

sneakersOfSizeReceived(40);
sneakersOfSizeReceived(42);
sneakersOfSizeReceived(43);
