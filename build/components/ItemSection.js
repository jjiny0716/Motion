import Component from "../core/Component.js";
import ImageSectionContent from "./ImageSectionContent.js";
import VideoSectionContent from "./VideoSectionContent.js";
import NoteSectionContent from "./NoteSectionContent.js";
import TaskSectionContent from "./TaskSectionContent.js";
import { capitalizeFirstLetter } from "../utils/string.js";
export default class ItemSection extends Component {
    setup() {
        this.state = {
            dragCount: 0,
        };
    }
    template() {
        const { item } = this.props;
        const { dragCount } = this.state;
        return `
    <div class="${capitalizeFirstLetter(item.itemType)}SectionContent sectionContent ${dragCount ? "targeted" : ""}" data-component="${capitalizeFirstLetter(item.itemType)}SectionContent"></div>
    `;
    }
    generateChildComponent(target, name, key) {
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
    setEvents() {
        this.addEventListener("click", ".item-delete-button", (e) => {
            const { key, xButtonClickListener } = this.props;
            if (xButtonClickListener)
                xButtonClickListener(Number(key));
        });
        this.addEventListener("dragover", ".ItemSection", (e) => {
            e.preventDefault();
        });
        this.addEventListener("dragstart", ".ItemSection", (e) => {
            var _a;
            const { key } = this.props;
            (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("text/plain", key);
        });
        this.addEventListener("drop", ".ItemSection", (e) => {
            var _a;
            const { key, dropListener } = this.props;
            if (dropListener)
                dropListener(Number(key), Number((_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("text/plain")));
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
