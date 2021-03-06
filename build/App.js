import Component from "./core/Component.js";
import HeaderNavigation from "./components/HeaderNavigation.js";
import ImageAddModal from "./components/ImageAddModal.js";
import VideoAddModal from "./components/VideoAddModal.js";
import NoteAddModal from "./components/NoteAddModal.js";
import TaskAddModal from "./components/TaskAddModal.js";
import ItemContainer from "./components/ItemContainer.js";
import { store } from "./store/store.js";
import { addItem } from "./store/item/item.action.js";
const modalConstructorMap = {
    "ImageAddModal": ImageAddModal,
    "VideoAddModal": VideoAddModal,
    "NoteAddModal": NoteAddModal,
    "TaskAddModal": TaskAddModal,
};
export default class App extends Component {
    setup() {
        this.state = {
            currentModalName: "",
        };
    }
    template() {
        const { currentModalName } = this.state;
        return `
    <div class="wrap">
      ${currentModalName ? `<div class=${currentModalName} data-component=${currentModalName}></div>` : ""}
      <header>
        <h1>MOTION</h1>
        <nav class="HeaderNavigation" data-component="HeaderNavigation"></nav>
      </header>
      <main class="ItemContainer" data-component="ItemContainer"></main>
    </div>
    `;
    }
    generateChildComponent(target, name, key) {
        const { closeModal } = this;
        switch (name) {
            case "HeaderNavigation":
                return new HeaderNavigation(target, () => {
                    const { openModal } = this;
                    return {
                        openModal: openModal.bind(this),
                    };
                });
            case "ImageAddModal":
            case "VideoAddModal":
            case "NoteAddModal":
            case "TaskAddModal":
                return new modalConstructorMap[name](target, () => {
                    const { addItemToStore } = this;
                    return {
                        close: closeModal.bind(this),
                        addItem: addItemToStore.bind(this),
                    };
                });
            case "ItemContainer":
                return new ItemContainer(target);
        }
    }
    openModal(modalName) {
        this.setState({ currentModalName: modalName });
    }
    closeModal() {
        this.setState({ currentModalName: "" });
    }
    addItemToStore(item) {
        const { itemList } = store.getState().item;
        store.dispatch(addItem(itemList, item));
    }
}
