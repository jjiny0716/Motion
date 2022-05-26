import Component from '../core/Component.js';

type FormInputProps = {
  name: string;
}

export default class FormInput extends Component<FormInputProps> {
  template(): string {
    const { name } = this.props;

    return `
    <label for=${name}>${name}</label>
    <input type="text" name=${name} data-name=${name} id=${name} autocomplete="off">
    `;
  }
}