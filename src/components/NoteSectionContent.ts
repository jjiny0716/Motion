import Component from '../core/Component.js';

type NoteSectionContentProps = {
  title: string;
  content: string;
}

export default class NoteSectionContent extends Component<NoteSectionContentProps> {
  template(): string {
    const { title, content  } = this.props;

    return `
    <div class="content">
      <h3 class="item-title">${title}</h3>
      <p>${content}</p>
    </div>
    <button class="item-delete-button">&#10006;</button>
    `;
  }
}