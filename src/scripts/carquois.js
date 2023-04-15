import GameElement from './GameElement';
import FlechesImgSrc from './assets/images/fleches.png';
export default class carquois extends GameElement {

    constructor(x, y, deltaX, deltaY) {
        super(x, y, deltaX, deltaY);
        this.image = this.createImage(FlechesImgSrc);
        this.visibility = false;
        this.width = 10;
        this.height = 10;
        this.probability = 0.5;
        this.timer = null;
        this.isCollison = false;
    }

    place(canvas) {
        this.y = 0;
        this.x = Math.floor(Math.random() * canvas.width);
    }
    draw(context) {
        if (this.visibility) {
            context.drawImage(this.image, this.x, this.y);
        }
    }
    drawOff() {
        this.visibility = false;
    }
    drawOn(canvas) {
        if (!this.visibility) {
            const probability = Math.random();
            if (probability < this.probability) {
                this.changePosition();
                this.visibility = true;
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.drawOff();
                    console.log("carquois draw off");
                }, 1500);
            }
        }
    }
    changePosition() {
        this.x = Math.floor(Math.random() * (400 - 100)) + 100;
        this.y = Math.floor(Math.random() * (400 - 100)) + 100;
    }
}


