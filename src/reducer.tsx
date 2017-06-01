import {Map} from 'immutable';

import {SET_STATE} from './types/constants';

function setState(state: Map<{}, {}>, newState: Map<{}, {}>) {
  return state.merge(newState);
}

function reducer(state = Map(), action) {
  switch (action.type) {
    case SET_STATE:
      return setState(state, action.state);
  }
  return state;
}

export default reducer;
