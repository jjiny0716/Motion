import { ITEM_ACTION_TYPES } from "./item.types.js";

import { createAction } from "../../core/utils/createAction.js";

import { Action } from '../../core/coreTypes.js';
import { Item } from '../../types.js';

export function addItem(itemList: Item[], item: Item): Action {
  return createAction(ITEM_ACTION_TYPES.SET_ITEM_LIST, [...itemList, item]);
}

export function deleteItem(itemList: Item[], index: number): Action {
  return createAction(ITEM_ACTION_TYPES.SET_ITEM_LIST, deleteItemHelper(itemList, index));
}

function deleteItemHelper(itemList: Item[], index: number): Item[] {
  itemList.splice(index, 1);
  return [...itemList];
}

export function swapItem(itemList: Item[], index1: number, index2: number): Action {
  return createAction(ITEM_ACTION_TYPES.SET_ITEM_LIST, swapItemHelper(itemList, index1, index2));
}

function swapItemHelper(itemList: Item[], index1: number, index2: number): Item[] {
  [itemList[index1], itemList[index2]] = [itemList[index2], itemList[index1]];
  return [...itemList];
}