import { Action, Reducer } from "./coreTypes.js";

import { ReducersMapObject } from './coreTypes.js';

export function combineReducers<T extends Record<string, any>, A extends Action>(reducersMap: ReducersMapObject): Reducer<T, A> {
  return (state?: T, action?: A) => {
    const newState: T = {} as T;
    (Object.entries(reducersMap) as Array<[keyof T, Reducer<T[keyof T], A>]>).forEach(([name, reducer]) => {
      newState[name] = reducer(state && state[name], action);
      return newState;
    })

    return { ...state, ...newState };
  };
}
