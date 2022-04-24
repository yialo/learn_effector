import { createDomain } from 'effector';

const domain = createDomain();

domain.onCreateEvent((event) => {
  console.log('[domain hook] event created', event);
});

domain.onCreateStore((store) => {
  console.log('[domain hook] store created', store);
});

domain.onCreateEffect((effect) => {
  console.log('[domain hook] effect created', effect);
});

const domainEv = domain.createEvent<number>();
const $domainValue = domain.createStore(0);
const domainFx = domain.createEffect((value: number) => Promise.resolve(value));

console.log('domain.history', domain.history);
console.log('Units', { domainEv, $domainValue, domainFx });
