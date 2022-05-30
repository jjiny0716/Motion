import { observable, observe } from "./observer.js";
import { updateElement } from "./updateElement.js";
import { adjustChildComponents } from "./adjustChildComponents.js";
import { ComponentError } from "./ComponentError.js";
;
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
        this.props = this.propsGenerator ? this.propsGenerator() : {};
    }
    setup() { }
    ;
    template() { return ''; }
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
    update(newTarget) {
        if (newTarget && newTarget !== this.target) {
            this.target = newTarget;
            this.setEvents();
        }
        if (!this.isMountFinished) {
            this.lifeCycle();
        }
        else {
            cancelAnimationFrame(this.updateID);
            this.updateID = requestAnimationFrame(this.lifeCycle.bind(this));
        }
    }
    lifeCycle() {
        this.isMountFinished && this.beforeUpdate && this.beforeUpdate();
        this.isMountFinished && this.updateProps();
        this.render();
        this.isMountFinished && this.afterUpdate && this.afterUpdate();
        if (!this.isMountFinished) {
            setTimeout(() => {
                this.setEvents();
                this.isMountFinished = true;
                this.afterMount && this.afterMount();
            }, 0);
        }
    }
    destroyComponent() {
        const childComponents = Object.values(this.childComponents);
        for (let childComponent of childComponents) {
            childComponent.destroyComponent();
        }
        this.beforeUnmount && this.beforeUnmount();
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
