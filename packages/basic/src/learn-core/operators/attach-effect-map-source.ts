import { attach, createStore, createEffect } from 'effector';

type OriginalFxParams = {
  env: string;
  courseId: number;
  userId: number;
};

const originalFx = createEffect(({ env, courseId, userId }: OriginalFxParams) => {
  return Promise.resolve(
    `Requested course with ${courseId} for user with ID ${userId} in ${env} environment`,
  );
});

const $user = createStore({
  id: 1,
});

const derivedFx = attach({
  effect: originalFx,
  source: $user,
  mapParams: ({ courseId }, srcState) => ({
    courseId,
    env: 'production',
    userId: srcState.id,
  }),
});

originalFx.watch((params) => {
  console.log('[watch] originalFx, params', params);
});

derivedFx.watch((params) => {
  console.log('[watch] derivedFx, params', params);
});

derivedFx({ courseId: 3 });
