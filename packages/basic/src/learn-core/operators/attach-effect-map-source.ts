import { attach, createStore, createEffect } from "effector";

type MapperParams = {
  courseId: number;
};

type OriginalFxParams = MapperParams & {
  env: string;
  userId: number;
};

const originalFx = createEffect(
  ({ env, courseId, userId }: OriginalFxParams) => {
    return Promise.resolve(
      `Requested course with ${courseId} for user with ID ${userId} in ${env} environment`
    );
  }
);

const $user = createStore({
  id: 1,
});

const derivedFx = attach({
  effect: originalFx,
  source: $user,
  mapParams: ({ courseId }: MapperParams, srcState) => ({
    courseId,
    env: "production",
    userId: srcState.id,
  }),
});

// Look: original effect runs after derived
originalFx.watch((params) => {
  console.log("[watch] originalFx, params", params);
});

derivedFx.watch((params) => {
  console.log("[watch] derivedFx, params", params);
});

derivedFx({ courseId: 3 });
