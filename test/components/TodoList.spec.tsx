import * as React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-dom/test-utils';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TodoList from '../../src/components/TodoList';

import { expect } from 'chai';
import 'mocha';
import { List, Map } from 'immutable';

describe('TodoList', () => {
  it('renders a list with only active items if the filter is active', () => {
    const todos = List.of(
      Map({id: 1, text: 'React', status: 'active'}),
      Map({id: 2, text: 'Redux', status: 'active'}),
      Map({id: 3, text: 'Immutable', status: 'completed'})
    );
    const filter = 'active';
    const component = renderIntoDocument(
      <MuiThemeProvider>
        <TodoList filter={filter} todos={todos} />
      </MuiThemeProvider>
    );
    const items = scryRenderedDOMComponentsWithClass((component as React.Component<any, any>), 'todo-item');

    expect(items.length).to.equal(2);
    expect(items[0].textContent).to.contain('React');
    expect(items[1].textContent).to.contain('Redux');
  });

  it('renders a list with only completed items if the filter is completed', () => {
    const todos = List.of(
      Map({id: 1, text: 'React', status: 'active'}),
      Map({id: 2, text: 'Redux', status: 'active'}),
      Map({id: 3, text: 'Immutable', status: 'completed'})
    );
    const filter = 'completed';
    const component = renderIntoDocument(
      <MuiThemeProvider>
        <TodoList filter={filter} todos={todos} />
      </MuiThemeProvider>
    );
    const items = scryRenderedDOMComponentsWithClass((component as React.Component<any, any>), 'todo-item');

    expect(items.length).to.equal(1);
    expect(items[0].textContent).to.contain('Immutable');
  });

  it('renders a list with all the items', () => {
    const todos = List.of(
      Map({id: 1, text: 'React', status: 'active'}),
      Map({id: 2, text: 'Redux', status: 'active'}),
      Map({id: 3, text: 'Immutable', status: 'completed'})
    );
    const filter = 'all';
    const component = renderIntoDocument(
      <MuiThemeProvider>
        <TodoList filter={filter} todos={todos} />
      </MuiThemeProvider>
    );
    const items = scryRenderedDOMComponentsWithClass((component as React.Component<any, any>), 'todo-item');

    expect(items.length).to.equal(3);
    expect(items[0].textContent).to.contain('React');
    expect(items[1].textContent).to.contain('Redux');
    expect(items[2].textContent).to.contain('Immutable');
  });
});
