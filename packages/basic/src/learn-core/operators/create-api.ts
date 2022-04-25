import { createStore, createApi } from 'effector';

type Position = Record<'x' | 'y', number>;

const $cursorPosition = createStore<Position>({ x: 0, y: 0 });

$cursorPosition.watch((position) => {
  console.log('[watch] $cursorPosition', JSON.stringify(position));
});

const { down, left, right, up } = createApi($cursorPosition, {
  up: ({ x, y }: Position, d: number) => ({ x, y: y + d }),
  down: ({ x, y }: Position, d: number) => ({ x, y: y - d }),
  right: ({ x, y }: Position, d: number) => ({ x: x + d, y }),
  left: ({ x, y }: Position, d: number) => ({ x: x - d, y }),
});

down(2);
right(3);
up(5);
left(4);
