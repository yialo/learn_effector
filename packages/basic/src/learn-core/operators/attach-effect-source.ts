import { attach, createEffect, createStore, GetShapeValue } from 'effector';

const $user = createStore({
  id: 1,
  name: 'Bob',
  isCool: true,
});

const $env = createStore({
  target: 'stage',
  isDebugMode: false,
});

type CombinedObjStore = {
  user: typeof $user;
  env: typeof $env;
};

type CombinedObjState = GetShapeValue<CombinedObjStore>;

const fetchCombinedQueryObjFx = createEffect((params: CombinedObjState) => {
  const {
    env: { target },
    user: { name },
  } = params;
  return Promise.resolve(`User name: ${name}, env: ${target}`);
});

const attachedObjFx = attach({
  source: {
    env: $env,
    user: $user,
  },
  effect: fetchCombinedQueryObjFx,
});

fetchCombinedQueryObjFx.watch((params) => {
  console.log('[watch] fetchCombinedQueryObjFx, params', params);
});

attachedObjFx.watch(() => {
  console.log('[watch] attachedObjFx');
});

type CombinerArrStore = [typeof $env, typeof $user];

type CombinerArrState = GetShapeValue<CombinerArrStore>;

const fetchCombinedQueryArrFx = createEffect((params: CombinerArrState) => {
  const [{ target }, { name }] = params;
  return Promise.resolve(`User name: ${name}, env: ${target}`);
});

const attachedArrFx = attach({
  source: [$env, $user],
  effect: fetchCombinedQueryArrFx,
});

fetchCombinedQueryArrFx.watch((params) => {
  console.log('[watch] fetchCombinedQueryArrFx, params', params);
});

attachedArrFx.watch(() => {
  console.log('[watch] attachedArrFx');
});

attachedObjFx();
attachedArrFx();
