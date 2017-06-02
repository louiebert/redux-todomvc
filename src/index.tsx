import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {List, Map} from 'immutable';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import {TodoAppContainer} from './components/TodoApp';
import {SetStateAction} from './types/actions';

injectTapEventPlugin();

const store = createStore(reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

const setStateAction: SetStateAction = {
  type: 'SET_STATE',
  state: {
    todos: [
      {id: 1, text: 'React', status: 'active', editing: false},
      {id: 2, text: 'Redux', status: 'active', editing: false},
      {id: 3, text: 'Immutable', status: 'active', editing: false}
    ],
    filter: 'all',
    isDrawerOpen: false
  }
};

store.dispatch(setStateAction);

ReactDOM.render(
  <Provider store={store}>
    <TodoAppContainer />
  </Provider>,
  document.getElementById('app')
);
