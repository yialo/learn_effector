import { createEffect } from "effector";

const innerFx = createEffect((innerFxParams: string) =>
  Promise.resolve(innerFxParams)
);

const outerSimpleFx = createEffect(innerFx);
const outerMapperFx = createEffect((outerMapperFxParams: string) =>
  innerFx(`mapped: ${outerMapperFxParams}`)
);

innerFx.done.watch((output) => {
  console.log("innerFx.done", output);
});

outerSimpleFx.done.watch((output) => {
  console.log("outerSimpleFx.done", output);
});

outerMapperFx.done.watch((output) => {
  console.log("outerMapperFx.done", output);
});

innerFx("innerFx");
outerSimpleFx("outerSimpleFx");
outerMapperFx("outerMapperFx");
