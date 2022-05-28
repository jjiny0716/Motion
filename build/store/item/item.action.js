import { ITEM_ACTION_TYPES } from "./item.types.js";
import { createAction } from "../../core/utils/createAction.js";
export function addItem(itemList, item) {
    return createAction(ITEM_ACTION_TYPES.SET_ITEM_LIST, [...itemList, item]);
}
export function deleteItem(itemList, index) {
    return createAction(ITEM_ACTION_TYPES.SET_ITEM_LIST, deleteItemHelper(itemList, index));
}
function deleteItemHelper(itemList, index) {
    itemList.splice(index, 1);
    return [...itemList];
}
export function swapItem(itemList, index1, index2) {
    return createAction(ITEM_ACTION_TYPES.SET_ITEM_LIST, swapItemHelper(itemList, index1, index2));
}
function swapItemHelper(itemList, index1, index2) {
    [itemList[index1], itemList[index2]] = [itemList[index2], itemList[index1]];
    return [...itemList];
}
