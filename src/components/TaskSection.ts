import Component from '../core/Component.js';

type TaskSectionProps = {
  title: string;
  todoItem: string;
}

export default class TaskSection extends Component<TaskSectionProps> {
  template(): string {
    const { title, todoItem  } = this.props;

    return `
    <div class="content">
      <h3 class="item-title">${title}</h3>   
      <div class="task">
        <input type="checkbox" />
        <p>${todoItem}</p>
      </div>
    </div>
    <button class="item-delete-button">&#10006;</button>
    `;
  }
}