import {Map} from 'immutable';

import {SET_STATE} from './constants';

export interface SetStateAction {
  type: SET_STATE;
  state: {
    todos: [{
      id: number,
      text: string,
      status: string,
      editing?: boolean
    }],
    filter?: string
  } | Map<{}, {}>;
}
