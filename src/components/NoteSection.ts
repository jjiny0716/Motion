import Component from '../core/Component.js';

type NoteSectionProps = {
  title: string;
  content: string;
}

export default class NoteSection extends Component<NoteSectionProps> {
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