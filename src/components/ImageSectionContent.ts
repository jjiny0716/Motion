import Component from "../core/Component.js";

type ImageSectionContentProps = {
  title: string;
  url: string;
};

export default class ImageSectionContent extends Component<ImageSectionContentProps> {
  template(): string {
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
