import { combineReducers } from "../core/combineReducers.js";

import { itemReducer } from './item/item.reducer.js';

export const rootReducer = combineReducers({
  item: itemReducer,
});
