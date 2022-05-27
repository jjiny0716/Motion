import Component from "../core/Component.js";
export default class ImageSectionContent extends Component {
    template() {
        const { title, url } = this.props;
        return `
    <img src=${url} alt=${title}>
    <div class="content">
      <h3 class="item-title">${title}</h3>
    </div>
    <button class="item-delete-button">&#10006;</button>
    `;
    }
}
