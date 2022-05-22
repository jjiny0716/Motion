import { ComponentError } from './ComponentError.js';
export function adjustChildComponents(parent, childComponentData) {
    var _a;
    const { childComponents } = parent;
    for (let key of Object.keys(childComponents)) {
        if (childComponentData[key]) {
            const target = findComponentNode(parent.target, key, childComponentData[key]);
            childComponents[key].update(target);
            delete childComponentData[key];
        }
        else {
            childComponents[key].destroyComponent();
            delete childComponents[key];
        }
    }
    for (let [key, componentName] of Object.entries(childComponentData)) {
        const target = findComponentNode(parent.target, key, componentName);
        const childComponent = parent.generateChildComponent(target, componentName, key);
        if (!childComponent)
            throw new ComponentError(`Cannot generate component with name '${key}' at '${(_a = parent.target.dataset.componentName) !== null && _a !== void 0 ? _a : "App"}'`);
        childComponents[key] = childComponent;
    }
}
function findComponentNode(targetNode, key, componentName) {
    const selector = key === componentName ? `[data-component="${componentName}"]` : `[data-key="${key}"]`;
    return targetNode.querySelector(selector);
}
