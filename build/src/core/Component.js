import { observable, observe } from "./observer";
import { updateElement } from "./updateElement";
import { adjustChildComponents } from "./adjustChildComponents";
import { ComponentError } from "./ComponentError";
export default class Component {
    constructor(target, propsGenerator) {
        this.target = target;
        this.propsGenerator = propsGenerator;
        this.props = {};
        this.state = {};
        this.childComponents = {};
        this.attacthedEventListeners = [];
        this.isMountFinished = false;
        this.updateID = 0;
        if (!target)
            throw new ComponentError(`Target of component is ${target} in '${this.constructor.name}'`);
        this.updateProps();
        this.setup();
        this.state = this.state && observable(this.state);
        observe(this.update.bind(this));
    }
    updateProps() {
        this.props = this.propsGenerator ? this.propsGenerator() : null;
    }
    setup() { }
    ;
    render() {
        const { target } = this;
        const newNode = target.cloneNode(true);
        newNode.innerHTML = this.template();
        let childComponentData = {};
        const oldChildNodes = [...target.childNodes];
        const newChildNodes = [...newNode.childNodes];
        const maxLength = Math.max(oldChildNodes.length, newChildNodes.length);
        for (let i = 0; i < maxLength; i++) {
            childComponentData = Object.assign(Object.assign({}, childComponentData), updateElement(target, newChildNodes[i], oldChildNodes[i]));
        }
        adjustChildComponents(this, childComponentData);
    }
    generateChildComponent(target, name, key) { return undefined; }
    ;
    afterMount() { }
    beforeUpdate() { }
    afterUpdate() { }
    beforeUnmount() { }
    update(newTarget) {
        if (newTarget && newTarget !== this.target) {
            this.target = newTarget;
            this.setEvents();
        }
        if (!this.isMountFinished) {
            this.lifeCycle();
        }
        else {
            // debounce
            cancelAnimationFrame(this.updateID);
            this.updateID = requestAnimationFrame(this.lifeCycle.bind(this));
        }
    }
    lifeCycle() {
        if (this.isMountFinished)
            this.beforeUpdate();
        if (this.isMountFinished)
            this.updateProps();
        this.render();
        if (this.isMountFinished)
            this.afterUpdate();
        if (!this.isMountFinished) {
            setTimeout(() => {
                this.setEvents();
                this.isMountFinished = true;
                this.afterMount();
            }, 0);
        }
    }
    destroyComponent() {
        const childComponents = Object.values(this.childComponents);
        for (let childComponent of childComponents) {
            childComponent.destroyComponent();
        }
        this.beforeUnmount();
        this.removeAllEventListener();
    }
    setEvents() { }
    ;
    addEventListener(eventType, selector, callback) {
        const listener = (e) => {
            if (e.target.closest(selector))
                callback(e);
        };
        this.target.addEventListener(eventType, listener);
        this.attacthedEventListeners.push({ type: eventType, listener });
    }
    removeAllEventListener() {
        for (let { type, listener } of this.attacthedEventListeners) {
            this.target.removeEventListener(type, listener);
        }
        this.attacthedEventListeners = [];
    }
    setState(newState) {
        for (let [key, value] of Object.entries(newState)) {
            if (!this.state.hasOwnProperty(key)) {
                console.warn(`Component warning: Setting state which is not exists ('${key}') in '${this.constructor.name}'`);
                continue;
            }
            this.state[key] = value;
        }
    }
}
