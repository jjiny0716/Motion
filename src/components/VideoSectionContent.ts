import Component from '../core/Component.js';

type VideoSectionContentProps = {
  title: string;
  url: string;
}

export default class VideoSectionContent extends Component<VideoSectionContentProps> {
  template(): string {
    const { title, url  } = this.props;

    return `
    <iframe width="500" height="300" src="https://www.youtube.com/embed/${url.split('/').at(-1)}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div class="content">
      <h3 class="item-title">${title}</h3>
    </div>
    <button class="item-delete-button">&#10006;</button>
    `;
  }
}
