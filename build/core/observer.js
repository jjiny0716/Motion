const observerStack = [];
let currentObserver;
export function observe(fn) {
    observerStack.push(fn);
    currentObserver = observerStack.at(-1);
    fn();
    observerStack.pop();
    currentObserver = observerStack.at(-1);
}
export function observable(obj) {
    const observerMap = {};
    return new Proxy(obj, {
        get(target, name) {
            if (typeof target[name] === "function")
                return target[name];
            if (!observerMap[name])
                observerMap[name] = new Set();
            if (currentObserver !== undefined && observerStack.every((observer) => !observerMap[name].has(observer))) {
                observerMap[name].add(currentObserver);
            }
            return target[name];
        },
        set(target, name, value) {
            if (Object.is(target[name], value))
                return true;
            target[name] = value;
            if (observerMap[name])
                observerMap[name].forEach((fn) => fn());
            return true;
        },
    });
}
