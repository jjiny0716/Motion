import { ITEM_ACTION_TYPES } from './item.types.js';
const ITEM_INITIAL_STATE = {
    itemList: [],
};
export function itemReducer(state = ITEM_INITIAL_STATE, action = {}) {
    const { type, payload } = action;
    switch (type) {
        case ITEM_ACTION_TYPES.SET_ITEM_LIST:
            return Object.assign(Object.assign({}, state), { itemList: payload });
        default:
            return state;
    }
}
