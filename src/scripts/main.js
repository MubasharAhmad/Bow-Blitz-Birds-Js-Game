
// importation de la classe Game.js
import Game from './game.js';

const init = () => {
   const canvas = document.getElementById("playfield");
   const animation = new Game(canvas);
   window.addEventListener('keydown', animation.keyDownActionHandler.bind(animation));
   window.addEventListener('keyup', animation.keyUpActionHandler.bind(animation));
   document.getElementById("stopAndStartGame").addEventListener("click", () => animation.startandstop());
}

window.addEventListener("load", init);
