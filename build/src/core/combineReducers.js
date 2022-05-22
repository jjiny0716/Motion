"use strict";
// import { Action, Reducer } from './types';
// export function combineReducers<T extends object, K extends keyof T & string>(reducersMap: Record<string, Reducer>) {
//   return (state: T, action: Action) => {
//     const newState = Object.entries(reducersMap).reduce((obj, [name, reducer]) => {
//       obj[name as K] = reducer(state && state[name as K], action);
//       return obj;
//     }, {})
//     return { ...state, ...newState };
//   }
// }
