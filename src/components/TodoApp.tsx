import * as React from 'react';
import { List, Map } from 'immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TodoList from './TodoList';

interface Props {
  todos: List<Map<string, any>>;
  filter?: string;
}

class TodoApp extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <section className="todoapp">
          <TodoList todos={this.props.todos} filter={this.props.filter} />
        </section>
      </MuiThemeProvider>
    );
  }
}

export default TodoApp;
