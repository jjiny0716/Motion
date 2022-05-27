import Component from '../core/Component.js';
import FormInput from './FormInput.js';
import { decapitalizeFirstLetter } from "../utils/string.js";
export default class TaskAddModal extends Component {
    setup() {
        this.state = {
            title: "",
            todoItem: "",
        };
    }
    template() {
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
    generateChildComponent(target, name, key) {
        switch (name) {
            case "FormInput":
                return new FormInput(target, () => {
                    return {
                        name: key,
                    };
                });
        }
    }
    setEvents() {
        const { close, addItem } = this.props;
        this.addEventListener("click", ".modal-overlay", (e) => {
            if (!e.target.classList.contains("modal-overlay"))
                return;
            close();
        });
        this.addEventListener("click", ".close-button", () => {
            close();
        });
        this.addEventListener("input", "input", (e) => {
            const target = e.target;
            this.setState({ [decapitalizeFirstLetter(target.dataset.name)]: target.value });
        });
        this.addEventListener("click", ".add-button", () => {
            const { title, todoItem } = this.state;
            addItem({ itemType: "task", title, content: todoItem });
            close();
        });
    }
}
