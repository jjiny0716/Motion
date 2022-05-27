import Component from "../core/Component.js";

import ItemSection from "./ItemSection.js";

import { ComponentState } from "../core/coreTypes.js";
import { Item } from "../types.js";

import { store } from "../store/store.js";

import { deleteItem } from "../store/item/item.action.js";

export default class ItemContainer extends Component {
  template(): string {
    const { itemList }: { itemList: Item[] } = store.getState().item;

    return `
    ${itemList.map((_, i) => `<div class="ItemSection" data-component="ItemSection" data-key=${i}></div>`).join('')}
    `;
  }

  generateChildComponent(target: HTMLElement, name: string, key: string): Component<ComponentState, ComponentState> | undefined {
    const { deleteItemOfStore } = this;

    switch (name) {
      case "ItemSection":
        return new ItemSection(target, () => {
          const { itemList }: { itemList: Item[] } = store.getState().item;
          const item = itemList[Number(key)];
          return {
            item,
            key,
            xButtonClickListener: deleteItemOfStore.bind(this),
          };
        });
    }
  }

  deleteItemOfStore(index: number) {
    const { itemList } = store.getState().item;
    store.dispatch(deleteItem(itemList, index));
  }
}
