import { createStore, createEvent } from 'effector';

type Todo = {
  text: string;
  completed: boolean;
};

const addTodo = createEvent<Todo['text']>();
const resetTodos = createEvent();

const todos$ = createStore<Todo[]>([])
  .on(addTodo, (state, text) => [
    ...state,
    {
      text,
      completed: false,
    },
  ])
  .reset(resetTodos);

const completedTodos$ = todos$.map((state) => state.map(({ completed }) => completed));

completedTodos$.watch((completed) => {
  console.log(`Completed todos state: ${JSON.stringify(completed)}`);
});

todos$.watch(addTodo, (_, newTodoText) => {
  console.log(`Added: "${newTodoText}"`);
});

todos$.watch(resetTodos, () => {
  console.log(`Todos reset`);
});

todos$.watch((currentState) => {
  console.log(`Current state: ${JSON.stringify(currentState)}`);
});

addTodo('Buy an elephant');
addTodo('Make a lamp');
resetTodos();
