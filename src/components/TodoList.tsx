import * as React from 'react';
import { List as UIList, Subheader } from 'material-ui';
import { List, Map } from 'immutable';

import TodoItem from './TodoItem';

interface Props {
  todos: List<Map<string, any>>;
  filter?: string;
  toggleComplete?(id: string);
  deleteItem?(id: string);
  editItem?(id: string);
  editingText?(id: string, tempText: string);
  cancelEditing?(id: string);
  doneEditing?(id: string, newText: string);
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

  render() {
    return (
      <div>
        <section className="main">
          <UIList style={{width: 400, maxWidth: "100%", margin: "0 auto"}}>
            <Subheader style={{fontFamily: 'Roboto'}}>Filter: {this.props.filter}</Subheader>
            { this.getItems().map((item) =>
              <TodoItem
                id={item.get('id')}
                text={item.get('text')}
                tempText={item.get('tempText')}
                isCompleted={this.isCompleted(item)}
                isEditing={item.get('editing')}
                toggleComplete={this.props.toggleComplete}
                deleteItem={this.props.deleteItem}
                editItem={this.props.editItem}
                editingText={this.props.editingText}
                cancelEditing={this.props.cancelEditing}
                doneEditing={this.props.doneEditing}
                key={item.get('text')}
              />
            ) }
          </UIList>
        </section>
      </div>
    );
  }
}

export default TodoList;
