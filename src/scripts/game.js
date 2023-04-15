import Arc from './arc';
import Cible from './Cible';
import Fleche from './fleche';
import Carquois from './carquois';
import Oiseau from './Oiseau';

export default class Game {
    #canvas;
    // à compléter

    constructor(canvas) {
        this.#canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.start = null;
        this.arc = new Arc(this.canvas.height / 2 - 96, this.canvas.height, 10, 10, this.canvas);
        this.cible = new Cible(Math.floor(Math.random() * ((this.canvas.width - 62) - 0 + 1)) + 0, 10, 10, 10);
        this.fleches = new Array();
        this.oiseaux = new Array();
        this.oiseaux.push(this.Oiseau("left"));
        this.oiseaux.push(this.Oiseau("right"));
        this.Carquois = new Carquois(10, 10, 10, 10);
        this.stockfleches = 5;
        this.stockflechesText = document.getElementById("nbArrows");
        this.score = 0;
        this.scoreText = document.getElementById("score");
        this.stockflechesText.textContent = this.stockfleches;
        this.lives = 3;
        this.livesElements = (document.getElementById("lifes")).getElementsByTagName("img");
        // à compléter
    }

    Oiseau(movement) {
        return new Oiseau(movement === "right" ? Math.floor(Math.random() * (150) - 120) : this.canvas.width + Math.floor(Math.random() * (80)), Math.floor(Math.random() * (400 - 130)) + 100, movement, 5, 5, this.canvas);
    }

    /** donne accès au canvas correspondant à la zone de jeu */
    get canvas() {
        return this.#canvas;
    }

    startandstop() {
        if (this.start) {
            cancelAnimationFrame(this.start);
            this.start = null;
        }
        else {
            this.animate();
        }
    }

    animate() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.cible.draw(this.context);
        this.arc.draw(this.context);
        this.arc.move(this.canvas);
        let arr = new Array();
        this.oiseaux.forEach((o) => {
            if (!o.hidden) {
                o.draw(this.context);
                if (this.Carquois.checkCollisionWith(o) && !this.Carquois.isCollison) {
                    this.Carquois.changePosition();
                    this.Carquois.isCollison = true;
                    clearTimeout(this.Carquois.timer);
                    setTimeout(() => {
                        this.Carquois.isCollison = false;
                        this.Carquois.drawOff(this.canvas);
                        this.Carquois.draw(this.context);
                        this.Carquois.drawOn(this.canvas);
                    }, 1500);
                }
                if (o.checkCollisionWith(this.arc)) {
                    this.score -= 500;
                    this.scoreText.textContent = this.score;
                    this.lives--;
                    this.livesElements[this.lives].style.display = "none";
                    if (this.lives === 0) {
                        setTimeout(() => {
                            this.gameover();
                        }, 10);
                    }
                    o.hidden = true;
                }
                this.fleches.forEach((f) => {
                    if (!f.visible) return;
                    if (o.checkCollisionWith(f)) {
                        o.hidden = true;
                        f.visible = false;
                    }
                });
            }
            if (o.active) {
                o.move();
                if (o.x < -100 && o.movement === "left" || o.x > this.canvas.width && o.movement === "right") {
                    o.hidden = true;
                    o.active = false;
                    arr.push(this.Oiseau(Math.random() > 0.5 ? "left" : "right"));
                }
            }
        });
        this.oiseaux = this.oiseaux.concat(arr);
        this.fleches.forEach((f) => {
            if (!f.visible) return;
            f.draw(this.context);
            f.move(this.canvas);
            if (this.cible.checkCollisionWith(f)) {
                this.cible.x = Math.floor(Math.random() * ((this.canvas.width - 62) - 0 + 1)) + 0;
                f.visible = false;
                this.score += 500;
                this.scoreText.textContent = this.score;
            }
        });
        if (!this.Carquois.isCollison) {
            this.Carquois.draw(this.context);
            this.Carquois.drawOn(this.canvas);
        }
        if (this.Carquois.checkCollisionWith(this.arc) && !this.Carquois.isCollison) {
            this.Carquois.changePosition();
            this.Carquois.isCollison = true;
            this.stockfleches += 3;
            this.stockflechesText.textContent = this.stockfleches;
            clearTimeout(this.Carquois.timer);
            setTimeout(() => {
                this.Carquois.isCollison = false;
                this.Carquois.drawOff(this.canvas);
                this.Carquois.draw(this.context);
                this.Carquois.drawOn(this.canvas);
            }, 1500);
        }
        this.start = requestAnimationFrame(this.animate.bind(this));
    }
    keyDownActionHandler(event) {
        switch (event.key) {
            case "ArrowLeft":
            case "Left":
                this.arc.deltaX = -10;
                break;
            case "ArrowRight":
            case "Right":
                this.arc.deltaX = 10;
                break;
            case "ArrowUp":
            case "Up":
                this.arc.deltaY = -10;
                break;
            case "ArrowDown":
            case "Down":
                this.arc.deltaY = 10;
                break;
            case " ":
                this.hit();
                break;
            default: return;
        }
        event.preventDefault();
    }

    keyUpActionHandler(event) {
        switch (event.key) {
            case "ArrowLeft":
            case "Left":
                this.arc.deltaX = 0;
                break;
            case "ArrowRight":
            case "Right":
                this.arc.deltaX = 0;
                break;
            case "ArrowUp":
            case "Up":
                this.arc.deltaY = 0;
                break;
            case "ArrowDown":
            case "Down":
                this.arc.deltaY = 0;
                break;

            default: return;
        }
        event.preventDefault();
    }

    addOiseau() {
        this.oiseaux.push(new Oiseau(10, this.canvas.height / 2, this.canvas.width, this.canvas.height / 2, 10, 10, canvas));
    }

    hit() {
        if (this.stockfleches > 0) {
            this.stockfleches--;
            this.stockflechesText.textContent = this.stockfleches;
            this.fleches.push(new Fleche(this.arc.x + 43, this.arc.y - 23, 10, 10, this.canvas));
        }
    }

    gameover() {
        cancelAnimationFrame(this.start);
        alert("Perdu!");
        window.location.reload();
    }
}
