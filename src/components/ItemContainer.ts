import Component from "../core/Component.js";

import ItemSection from "./ItemSection.js";

import { ComponentState } from "../core/coreTypes.js";
import { Item } from "../types.js";

import { store } from "../store/store.js";

import { deleteItem, swapItem } from "../store/item/item.action.js";

export default class ItemContainer extends Component {
  template(): string {
    const { itemList }: { itemList: Item[] } = store.getState().item;

    return `
    ${itemList.map((_, i) => `<div class="ItemSection" draggable="true" data-component="ItemSection" data-key=${i}></div>`).join('')}
    `;
  }

  generateChildComponent(target: HTMLElement, name: string, key: string): Component<ComponentState, ComponentState> | undefined {
    const { deleteItemOfStore } = this;

    switch (name) {
      case "ItemSection":
        return new ItemSection(target, () => {
          const { itemList }: { itemList: Item[] } = store.getState().item;
          const { swapItemOfStore } = this;
          const item = itemList[Number(key)];
          return {
            item,
            key,
            xButtonClickListener: deleteItemOfStore.bind(this),
            dropListener: swapItemOfStore.bind(this),
          };
        });
    }
  }

  deleteItemOfStore(index: number) {
    const { itemList } = store.getState().item;
    store.dispatch(deleteItem(itemList, index));
  }
  
  swapItemOfStore(index1: number, index2: number) {
    const { itemList } = store.getState().item;
    store.dispatch(swapItem(itemList, index1, index2));
  }
}
