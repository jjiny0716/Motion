import { observable, observe } from "./observer.js";
import { updateElement } from "./updateElement.js";
import { adjustChildComponents } from "./adjustChildComponents.js";
import { ComponentError } from "./ComponentError.js";
import { RegisteredEventListener, ComponentState } from './coreTypes.js';
  
export default abstract class Component<P extends ComponentState = ComponentState, S extends ComponentState = ComponentState> {
  public props: P = {} as P;
  public state: S = {} as S;
  public childComponents: Record<string, Component> = {};
  private attacthedEventListeners: RegisteredEventListener[] = [];
  private isMountFinished: boolean = false;
  private updateID: number = 0;

  constructor(public target: HTMLElement, private propsGenerator?: Function) {
    if (!target) throw new ComponentError(`Target of component is ${target} in '${this.constructor.name}'`);
    this.updateProps();
    this.setup();
    this.state = this.state && observable(this.state);
    observe(this.update.bind(this));
  }

  updateProps() {
    this.props = this.propsGenerator ? this.propsGenerator() : null;
  }

  setup(): void {};
  abstract template(): string;
  render() {
    const { target } = this;
    const newNode = target.cloneNode(true) as Element;
    newNode.innerHTML = this.template();

    let childComponentData = {};
    const oldChildNodes = [...target.childNodes] as Element[];
    const newChildNodes = [...newNode.childNodes] as Element[];
    const maxLength = Math.max(oldChildNodes.length, newChildNodes.length);
    for (let i = 0; i < maxLength; i++) {
      childComponentData = { ...childComponentData, ...updateElement(target, newChildNodes[i], oldChildNodes[i]) };
    }

    adjustChildComponents(this, childComponentData);
  }

  generateChildComponent(target: HTMLElement, name: string, key: string): Component | undefined { return undefined };
  afterMount() {}
  beforeUpdate() {}
  afterUpdate() {}
  beforeUnmount() {}

  update(newTarget: HTMLElement) {
    if (newTarget && newTarget !== this.target) {
      this.target = newTarget;
      this.setEvents();
    }

    if (!this.isMountFinished) {
      this.lifeCycle();
    } else {
      // debounce
      cancelAnimationFrame(this.updateID);
      this.updateID = requestAnimationFrame(this.lifeCycle.bind(this));
    }
  }

  lifeCycle() {
    if (this.isMountFinished) this.beforeUpdate();
    if (this.isMountFinished) this.updateProps();
    this.render();
    if (this.isMountFinished) this.afterUpdate();

    if (!this.isMountFinished) {
      setTimeout(() => {
        this.setEvents();
        this.isMountFinished = true;
        this.afterMount();
      }, 0);
    }
  }

  destroyComponent(): void {
    const childComponents = Object.values(this.childComponents);
    for (let childComponent of childComponents) {
      childComponent.destroyComponent();
    }
    this.beforeUnmount();
    this.removeAllEventListener();
  }

  setEvents(): void {};
  addEventListener(eventType: string, selector: string, callback: (e: Event) => void): void {
    const listener = (e: Event) => {
      if ((e.target as HTMLElement).closest(selector)) callback(e);
    };
    this.target.addEventListener(eventType, listener);
    this.attacthedEventListeners.push({ type: eventType, listener });
  }

  removeAllEventListener(): void {
    for (let { type, listener } of this.attacthedEventListeners) {
      this.target.removeEventListener(type, listener);
    }
    this.attacthedEventListeners = [];
  }

  setState<K extends keyof S & string>(newState: Pick<S, K>): void {
    for (let [key, value] of Object.entries(newState) as Array<[K, any]>) {
      if (!this.state.hasOwnProperty(key)) {
        console.warn(`Component warning: Setting state which is not exists ('${key}') in '${this.constructor.name}'`);
        continue;
      }

      this.state[key] = value;
    }
  }
}
