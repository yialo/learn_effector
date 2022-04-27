import { attach, createStore } from 'effector';

type State = {
  id: number;
};

const $product = createStore<State>({ id: 1 });

const derivedFx = attach({
  source: $product,
  effect({ id }: State, message: string) {
    return `Product with ID ${id} requested. ${message}!`;
  },
});

derivedFx.watch((message) => {
  console.log('[watch] derivedFx, message:', message);
});

derivedFx.doneData.watch((data) => {
  console.log('[watch] derivedFx, message:', data);
});

derivedFx('Good one!');
