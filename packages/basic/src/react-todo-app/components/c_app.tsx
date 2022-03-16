import * as Effector from 'effector';

import { loadTodos } from '../fakeApi';
import style from './c_app.module.scss';

const todos$ = Effector.createStore([]);
const loadTodosFx = Effector.createEffect(loadTodos);

loadTodosFx();

export const App: React.FC = () => {
  return (
    <div className={style.root}>
      <div>Loading...</div>
    </div>
  );
};
