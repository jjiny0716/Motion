export function combineReducers(reducersMap) {
    return (state, action) => {
        const newState = {};
        Object.entries(reducersMap).forEach(([name, reducer]) => {
            newState[name] = reducer(state && state[name], action);
            return newState;
        });
        return Object.assign(Object.assign({}, state), newState);
    };
}
