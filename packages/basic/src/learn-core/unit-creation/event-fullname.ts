import { createEvent, Event } from 'effector';

const fullNameReceived = createEvent<string>();
const firstNameReceived = fullNameReceived.map((fullName) => fullName.split(' ')[0]);
const lastNameReceived = fullNameReceived.map((fullName) => fullName.split(' ')[1]);

const addNameWatcher = (event: Event<string>, logHead: string) => {
  event.watch((name) => {
    console.log(`${logHead} name received: ${name}`);
  });
};

addNameWatcher(fullNameReceived, 'full');
addNameWatcher(firstNameReceived, 'first');
addNameWatcher(lastNameReceived, 'last');

fullNameReceived('Vladimir Begunov');
