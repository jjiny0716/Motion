import Component from '../core/Component';
export default class Modal extends Component {
    template() {
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
