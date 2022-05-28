import Component from "../core/Component.js";

import ImageSectionContent from "./ImageSectionContent.js";
import VideoSectionContent from "./VideoSectionContent.js";
import NoteSectionContent from "./NoteSectionContent.js";
import TaskSectionContent from "./TaskSectionContent.js";

import { capitalizeFirstLetter } from "../utils/string.js";

import { ComponentState } from "../core/coreTypes.js";
import { Item } from "../types.js";

type ItemSectionProps = {
  item: Item;
  key: string;
  xButtonClickListener: Function;
  dropListener: Function;
};

export default class ItemSection extends Component<ItemSectionProps> {
  setup(): void {
    this.state = {
      dragCount: 0,
    }
  }

  template(): string {
    const { item } = this.props;
    const { dragCount } = this.state;

    return `
    <div class="${capitalizeFirstLetter(item.itemType)}SectionContent sectionContent ${dragCount ? "targeted" : ""}" data-component="${capitalizeFirstLetter(item.itemType)}SectionContent"></div>
    `;
  }

  generateChildComponent(target: HTMLElement, name: string, key: string): Component<ComponentState, ComponentState> | undefined {
    switch (name) {
      case "ImageSectionContent":
        return new ImageSectionContent(target, () => {
          const { item } = this.props;
          return {
            title: item.title,
            url: item.content,
          };
        });
      case "VideoSectionContent":
        return new VideoSectionContent(target, () => {
          const { item } = this.props;
          return {
            title: item.title,
            url: item.content,
          };
        });
      case "NoteSectionContent":
        return new NoteSectionContent(target, () => {
          const { item } = this.props;
          return {
            title: item.title,
            content: item.content,
          };
        });
      case "TaskSectionContent":
        return new TaskSectionContent(target, () => {
          const { item } = this.props;
          return {
            title: item.title,
            todoItem: item.content,
          };
        });
    }
  }

  setEvents(): void {
    // 삭제
    this.addEventListener("click", ".item-delete-button", (e) => {
      const { key, xButtonClickListener } = this.props;
      if (xButtonClickListener) xButtonClickListener(Number(key));
    });

    // 드래깅
    this.addEventListener("dragover", ".ItemSection", (e) => {
      e.preventDefault();
    });

    this.addEventListener("dragstart", ".ItemSection", (e) => {
      const { key } = this.props;
      (e as DragEvent).dataTransfer?.setData("text/plain", key);
    });

    this.addEventListener("drop", ".ItemSection", (e) => {
      const { key, dropListener } = this.props;
      if (dropListener) dropListener(Number(key), Number((e as DragEvent).dataTransfer?.getData("text/plain")));
      this.setState({ dragCount: 0 });
    });

    this.addEventListener("dragenter", ".ItemSection", (e) => {
      this.setState({ dragCount: this.state.dragCount + 1 });
    });

    this.addEventListener("dragleave", ".ItemSection", (e) => {
      this.setState({ dragCount: this.state.dragCount - 1 });
    });
  }
}
