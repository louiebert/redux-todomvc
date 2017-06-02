import {fromJS, List, Map} from 'immutable';
import {expect} from 'chai';
import 'mocha';

import reducer from '../src/reducer';
import * as acts from '../src/types/actions';

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action: acts.SetStateAction = {
      type: 'SET_STATE',
      state: Map({
        todos: List.of(
          Map({id: 1, text: 'React', status: 'active'}),
          Map({id: 2, text: 'Redux', status: 'active'}),
          Map({id: 3, text: 'Immutable', status: 'completed'})
        )
      })
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      todos: [
        {id: 1, text: 'React', status: 'active'},
        {id: 2, text: 'Redux', status: 'active'},
        {id: 3, text: 'Immutable', status: 'completed'},
      ]
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action: acts.SetStateAction = {
      type: 'SET_STATE',
      state: {
        todos: [
          {id: 1, text: 'React', status: 'active'},
          {id: 2, text: 'Redux', status: 'active'},
          {id: 3, text: 'Immutable', status: 'completed'}
        ]
      }
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      todos: [
        {id: 1, text: 'React', status: 'active'},
        {id: 2, text: 'Redux', status: 'active'},
        {id: 3, text: 'Immutable', status: 'completed'}
      ]
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const action: acts.SetStateAction = {
      type: 'SET_STATE',
      state: {
        todos: [
          {id: 1, text: 'React', status: 'active'},
          {id: 2, text: 'Redux', status: 'active'},
          {id: 3, text: 'Immutable', status: 'completed'}
        ]
      }
    };

    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      todos: [
        {id: 1, text: 'React', status: 'active'},
        {id: 2, text: 'Redux', status: 'active'},
        {id: 3, text: 'Immutable', status: 'completed'}
      ]
    }));
  });

  it('handles TOGGLE_COMPLETE by changing the status from active to completed', () => {
    const initialState = fromJS({
      todos: [
        {id: 1, text: 'React', status: 'active'},
        {id: 2, text: 'Redux', status: 'active'},
        {id: 3, text: 'Immutable', status: 'completed'}
      ]
    });
    const action: acts.ToggleCompleteAction = {
      type: 'TOGGLE_COMPLETE',
      itemId: 1
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      todos: [
        {id: 1, text: 'React', status: 'completed'},
        {id: 2, text: 'Redux', status: 'active'},
        {id: 3, text: 'Immutable', status: 'completed'}
      ]
    }));
  });

  it('handles TOGGLE_COMPLETE by changing the status from completed to active', () => {
    const initialState = fromJS({
      todos: [
        {id: 1, text: 'React', status: 'active'},
        {id: 2, text: 'Redux', status: 'active'},
        {id: 3, text: 'Immutable', status: 'completed'}
      ]
    });
    const action: acts.ToggleCompleteAction = {
      type: 'TOGGLE_COMPLETE',
      itemId: 3
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      todos: [
        {id: 1, text: 'React', status: 'active'},
        {id: 2, text: 'Redux', status: 'active'},
        {id: 3, text: 'Immutable', status: 'active'}
      ]
    }));
  });

  it('handles CHANGE_FILTER by changing the filter', () => {
    const initialState = fromJS({
      todos: [
        {id: 1, text: 'React', status: 'active'}
      ],
      filter: 'all'
    });
    const action: acts.ChangeFilterAction = {
      type: 'CHANGE_FILTER',
      filter: 'active'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      todos: [
        {id: 1, text: 'React', status: 'active'}
      ],
      filter: 'active'
    }));
  });

  it('handles TOGGLE_DRAWER by switching drawerOpen from false to true', () => {
    const initialState = fromJS({
      todos: [
        {id: 1, text: 'React', status: 'active'}
      ],
      isDrawerOpen: false
    });
    const action: acts.ToggleDrawerAction = {
      type: 'TOGGLE_DRAWER',
      openDrawer: true
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      todos: [
        {id: 1, text: 'React', status: 'active'}
      ],
      isDrawerOpen: true
    }));
  });

  it('handles EDIT_ITEM by setting editing to be true', () => {
    const initialState = fromJS({
      todos: [
        {id: 1, text: 'React', status: 'active', editing: false}
      ]
    });
    const action: acts.EditItemAction = {
      type: 'EDIT_ITEM',
      itemId: 1
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      todos: [
        {id: 1, text: 'React', status: 'active', editing: true}
      ]
    }));
  });

  it('handles CANCEL_EDITING by setting editing to be false', () => {
    const initialState = fromJS({
      todos: [
        {id: 1, text: 'React', status: 'active', editing: true}
      ]
    });
    const action: acts.CancelEditingAction = {
      type: 'CANCEL_EDITING',
      itemId: 1
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      todos: [
        {id: 1, text: 'React', status: 'active', editing: false}
      ]
    }));
  });

  it('handles DONE_EDITING by setting editing to be false and updating the text', () => {
    const initialState = fromJS({
      todos: [
        {id: 1, text: 'React', status: 'active', editing: true}
      ]
    });
    const action: acts.DoneEditingAction = {
      type: 'DONE_EDITING',
      itemId: 1,
      newText: 'Redux'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      todos: [
        {id: 1, text: 'Redux', status: 'active', editing: false}
      ]
    }));
  });

  it('handles EDITING_TEXT by changing the temporary text', () => {
    const initialState = fromJS({
      todos: [
        {id: 1, text: 'React', status: 'active', editing: true}
      ]
    });
    const action: acts.EditingTextAction = {
      type: 'EDITING_TEXT',
      itemId: 1,
      tempText: 'R'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      todos: [
        {id: 1, text: 'React', status: 'active', editing: true, tempText: 'R'}
      ]
    }));
  });
});
