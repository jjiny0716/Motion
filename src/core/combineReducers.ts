import { Action, Reducer } from './types.js';

export function combineReducers<T extends Record<string, object>, K extends keyof T & string>(reducersMap: Record<string, Reducer>) {
  return (state: T, action: Action) => {
    const newState = Object.entries(reducersMap).reduce((obj: Record<string, any>, [name, reducer]) => {
      obj[name] = reducer(state && state[name as K], action);
      return obj;
    }, {});

    return { ...state, ...newState };
  }
}