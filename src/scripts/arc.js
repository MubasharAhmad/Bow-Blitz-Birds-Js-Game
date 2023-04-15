import GameElement from './GameElement';
import ArcImgSrc from './assets/images/arc.png';
export default class arc extends GameElement {
    constructor(x, y, deltaX, deltaY, canvas) {
        super(x, y, deltaX, deltaY, canvas);
        this.nbfle = 5;
        this.image = this.createImage(ArcImgSrc);
        this.stopMoving();
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y);
    }

    moveLeft() {
        this.deltaX = this.deltaX - 10;
    }

    moveRight() {
        this.deltaX = this.deltaX + 10;
    }

    moveUp() {
        if (this.y > 100)
            this.deltaY = this.deltaY - 10;
    }

    moveDown() {
        this.deltaY = this.deltaY + 10;
    }

    stopMoving() {
        this.deltaY = 0;
        this.deltaX = 0;

    }

    move(canvas) {
        this.x = Math.max(0, Math.min(canvas.width - this.width, this.x + this.deltaX));
        this.y = Math.max(100, Math.min(canvas.height - this.height, this.y + this.deltaY));
    }

    handleMoveKeys(arc) {
        this.stopMoving();
        if (arc.left)
            this.moveLeft();
        if (arc.right)
            this.moveRight();
        if (arc.up)
            this.moveUp();
        if (arc.down)
            this.moveDown();
    }

    get width() {
        console.log(this.image.width);
        return this.image.width;
    }

    get height() {
        return this.image.height;
    }

    get posx() {
        return this.x;
    }

    get posy() {
        return this.y;
    }
}