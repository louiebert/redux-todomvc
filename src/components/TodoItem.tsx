import * as React from 'react';
import { Checkbox, FlatButton, ListItem, TextField } from 'material-ui';

interface Props {
  text: string;
}

class TodoList extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  // Checkbox `checked` property
  render() {
    return (
      <ListItem
        className="todo-item"
        primaryText={ this.props.text }
        leftCheckbox={ <Checkbox /> }
        style={{fontFamily: 'Roboto'}}
      >
        <TextField hintText={this.props.text} />
        <FlatButton label="Destroy" secondary={true} />
      </ListItem>
    );
  }
}

export default TodoList;
