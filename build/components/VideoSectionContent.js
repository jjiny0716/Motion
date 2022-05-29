import Component from '../core/Component.js';
import { convertYoutubeURLToEmbbededURL } from '../utils/youtube.js';
export default class VideoSectionContent extends Component {
    template() {
        const { title, url } = this.props;
        return `
    <iframe width="500" height="300" src="${convertYoutubeURLToEmbbededURL(url)}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div class="content">
      <h3 class="item-title">${title}</h3>
    </div>
    <button class="item-delete-button">&#10006;</button>
    `;
    }
}
