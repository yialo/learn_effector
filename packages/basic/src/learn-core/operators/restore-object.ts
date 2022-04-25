import { restore, createEvent } from 'effector';

const passEv = createEvent<number | string>();

const { a: $num, b: $message } = restore({ a: 0, b: 'default' });

$num.watch((state) => {
  console.log('[watch] $num, state:', state);
});
$message.watch((state) => {
  console.log('[watch] $message, state:', state);
});

$num.on(passEv, (state, payload) => {
  if (typeof payload === 'number') {
    return state + payload;
  }
});

$message.on(passEv, (state, payload) => {
  if (typeof payload === 'string') {
    return `${state} ${payload}`;
  }
});

passEv(3);
passEv('text');
