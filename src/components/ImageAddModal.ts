import Component from '../core/Component.js';
import { ComponentState } from '../core/coreTypes.js';

import FormInput from './FormInput.js';

import { Item } from '../types.js';

type ImageAddModalProps = {
  close: () => void;
  addItem: (item: Item) => void;
}

type TaskAddModalState = {
  title: string;
  url: string;
}


export default class ImageAddModal extends Component<ImageAddModalProps, TaskAddModalState> {
  setup() {
    this.state = {
      title: "",
      url: "",
    };
  }

  template(): string {
    return `
    <div class="modal-overlay">
      <div class="modal-content add-modal">
        <button class="close-button">&#10006;</button>
        <div class="FormInput" data-component="FormInput" data-key="Title"></div>
        <div class="FormInput" data-component="FormInput" data-key="URL"></div>
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
      this.setState({ [(target.dataset.name as string).toLowerCase()]: target.value })
    });

    // 아이템 추가하기
    this.addEventListener("click", ".add-button", () => {
      const { title, url } = this.state;
      addItem({ itemType: "image", title, content: url });
      close();
    });
  }
}
