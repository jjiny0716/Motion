import Component from '../core/Component.js';
export default class TaskSection extends Component {
    template() {
        const { title, url } = this.props;
        return `
    <img src=${url} alt=${title}>
    <h3 class="item-title">${title}</h3>
    <button class="item-delete-button">&#10006;</button>
    `;
    }
}
