import CibleImgSrc from './assets/images/cible.png';
import GameElement from './GameElement';
export default class Cible extends GameElement {
    static CANVAS_WIDTH = 500;
    constructor(x, y, deltaX, deltaY) {
        super(x, y, deltaX, deltaY);
        this.health = 1000;
        this.image = this.createImage(CibleImgSrc);
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y);
    }
}