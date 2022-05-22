import { observable } from './observer.js';

import { PersistConfig } from './types.js';
import { Action, ComponentState, Reducer } from './types.js';


const DEFAULT_STORAGE_KEY = "persist-store";

export const createStore = <T extends object, K extends keyof T & string>(reducer: Reducer, persistConfig: Partial<PersistConfig>) => {
  const state: T = observable(reducer());
  if (persistConfig) restoreState(state, persistConfig);
  
  const frozenState = {};
  Object.keys(state).forEach((key) => {
    Object.defineProperty(frozenState, key, {
      get: () => state[key as K], 
    })
  });
  
  function dispatch(action: Action) {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      if (!state[key as K]) continue;
      state[key as K] = value;
      if (persistConfig) persistState(key, value, persistConfig);
    }
  }

  function getState() {
    return frozenState;
  }
  
  return { getState, dispatch };
}

function restoreState(state: ComponentState, { key: storageKey, whitelist }: Partial<PersistConfig>) {
  if (!whitelist) return;

  for (let key of whitelist) {
    const storageValue = localStorage.getItem(`${DEFAULT_STORAGE_KEY}-${storageKey}-${key}`);
    if (storageValue) {
      state[key] = JSON.parse(storageValue);
    }
  }
}

function persistState(key: string, value: ComponentState, { key: storageKey, whitelist }: Partial<PersistConfig>) {
  if (whitelist && !whitelist.includes(key)) return;
  localStorage.setItem(`${DEFAULT_STORAGE_KEY}-${storageKey}-${key}`, JSON.stringify(value));
}