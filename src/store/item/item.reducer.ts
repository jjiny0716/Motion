import { ITEM_ACTION_TYPES } from './item.types.js';

import { Item } from '../../types.js';

import { Action } from '../../core/coreTypes.js';

type ItemReducerState = {
  itemList: Item[];
}

const ITEM_INITIAL_STATE: ItemReducerState = {
  itemList: [],
};

export function itemReducer(state: ItemReducerState = ITEM_INITIAL_STATE, action: Action = {} as Action): ItemReducerState {
  const { type, payload } = action;

  switch(type) {
    case ITEM_ACTION_TYPES.SET_ITEM_LIST:
      return { ...state, itemList: payload };
    default: 
      return state;
  }
}
