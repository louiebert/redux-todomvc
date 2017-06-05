import {Map} from 'immutable';

import * as consts from './types/constants';

function findItemIndex(state: Map<{}, any>, itemId: number) {
  return state.get('todos').findIndex(
    (item) => item.get('id') === itemId
  );
}

function setState(state: Map<{}, {}>, newState: Map<{}, {}>) {
  return state.merge(newState);
}

function toggleDrawer(state: Map<{}, {}>, openDrawer: boolean) {
  return state.set('isDrawerOpen', openDrawer);
}

function changeFilter(state: Map<{}, {}>, filter: string) {
  return state.set('filter', filter);
}

function creatingItem(state: Map<{}, {}>, isCreating: boolean) {
  if (isCreating)
    return state.set('isCreating', isCreating);
  else
    return state.set('isCreating', isCreating).set('newItemText', '');
}

function toggleComplete(state: Map<{}, any>, itemId: number) {
  const itemIndex = findItemIndex(state, itemId);

  const updatedItem = state.get('todos')
    .get(itemIndex)
    .update('status', (status) => status === 'active' ? 'completed' : 'active');

  return state.update('todos', (todos) => todos.set(itemIndex, updatedItem));
}

function editItem(state: Map<{}, any>, itemId: number) {
  const itemIndex = findItemIndex(state, itemId);

  const updatedItem = state.get('todos')
    .get(itemIndex)
    .set('editing', true);

  return state.update('todos', (todos) => todos.set(itemIndex, updatedItem));
}

function editingText(state: Map<{}, any>, itemId: number, tempText: string) {
  const itemIndex = findItemIndex(state, itemId);

  const updatedItem = state.get('todos')
    .get(itemIndex)
    .set('tempText', tempText);

  return state.update('todos', (todos) => todos.set(itemIndex, updatedItem));
}

function cancelEditing(state: Map<{}, any>, itemId: number) {
  const itemIndex = findItemIndex(state, itemId);

  const updatedItem = state.get('todos')
    .get(itemIndex)
    .set('editing', false);

  return state.update('todos', (todos) => todos.set(itemIndex, updatedItem));
}

function doneEditing(state: Map<{}, any>, itemId: number, newText: string) {
  const itemIndex = findItemIndex(state, itemId);

  const updatedItem = state.get('todos')
    .get(itemIndex)
    .set('editing', false)
    .set('text', newText);

  return state.update('todos', (todos) => todos.set(itemIndex, updatedItem));
}

function clearCompleted(state: Map<{}, any>) {
  return state.update('todos',
    (todos) => todos.filterNot(
      (item) => item.get('status') === 'completed'
    )
  );
}

function addItem(state: Map<{}, any>, text: string) {
  const itemId = state.get('todos').reduce((maxId, item) => Math.max(maxId, item.get('id')), 0) + 1;

  const newItem = Map({id: itemId, text, status: 'active'});

  return state.update('todos', (todos: [Map<{}, {}>]) => todos.push(newItem));
}

function editingNew(state: Map<{}, {}>, newItemText: string) {
  return state.set('newItemText', newItemText);
}

function deleteItem(state: Map<{}, any>, itemId: number) {
  return state.update('todos',
    (todos) => todos.filterNot(
      (item) => item.get('id') === itemId
    )
  );
}

function reducer(state = Map(), action) {
  switch (action.type) {
    case consts.ADD_ITEM:
      return addItem(state, action.text);
    case consts.CANCEL_EDITING:
      return cancelEditing(state, action.itemId);
    case consts.CHANGE_FILTER:
      return changeFilter(state, action.filter);
    case consts.CLEAR_COMPLETED:
      return clearCompleted(state);
    case consts.CREATING_ITEM:
      return creatingItem(state, action.isCreating);
    case consts.DELETE_ITEM:
      return deleteItem(state, action.itemId);
    case consts.DONE_EDITING:
      return doneEditing(state, action.itemId, action.newText);
    case consts.EDIT_ITEM:
      return editItem(state, action.itemId);
    case consts.EDITING_NEW:
      return editingNew(state, action.newItemText);
    case consts.EDITING_TEXT:
      return editingText(state, action.itemId, action.tempText);
    case consts.SET_STATE:
      return setState(state, action.state);
    case consts.TOGGLE_COMPLETE:
      return toggleComplete(state, action.itemId);
    case consts.TOGGLE_DRAWER:
      return toggleDrawer(state, action.openDrawer);
  }
  return state;
}

export default reducer;
