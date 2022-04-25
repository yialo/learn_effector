import { attach, createEffect, createStore, GetShapeValue } from 'effector';

const $user = createStore({
  id: 1,
  name: 'Bob',
  isCool: true,
});

const $env = createStore({
  target: 'state',
  isDebugMode: false,
});

type CombinedStore = {
  user: typeof $user;
  env: typeof $env;
};

type CombinedState = GetShapeValue<CombinedStore>;

const fetchCombinedQueryFx = createEffect((params: CombinedState) => {
  console.log('fetchCombinedQueryFx called with params:', params);

  const {
    env: { target },
    user: { name },
  } = params;
  return Promise.resolve(`User name: ${name}, env: ${target}`);
});

const attachedFx = attach({
  source: {
    env: $env,
    user: $user,
  },
  effect: fetchCombinedQueryFx,
});

attachedFx();
