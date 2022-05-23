import Component from '../core/Component.js';

type HeaderNavigationProps = {
  modalMap: Record<string, () => void>;
}

export default class HeaderNavigation extends Component<HeaderNavigationProps> {
  template(): string {
    return `
    <button class="item-add-button" data-type="Image">Image</button>
    <button class="item-add-button" data-type="Video">Video</button>
    <button class="item-add-button" data-type="Note">Note</button>
    <button class="item-add-button" data-type="Task">Task</button>
    `;
  }

  setEvents(): void {
    const { modalMap } = this.props;

    this.addEventListener("click", ".item-add-button", (e) => {
      if (!e.target) return;
      const target = (e.target as HTMLElement).closest(".item-add-button") as HTMLElement;
      if (!target) return;

      const { type } = target.dataset;
      if (type) modalMap[type]();
    });
  }
}