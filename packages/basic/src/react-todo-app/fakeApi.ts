import { TodoEntity } from './types';

const createTodos = (): TodoEntity[] => [
  {
    value: 'Learn Effector',
    isComplete: false,
  },
  {
    value: 'Learn React 18',
    isComplete: false,
  },
  {
    value: 'Buy an elephant',
    isComplete: false,
  },
];

export const loadTodos = (withError: boolean = false) => {
  return new Promise<TodoEntity[]>((resolve, reject) => {
    setTimeout(() => {
      if (withError) {
        const error = new Error(`Can't load todos`);
        reject(error);
      } else {
        const todos = createTodos();
        resolve(todos);
      }
    }, 750);
  });
};
