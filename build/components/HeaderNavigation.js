import Component from '../core/Component.js';
export default class HeaderNavigation extends Component {
    template() {
        return `
    <button class="item-add-button" data-modal-name="ImageAddModal">Image</button>
    <button class="item-add-button" data-modal-name="VideoAddModal">Video</button>
    <button class="item-add-button" data-modal-name="NoteAddModal">Note</button>
    <button class="item-add-button" data-modal-name="TaskAddModal">Task</button>
    `;
    }
    setEvents() {
        const { openModal } = this.props;
        this.addEventListener("click", ".item-add-button", (e) => {
            if (!e.target)
                return;
            const target = e.target.closest(".item-add-button");
            if (!target)
                return;
            const { modalName } = target.dataset;
            if (modalName)
                openModal(modalName);
        });
    }
}
