import { createEffect } from 'effector';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const fetchPostFx = createEffect(async ({ id }: { id: number }) => {
  const response = await fetch(`${POSTS_URL}/${id}`);
  return response.json();
});

fetchPostFx.watch((value) => {
  console.log('[watch] fetchPostFx called with', value);
});

fetchPostFx.done.watch(({ params, result }) => {
  console.log('[watch] fetchPostFx.done called with params', params, 'result', result);
});

fetchPostFx.doneData.watch((value) => {
  console.log('[watch] fetchPostFx.doneData called with value', value);
});

fetchPostFx({ id: 1 }).then((data) => {
  console.log('fetchPostFx itself resolved with data', data);
})
