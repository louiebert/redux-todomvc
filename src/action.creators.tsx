import * as acts from './types/actions';

export function toggleDrawer(openDrawer: boolean) {
  return ({
    type: 'TOGGLE_DRAWER',
    openDrawer
  } as acts.ToggleDrawerAction);
}

export function toggleComplete(itemId: number) {
  return ({
    type: 'TOGGLE_COMPLETE',
    itemId
  } as acts.ToggleCompleteAction);
}

export function changeFilter(filter: string) {
  return ({
    type: 'CHANGE_FILTER',
    filter
  } as acts.ChangeFilterAction);
}

export function editItem(itemId: number) {
  return ({
    type: 'EDIT_ITEM',
    itemId
  } as acts.EditItemAction);
}

export function editingText(itemId: number, tempText: string) {
  return ({
    type: 'EDITING_TEXT',
    itemId,
    tempText
  } as acts.EditingTextAction);
}

export function cancelEditing(itemId: number) {
  return ({
    type: 'CANCEL_EDITING',
    itemId
  } as acts.CancelEditingAction);
}

export function doneEditing(itemId: number, newText: string) {
  return ({
    type: 'DONE_EDITING',
    itemId,
    newText
  } as acts.DoneEditingAction);
}
