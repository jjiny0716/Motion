import Component from '../core/Component';

export default class Modal extends Component {
  template(): string {
    return `
    <div class="modal-overlay">
      <div class="modal-content">

      </div>
    </div>
    `;
  }

  setEvents() {

  }
}