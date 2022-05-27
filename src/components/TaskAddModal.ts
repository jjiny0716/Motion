import Component from '../core/Component.js';
import { ComponentState } from '../core/coreTypes.js';

import FormInput from './FormInput.js';

import { Item } from '../types.js';

import { decapitalizeFirstLetter } from "../utils/string.js";

type TaskAddModalProps = {
  close: () => void;
  addItem: (item: Item) => void;
}

export default class TaskAddModal extends Component<TaskAddModalProps> {
  setup() {
    this.state = {
      title: "",
      todoItem: "",
    };
  }

  template(): string {
    return `
    <div class="modal-overlay">
      <div class="modal-content add-modal">
        <button class="close-button">&#10006;</button>
        <div class="FormInput" data-component="FormInput" data-key="Title"></div>
        <div class="FormInput" data-component="FormInput" data-key="todoItem"></div>
        <button class="add-button">Add</button>
      </div>
    </div>
    `;
  }

  generateChildComponent(target: HTMLElement, name: string, key: string): Component<ComponentState, ComponentState> | undefined {
    switch(name) {
      case "FormInput":
        return new FormInput(target, () => {
          return {
            name: key,
          }
        })
    }
  }

  setEvents() {
    const { close, addItem } = this.props;

    // 모달 닫기
    this.addEventListener("click", ".modal-overlay", (e) => {
      if (!(e.target as HTMLElement).classList.contains("modal-overlay")) return;
      close();
    })

    this.addEventListener("click", ".close-button", () => {
      close();
    })

    // state에 입력 반영
    this.addEventListener("input", "input", (e) => {
      const target = e.target as HTMLInputElement;
      this.setState({ [decapitalizeFirstLetter(target.dataset.name as string)]: target.value })
    });

    // 아이템 추가하기
    this.addEventListener("click", ".add-button", () => {
      const { title, todoItem } = this.state;
      addItem({ itemType: "task", title, content: todoItem });
      close();
    });
  }
}
