import { createEffect, createStore } from 'effector';

const loadPostsFx = createEffect<void, unknown[]>();

loadPostsFx.use(async () => {
  const url = `https://jsonplaceholder.typicode.com/posts`;
  const response = await fetch(url);
  return response.json();
});

const posts$ = createStore<unknown[]>([]).on(loadPostsFx.doneData, (_prevState, posts) => posts);

posts$.watch((posts) => {
  console.log(`Posts amount: ${posts.length}`);
});

loadPostsFx();
