import Component from "../core/Component.js";

import ImageSection from "../components/ImageSection.js";
import VideoSection from "../components/VideoSection.js";
import NoteSection from "../components/NoteSection.js";
import TaskSection from "../components/TaskSection.js";

import { ComponentState } from "../core/coreTypes.js";
import { Item } from "../types.js";

import { store } from "../store/store.js";

import { capitalizeFirstLetter } from "../utils/string.js";

export default class ItemContainer extends Component {
  template(): string {
    const { itemList }: { itemList: Item[] } = store.getState().item;

    return `
    ${itemList.map((item, i) => `<div class="section ${`${capitalizeFirstLetter(item.itemType)}Section`}" data-component=${`${capitalizeFirstLetter(item.itemType)}Section`} data-key=${i}></div>`).join('')}
    `;
  }

  generateChildComponent(target: HTMLElement, name: string, key: string): Component<ComponentState, ComponentState> | undefined {
    const { itemList }: { itemList: Item[] } = store.getState().item;

    switch (name) {
      case "ImageSection":
        return new ImageSection(target, () => {
          const item = itemList[Number(key)];
          return {
            title: item.title,
            url: item.content,
          }
        });
      case "VideoSection":
        return new VideoSection(target, () => {
          const item = itemList[Number(key)];
          return {
            title: item.title,
            url: item.content,
          }
        });
      case "NoteSection":
        return new NoteSection(target, () => {
          const item = itemList[Number(key)];
          return {
            title: item.title,
            content: item.content,
          }
        });
      case "TaskSection":
        return new TaskSection(target, () => {
          const item = itemList[Number(key)];
          return {
            title: item.title,
            todoItem: item.content,
          }
        });
    }
  }
}
