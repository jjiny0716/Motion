export function combineReducers(reducersMap) {
    return (state, action) => {
        const newState = Object.entries(reducersMap).reduce((obj, [name, reducer]) => {
            obj[name] = reducer(state && state[name], action);
            return obj;
        }, {});
        return Object.assign(Object.assign({}, state), newState);
    };
}
