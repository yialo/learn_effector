import { createEffect } from 'effector';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

type PostFetchParams = { id: number };

const fetchPostFx = createEffect<PostFetchParams, unknown>();

const fxHandler = async ({ id }: PostFetchParams) => {
  const response = await fetch(`${POSTS_URL}/${id}`);
  return response.json();
};

const returnedFromUse = fetchPostFx.use(fxHandler);

console.log('fetchPostFx.use returns the same effect?', returnedFromUse === fetchPostFx);

console.log('Check current effect handler', fetchPostFx.use.getCurrent() === fxHandler);

const postIdIncremented = fetchPostFx.prepend((id: number) => ({ id: id + 1 }));

const postFetchStarted = fetchPostFx.map(({ id }) => ({ message: `Requested post with ID ${id}` }));

postIdIncremented.watch((value) => {
  console.log('[watch] postIdIncremented event happened, value:', value);
});

postFetchStarted.watch((params) => {
  console.log('[watch] postFetchStarted event happened, value:', params);
});

// Look: .then callback triggers AFTER .done and .doneData event watchers
fetchPostFx({ id: 1 }).then((data) => {
  console.log('fetchPostFx itself resolved with data', data);
});

// Look: this watcher does not have a chance to trigger on first fetchPostFx call
// because of fetchPostFx has already called, but .done and .doneData watchers triggers well
fetchPostFx.watch((value) => {
  console.log('[watch] fetchPostFx called with', value);
});

fetchPostFx.doneData.watch((value) => {
  console.log('[watch] fetchPostFx.doneData called with value', value);
});

// Look: .done triggers before .doneData
fetchPostFx.done.watch(({ params, result }) => {
  console.log('[watch] fetchPostFx.done called with params', params, 'result', result);
});

postIdIncremented(1);
