import { createEffect } from 'effector';

const loadPostFx = createEffect({
  name: 'Load post by id',
  handler: async (id: number = 1) => {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    const response = await fetch(url);
    return response.json();
  },
});

loadPostFx.done.watch(({ result }) => {
  console.log(JSON.stringify(result, null, 2));
});

loadPostFx(2);
