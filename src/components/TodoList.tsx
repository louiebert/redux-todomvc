import * as React from 'react';
import { List as UIList } from 'material-ui';
import { List, Map } from 'immutable';

import TodoItem from './TodoItem';

interface Props {
  todos: List<Map<string, any>>;
  filter?: string;
  toggleComplete?(id: string);
  deleteItem?(id: string);
  editItem?(id: string);
}

class TodoList extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  getItems() {
    if (this.props.todos) {
      return this.props.todos.filter(
        (item) => this.props.filter === 'all' || item.get('status') === this.props.filter
      );
    }
    return null;
  }

  isCompleted(item) {
    return item.get('status') === 'completed';
  }

  // Checkbox `checked` property
  render() {
    return (
      <div>
        <section className="main">
          <UIList>
            { this.getItems().map((item) =>
              <TodoItem
                text={item.get('text')}
                isCompleted={this.isCompleted(item)}
                isEditing={item.get('editing')}
                key={item.get('text')}
                toggleComplete={this.props.toggleComplete}
                deleteItem={this.props.deleteItem}
                editItem={this.props.editItem}
              />
            ) }
          </UIList>
        </section>
      </div>
    );
  }
}

export default TodoList;
