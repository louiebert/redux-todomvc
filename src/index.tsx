import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { List, Map } from 'immutable';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import TodoApp from './components/TodoApp';

injectTapEventPlugin();

const todos = List.of(
  Map({id: 1, text: 'React', status: 'active', editing: false}),
  Map({id: 2, text: 'Redux', status: 'active', editing: false}),
  Map({id: 3, text: 'Immutable', status: 'completed', editing: false})
);

const filter = 'all';

ReactDOM.render(
  <TodoApp todos={todos} filter={filter} />,
  document.getElementById('app')
);
