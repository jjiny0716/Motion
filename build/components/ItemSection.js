import Component from "../core/Component.js";
import ImageSectionContent from "./ImageSectionContent.js";
import VideoSectionContent from "./VideoSectionContent.js";
import NoteSectionContent from "./NoteSectionContent.js";
import TaskSectionContent from "./TaskSectionContent.js";
import { capitalizeFirstLetter } from "../utils/string.js";
export default class ItemSection extends Component {
    template() {
        const { item } = this.props;
        return `
    <div class="${capitalizeFirstLetter(item.itemType)}SectionContent sectionContent" data-component="${capitalizeFirstLetter(item.itemType)}SectionContent"></div>
    `;
    }
    generateChildComponent(target, name, key) {
        const { item } = this.props;
        switch (name) {
            case "ImageSectionContent":
                return new ImageSectionContent(target, () => {
                    return {
                        title: item.title,
                        url: item.content,
                    };
                });
            case "VideoSectionContent":
                return new VideoSectionContent(target, () => {
                    return {
                        title: item.title,
                        url: item.content,
                    };
                });
            case "NoteSectionContent":
                return new NoteSectionContent(target, () => {
                    return {
                        title: item.title,
                        content: item.content,
                    };
                });
            case "TaskSectionContent":
                return new TaskSectionContent(target, () => {
                    return {
                        title: item.title,
                        todoItem: item.content,
                    };
                });
        }
    }
    setEvents() {
        this.addEventListener("click", ".item-delete-button", (e) => {
            const { key, xButtonClickListener } = this.props;
            if (xButtonClickListener)
                xButtonClickListener(Number(key));
        });
    }
}
