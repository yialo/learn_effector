import * as Effector from 'effector';

import { loadTodos } from './fakeApi';
import style from './index.module.scss';
import { TodoEntity } from './types';

const DOM_ID = {
  CONTAINER: 'container',
} as const;

const loadTodosFx = Effector.createEffect(loadTodos);

const todos$ = Effector.createStore<TodoEntity[]>([]);
todos$.on(loadTodosFx.doneData, (state, todos) => [...state, ...todos]);

const init = () => {
  const $root = document.getElementById('root');

  if (!$root) {
    return;
  }

  const $container = document.createElement('div');
  $container.classList.add(style.root);
  $container.id = DOM_ID.CONTAINER;
  $container.innerHTML = `<div>Loading...</div>`;
  $root.append($container);

  todos$.watch((todos) => {
    if (todos.length === 0) {
      return;
    }

    $container.innerHTML = `<h1>Todo List</h1><ul></ul>`;
    const $list = $container.querySelector('ul');

    if (!$list) {
      return;
    }

    $list.innerHTML = `${todos
      .map(({ value, isComplete }) => {
        return `<li><div>${value}</div><div>isComplete: ${isComplete}</div></li>`;
      })
      .join('')}`;
  });

  loadTodosFx();
};

export const main = () => {
  window.addEventListener('DOMContentLoaded', init);
};
