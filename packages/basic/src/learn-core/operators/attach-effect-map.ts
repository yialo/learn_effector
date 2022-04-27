import { attach, createEffect } from 'effector';

type OriginalFxParams = {
  id: number;
  env: string;
};

const originalFx = createEffect((params: OriginalFxParams) => {
  return Promise.resolve(`Original effect resolved with ${JSON.stringify(params)}`);
});

originalFx.watch((params) => {
  console.log('[watch] originalFx, params', params);
});

const derivedFx = attach({
  effect: originalFx,
  mapParams: ({ id }: { id: number }) => ({
    id,
    env: `env-${id}`,
  }),
});

// Look: derivedFx is called before originalFx
derivedFx.watch((params) => {
  console.log('[watch] derivedFx called, params', params);
});

derivedFx({ id: 2 });
