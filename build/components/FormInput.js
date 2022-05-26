import Component from '../core/Component.js';
export default class FormInput extends Component {
    template() {
        const { name } = this.props;
        return `
    <label for=${name}>${name}</label>
    <input type="text" name=${name} data-name=${name} id=${name} autocomplete="off">
    `;
    }
}
