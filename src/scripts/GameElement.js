import ArcImgSrc from './assets/images/arc.png';
export default class GameElement {
  canvas;

  constructor(x, y, deltaX = 10, deltaY = 10) {
    this.x = x;
    this.y = y;
    this.deltaX = deltaX;
    this.deltaY = deltaY;
    this.image = this.createImage(ArcImgSrc);
    // console.log(this.iWidth(), this.iHeight());
  }

  createImage(imageSource) {
    const newImg = new Image();
    newImg.src = imageSource;
    return newImg;
  }

  iWidth() {
    return this.image.width;
  }

  iHeight() {
    return this.image.height;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }

  checkCollisionWith(other) {
    return this.x < other.x + other.iWidth() &&
      this.x + this.iWidth() > other.x &&
      this.y < other.y + other.iHeight() &&
      this.y + this.iHeight() > other.y;
  }

  // move(canvas) {
  //   if ((this.x + this.deltaX + arc.ARC_WIDTH > canvas.width) || (this.x + this.deltaX < 0)) {
  //     this.deltaX = -this.deltaX;
  //   }
  // }
}