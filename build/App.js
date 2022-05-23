import Component from './core/Component.js';
import HeaderNavigation from './components/HeaderNavigation.js';
import ItemContainer from './components/ItemContainer.js';
export default class App extends Component {
    setup() {
        this.state = {};
    }
    template() {
        return `
    <div class="wrap">
      <header>
        <h1>MOTION</h1>
        <nav class="HeaderNavigation" data-component="HeaderNavigation"></nav>
      </header>
      <main class="ItemContainer" data-component="ItemContainer"></main>
    </div>
    `;
    }
    generateChildComponent(target, name, key) {
        switch (name) {
            case "HeaderNavigation":
                return new HeaderNavigation(target);
            case "ItemContainer":
                return new ItemContainer(target);
        }
    }
}
