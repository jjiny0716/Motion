import { observable } from './observer.js';
const DEFAULT_STORAGE_KEY = "persist-store";
export function createStore(reducer, persistConfig) {
    const state = observable(reducer(undefined, undefined));
    if (persistConfig)
        restoreState(state, persistConfig);
    const frozenState = {};
    Object.keys(state).forEach((key) => {
        Object.defineProperty(frozenState, key, {
            get: () => state[key],
        });
    });
    function dispatch(action) {
        const newState = reducer(state, action);
        for (const [key, value] of Object.entries(newState)) {
            if (!state[key])
                continue;
            state[key] = value;
            if (persistConfig)
                persistState(key, value, persistConfig);
        }
    }
    function getState() {
        return frozenState;
    }
    return { getState, dispatch };
}
function restoreState(state, { key: storageKey, whitelist }) {
    if (!whitelist)
        return;
    for (let key of whitelist) {
        const storageValue = localStorage.getItem(`${DEFAULT_STORAGE_KEY}-${storageKey}-${key}`);
        if (storageValue) {
            state[key] = JSON.parse(storageValue);
        }
    }
}
function persistState(key, value, { key: storageKey, whitelist }) {
    if (whitelist && !whitelist.includes(key))
        return;
    localStorage.setItem(`${DEFAULT_STORAGE_KEY}-${storageKey}-${key}`, JSON.stringify(value));
}
