import Component from "../core/Component.js";
import ItemSection from "./ItemSection.js";
import { store } from "../store/store.js";
import { deleteItem, swapItem } from "../store/item/item.action.js";
export default class ItemContainer extends Component {
    template() {
        const { itemList } = store.getState().item;
        return `
    ${itemList.map((_, i) => `<div class="ItemSection" draggable="true" data-component="ItemSection" data-key=${i}></div>`).join('')}
    `;
    }
    generateChildComponent(target, name, key) {
        const { deleteItemOfStore } = this;
        switch (name) {
            case "ItemSection":
                return new ItemSection(target, () => {
                    const { itemList } = store.getState().item;
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
    deleteItemOfStore(index) {
        const { itemList } = store.getState().item;
        store.dispatch(deleteItem(itemList, index));
    }
    swapItemOfStore(index1, index2) {
        const { itemList } = store.getState().item;
        store.dispatch(swapItem(itemList, index1, index2));
    }
}
