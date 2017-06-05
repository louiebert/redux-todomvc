import * as acts from './types/actions';

export function addItem(text: string) {
  return ({
    type: 'ADD_ITEM',
    text
  } as acts.AddItemAction);
}

export function cancelEditing(itemId: number) {
  return ({
    type: 'CANCEL_EDITING',
    itemId
  } as acts.CancelEditingAction);
}

export function changeFilter(filter: string) {
  return ({
    type: 'CHANGE_FILTER',
    filter
  } as acts.ChangeFilterAction);
}

export function clearCompleted() {
  return ({
    type: 'CLEAR_COMPLETED'
  } as acts.ClearCompletedAction);
}

export function creatingItem(isCreating: boolean) {
  return ({
    type: 'CREATING_ITEM',
    isCreating
  } as acts.CreateItemAction);
}

export function deleteItem(itemId: number) {
  return ({
    type: 'DELETE_ITEM',
    itemId
  } as acts.DeleteItemAction);
}

export function doneEditing(itemId: number, newText: string) {
  return ({
    type: 'DONE_EDITING',
    itemId,
    newText
  } as acts.DoneEditingAction);
}

export function editItem(itemId: number) {
  return ({
    type: 'EDIT_ITEM',
    itemId
  } as acts.EditItemAction);
}

export function editingNew(newItemText: string) {
  return ({
    type: 'EDITING_NEW',
    newItemText
  } as acts.EditingNewAction);
}

export function editingText(itemId: number, tempText: string) {
  return ({
    type: 'EDITING_TEXT',
    itemId,
    tempText
  } as acts.EditingTextAction);
}

export function toggleComplete(itemId: number) {
  return ({
    type: 'TOGGLE_COMPLETE',
    itemId
  } as acts.ToggleCompleteAction);
}

export function toggleDrawer(openDrawer: boolean) {
  return ({
    type: 'TOGGLE_DRAWER',
    openDrawer
  } as acts.ToggleDrawerAction);
}
