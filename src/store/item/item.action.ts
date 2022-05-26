import { ITEM_ACTION_TYPES } from "./item.types.js";

import { createAction } from "../../core/utils/createAction.js";

import { Action } from '../../core/coreTypes.js';
import { Item } from '../../types.js';

export function addItem(itemList: Item[], item: Item): Action {
  return createAction(ITEM_ACTION_TYPES.SET_ITEM_LIST, [...itemList, item]);
}