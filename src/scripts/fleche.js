import FlecheImgSrc from './assets/images/fleche.png';
import GameElement from './GameElement';
import arc from './arc';

export default class fleche extends GameElement {
  static FLECHE_HEIGHT = 30;
  constructor(x, y, deltaX, deltaY, canvas) {
    super(x, y, deltaX, deltaY, canvas);
    this.image = this.createImage(FlecheImgSrc);
    this.arc = new arc(10, 10, 10, 10);
    this.visible = true;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }

  get width() {
    return this.image.width;
  }

  get height() {
    return this.image.height;
  }

  move(canvas) {
    this.y += -8;
  }

  stopMoving() {
    this.deltaY = 0;
    this.deltaX = 0;
  }
}
