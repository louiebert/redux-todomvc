import * as React from 'react';
import {Dialog, FlatButton, TextField} from 'material-ui';

interface Props {
  isOpen: boolean;
  newItemText: string;
  editingNewText(newItemText: string);
  addTodo(text: string);
  creatingItem(isCreating: boolean);
}

class TodoCreator extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.props.newItemText && this.props.newItemText.length > 0) {
        this.submitTodo();
      }
    }
  }

  submitTodo() {
    this.props.addTodo(this.props.newItemText);
    this.props.creatingItem(false);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary
        onTouchTap={() => this.props.creatingItem(false)}
      />,
      <FlatButton
        label="Add"
        primary
        onTouchTap={() => this.submitTodo()}
        disabled={!this.props.newItemText || this.props.newItemText.length === 0}
      />
    ];

    return(
      <Dialog
        title="Create Todo"
        actions={actions}
        onRequestClose={() => this.props.creatingItem(false)}
        open={this.props.isOpen || false}
      >
        <TextField
          hintText="My new task"
          value={this.props.newItemText || ''}
          onChange={(input: React.FormEvent<HTMLInputElement>) => {
            this.props.editingNewText(input.currentTarget.value);
          }}
          autoFocus
          onKeyPress={(event) => this.onKeyPress(event)}
        />
      </Dialog>
    );
  }
}

export default TodoCreator;
