import OiseauGaucheImgSrc from './assets/images/oiseau-voleur-gauche-droite.png';
import OiseauDroiteImgSrc from './assets/images/oiseau-voleur-droite-gauche.png';
import GameElement from './GameElement';

export default class Oiseau extends GameElement {
    static OISEAU_WIDTH = 48;
    constructor(x, y, movement, deltaX, deltaY, canvas) {
        super(x, y, deltaX, deltaY, canvas);
        this.image = (movement === "right") ? this.createImage(OiseauGaucheImgSrc) : this.createImage(OiseauDroiteImgSrc);
        this.hidden = false;
        this.active = true;
        this.movement = movement;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
        this.visible = true;
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y);
    }

    move() {
        this.x = this.movement === "right" ? this.x + this.deltaX : this.x - this.deltaX;
    }
}
