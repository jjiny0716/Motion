import Component from '../core/Component.js';
export default class VideoSection extends Component {
    template() {
        const { title, url } = this.props;
        return `

    <iframe width="500" height="300" src="https://www.youtube.com/embed/${url.split('/').at(-1)}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div class="content">
      <h3 class="item-title">${title}</h3>
    </div>
    <button class="item-delete-button">&#10006;</button>
    `;
    }
    setEvents() {
        const { key, xButtonClickListener } = this.props;
        this.addEventListener("click", ".item-delete-button", (e) => {
            if (xButtonClickListener)
                xButtonClickListener(Number(key));
        });
    }
}
