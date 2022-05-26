import { ITEM_ACTION_TYPES } from "./item.types.js";
import { createAction } from "../../core/utils/createAction.js";
export function addItem(itemList, item) {
    return createAction(ITEM_ACTION_TYPES.SET_ITEM_LIST, [...itemList, item]);
}
