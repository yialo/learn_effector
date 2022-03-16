import { createStore, createEvent, fork, allSettled, serialize } from 'effector';

type Package = {
  name: string;
  version: number;
};

const readPackage = createEvent<Package>();

const name$ = createStore('', { sid: 'name-store' });
const version$ = createStore(0, { sid: 'version-store', serialize: 'ignore' });

name$
  .on(readPackage, (_, { name }) => name)
  .watch((state) => {
    console.log(`name: "%s"`, state);
  });

version$
  .on(readPackage, (_, { version }) => version)
  .watch((state) => {
    console.log(`version: %d`, state);
  });

const scope = fork();

const logSerializedScope = () => {
  const values = serialize(scope);
  console.log(`Serialized values: ${JSON.stringify(values)}`);
};

logSerializedScope();

(async () => {
  await allSettled<Package>(readPackage, { scope, params: { name: 'react', version: 18 } });
})();

logSerializedScope();
