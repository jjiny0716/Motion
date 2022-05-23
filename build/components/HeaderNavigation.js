import Component from '../core/Component.js';
export default class HeaderNavigation extends Component {
    template() {
        return `
    <button class="item-add-button" data-type="Image">Image</button>
    <button class="item-add-button" data-type="Video">Video</button>
    <button class="item-add-button" data-type="Note">Note</button>
    <button class="item-add-button" data-type="Task">Task</button>
    `;
    }
    setEvents() {
        const { modalMap } = this.props;
        this.addEventListener("click", ".item-add-button", (e) => {
            if (!e.target)
                return;
            const target = e.target.closest(".item-add-button");
            if (!target)
                return;
            const { type } = target.dataset;
            if (type)
                modalMap[type]();
        });
    }
}
