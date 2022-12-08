export default class Section {
    constructor({ renderer }, selector) {
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }
    renderItems(data) {
        this._renderedItems = data;
        this._renderedItems.forEach(items => this._renderer(items));
    }
    setItem(element) {
        this._container.prepend(element);
    }
}