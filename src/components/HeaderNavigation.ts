import Component from '../core/Component.js';

type HeaderNavigationProps = {
  openModal: (modalName: string) => void;
}

export default class HeaderNavigation extends Component<HeaderNavigationProps> {
  template(): string {
    return `
    <button class="item-add-button" data-modal-name="ImageAddModal">Image</button>
    <button class="item-add-button" data-modal-name="VideoAddModal">Video</button>
    <button class="item-add-button" data-modal-name="NoteAddModal">Note</button>
    <button class="item-add-button" data-modal-name="TaskAddModal">Task</button>
    `;
  }

  setEvents(): void {
    const { openModal } = this.props;

    this.addEventListener("click", ".item-add-button", (e) => {
      if (!e.target) return;
      const target = (e.target as HTMLElement).closest(".item-add-button") as HTMLElement;
      if (!target) return;

      const { modalName } = target.dataset;
      if (modalName) openModal(modalName);
    });
  }
}