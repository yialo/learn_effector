import { createEffect } from 'effector';

const loadPostFx = createEffect(async (id = 1) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const response = await fetch(url);
  return response.json();
});

loadPostFx.pending.watch((pending) => {
  console.log(`Is effect pending? ${pending ? 'yes' : 'no'}`);
});

loadPostFx.done.watch(({ params, result }) => {
  console.log(`done, params: ${params}, result: ${JSON.stringify(result, null, 2)}`);
});

loadPostFx.doneData.watch((result) => {
  console.log(`doneData, result: ${JSON.stringify(result, null, 2)}`);
});

loadPostFx.finally.watch((value) => {
  console.log(`finally, params: ${value.params}, status: ${value.status}`);

  if (value.status === 'done') {
    console.log(`finally, result: ${JSON.stringify(value.result, null, 2)}`);
  }
});

loadPostFx(2);
