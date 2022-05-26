import Component from '../core/Component.js';

type ImageSectionProps = {
  title: string;
  url: string;
}

export default class TaskSection extends Component<ImageSectionProps> {
  template(): string {
    const { title, url  } = this.props;

    return `
    <img src=${url} alt=${title}>
    <h3 class="item-title">${title}</h3>
    <button class="item-delete-button">&#10006;</button>
    `;
  }
}