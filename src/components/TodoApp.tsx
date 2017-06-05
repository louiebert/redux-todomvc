import * as React from 'react';
import {connect} from 'react-redux';
import {List, Map} from 'immutable';
import {AppBar, Dialog, Drawer, FloatingActionButton, MenuItem, Subheader} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DeleteSweep from 'material-ui/svg-icons/content/delete-sweep';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TodoList from './TodoList';
import TodoCreator from './TodoCreator';
import * as actionCreators from '../action.creators';

interface Props {
  todos: List<Map<string, any>>;
  filter: string;
  isDrawerOpen: boolean;
  isCreating: boolean;
  newItemText: string;
  changeFilter(filter: string);
  toggleDrawer(openDrawer: boolean);
  editingNew(newItemText: string);
  addItem(text: string);
  creatingItem(isCreating: boolean);
  clearCompleted();
}

class TodoApp extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Todo List"
            onLeftIconButtonTouchTap={() => this.props.toggleDrawer(!this.props.isDrawerOpen)}
          />
          <Drawer
            open={this.props.isDrawerOpen}
            docked={false}
            onRequestChange={() => this.props.toggleDrawer(!this.props.isDrawerOpen)}
            containerStyle={{marginTop: 64, zIndex: 1000}}
            overlayStyle={{marginTop: 64, zIndex: 900}}
          >
            <Subheader>Filter</Subheader>
            <MenuItem
              checked={this.props.filter === 'all'}
              disabled={this.props.filter === 'all'}
              onTouchTap={() => {
                this.props.changeFilter('all');
                this.props.toggleDrawer(!this.props.isDrawerOpen);
              }}
              insetChildren={true}
            >
              All
            </MenuItem>
            <MenuItem
              checked={this.props.filter === 'active'}
              disabled={this.props.filter === 'active'}
              onTouchTap={() => {
                this.props.changeFilter('active');
                this.props.toggleDrawer(!this.props.isDrawerOpen);
              }}
              insetChildren={true}
            >
              Active
            </MenuItem>
            <MenuItem
              checked={this.props.filter === 'completed'}
              disabled={this.props.filter === 'completed'}
              onTouchTap={() => {
                this.props.changeFilter('completed');
                this.props.toggleDrawer(!this.props.isDrawerOpen);
              }}
              insetChildren={true}
            >
              Completed
            </MenuItem>
          </Drawer>
          <TodoList {...this.props}/>
          <FloatingActionButton
            onTouchTap={() => this.props.clearCompleted()}
            style={{position: "absolute", right: 30, bottom: 105}}
            secondary
          >
            <DeleteSweep />
          </FloatingActionButton>
          <FloatingActionButton
            onTouchTap={() => this.props.creatingItem(true)}
            style={{position: "absolute", right: 30, bottom: 30}}
          >
            <ContentAdd />
          </FloatingActionButton>
          <TodoCreator
            isOpen={this.props.isCreating}
            newItemText={this.props.newItemText}
            editingNewText={this.props.editingNew}
            addTodo={this.props.addItem}
            creatingItem={this.props.creatingItem}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state: Map<{}, {}>) {
  return {
    todos: state.get('todos'),
    filter: state.get('filter'),
    isDrawerOpen: state.get('isDrawerOpen'),
    isCreating: state.get('isCreating'),
    newItemText: state.get('newItemText')
  };
}

export const TodoAppContainer = connect(mapStateToProps, actionCreators)(TodoApp);
