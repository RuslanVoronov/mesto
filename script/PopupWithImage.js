import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.popupTitle = document.querySelector('.image-popup__name');
        this.popupImage = document.querySelector('.image-popup__image');
    }
    open(name, link) {
        this.popupImage.src = link;
        this.popupTitle.textContent = name;
        this.popupImage.alt = name;
        super.open();
    }
}