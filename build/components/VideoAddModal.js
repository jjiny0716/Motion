import Component from '../core/Component.js';
import FormInput from './FormInput.js';
export default class VideoAddModal extends Component {
    setup() {
        this.state = {
            title: "",
            url: "",
        };
    }
    template() {
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
            this.setState({ [target.dataset.name.toLowerCase()]: target.value });
        });
        this.addEventListener("click", ".add-button", () => {
            const { title, url } = this.state;
            addItem({ itemType: "video", title, content: url });
            close();
        });
    }
}
