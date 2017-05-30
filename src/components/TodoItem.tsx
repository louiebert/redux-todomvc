import * as React from 'react';
import * as classNames from 'classnames';
import { Checkbox, FlatButton, ListItem, TextField } from 'material-ui';

interface Props {
  id?: string;
  text: string;
  isCompleted?: boolean;
  isEditing?: boolean;
  deleteItem?(id: string);
  editItem?(id: string);
  toggleComplete?(id: string);
}

class TodoList extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const itemClass = classNames({
      'todo-item': true,
      'completed': this.props.isCompleted,
      'editing': this.props.isEditing
    });

    return (
      <ListItem
        className={itemClass}
        primaryText={this.props.text}
        leftCheckbox={
          <Checkbox
            className="checkbox"
            checked={this.props.isCompleted || false}
            onClick={() => this.props.toggleComplete(this.props.id)}
          />
        }
        style={{fontFamily: 'Roboto'}}
        onDoubleClick={() => this.props.editItem(this.props.id)}
      >
        <TextField hintText={this.props.text} />
        <FlatButton
          className="destroy"
          label="Destroy"
          secondary={true}
          onClick={() => this.props.deleteItem(this.props.id)}
        />
      </ListItem>
    );
  }
}

export default TodoList;
