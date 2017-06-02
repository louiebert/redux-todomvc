import {Map} from 'immutable';

import * as consts from './constants';

export interface CancelEditingAction {
  type: consts.CANCEL_EDITING;
  itemId: number;
}

export interface ChangeFilterAction {
  type: consts.CHANGE_FILTER;
  filter: string;
}

export interface DoneEditingAction {
  type: consts.DONE_EDITING;
  itemId: number;
  newText: string;
}

export interface EditingTextAction {
  type: consts.EDITING_TEXT;
  itemId: number;
  tempText: string;
}

export interface EditItemAction {
  type: consts.EDIT_ITEM;
  itemId: number;
}

export interface SetStateAction {
  type: consts.SET_STATE;
  state: {
    todos: [{
      id: number,
      text: string,
      status: string,
      editing?: boolean
    }],
    filter?: string,
    isDrawerOpen?: boolean
  } | Map<{}, {}>;
}

export interface ToggleCompleteAction {
  type: consts.TOGGLE_COMPLETE;
  itemId: number;
}

export interface ToggleDrawerAction {
  type: consts.TOGGLE_DRAWER;
  openDrawer: boolean;
}
