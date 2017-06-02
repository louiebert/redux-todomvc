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

function reducer(state = Map(), action) {
  switch (action.type) {
    case consts.SET_STATE:
      return setState(state, action.state);
    case consts.TOGGLE_COMPLETE:
      return toggleComplete(state, action.itemId);
    case consts.CHANGE_FILTER:
      return changeFilter(state, action.filter);
    case consts.TOGGLE_DRAWER:
      return toggleDrawer(state, action.openDrawer);
    case consts.EDIT_ITEM:
      return editItem(state, action.itemId);
    case consts.CANCEL_EDITING:
      return cancelEditing(state, action.itemId);
    case consts.DONE_EDITING:
      return doneEditing(state, action.itemId, action.newText);
    case consts.EDITING_TEXT:
      return editingText(state, action.itemId, action.tempText);
  }
  return state;
}

export default reducer;
