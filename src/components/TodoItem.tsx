import * as React from 'react';
import * as classNames from 'classnames';
import { Checkbox, FlatButton, IconButton, ListItem, TextField } from 'material-ui';
import RemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';
import {pinkA200} from 'material-ui/styles/colors';

interface Props {
  id?: string;
  text: string;
  tempText?: string;
  isCompleted?: boolean;
  isEditing?: boolean;
  deleteItem?(id: string);
  editItem?(id: string);
  editingText?(id: string, tempText: string);
  cancelEditing?(id: string);
  toggleComplete?(id: string);
  doneEditing?(id: string, newText: string);
}

class TodoItem extends React.PureComponent<Props, {}> {
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
        primaryText={this.props.isEditing ? null :
          <div
            ref="text"
            onDoubleClick={() => this.props.editItem(this.props.id)}
            style={this.props.isCompleted ? {textDecoration: "line-through"} : {}}
          >
            {this.props.text}
          </div>
        }
        leftCheckbox={
          <Checkbox
            className="checkbox"
            checked={this.props.isCompleted || false}
            onClick={() => this.props.toggleComplete(this.props.id)}
          />
        }
        style={{fontFamily: 'Roboto', margin: "0px auto", paddingRight: 48}}
      >
        {this.props.isEditing ?
          <div>
            <TextField
              hintText={this.props.text}
              multiLine={true}
              rowsMax={3}
              style={{width: "100%", marginTop: -16, verticalAlign: "bottom"}}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                this.props.editingText(this.props.id, event.currentTarget.value);
              }}
            />
            <br/>
          </div>
          : null
        }
        {this.props.isEditing ?
          <FlatButton
            className="cancel-btn"
            label="Cancel"
            secondary={true}
            onClick={() => this.props.cancelEditing(this.props.id)}
          />
          : null
        }
        {this.props.isEditing ?
          <FlatButton
            className="done-btn"
            label="Done"
            primary={true}
            onClick={() => {
              this.props.doneEditing(this.props.id, this.props.tempText);
              this.props.editingText(this.props.id, '');
            }}
            disabled={!this.props.tempText || this.props.tempText.length === 0}
          />
          : null
        }
        {this.props.isEditing ? null :
          <IconButton
            className="delete-btn"
            onClick={() => this.props.deleteItem(this.props.id)}
            style={{position: 'absolute', right: 5, top: 0}}
          >
            <RemoveCircleOutline color={pinkA200} />
          </IconButton>
        }
      </ListItem>
    );
  }
}

export default TodoItem;
