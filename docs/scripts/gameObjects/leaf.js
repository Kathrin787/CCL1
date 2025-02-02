import { BaseGameObject } from "./baseGameObject.js";

const minY = 20;
const velocityY = 20;

export class Leaf extends BaseGameObject {
    startY = 0;
    direction = -1;

    constructor (x, y) {
        super(x, y, 40, 40, "leaf");
        this.startY = y;
        this.loadImage("../../images/Leaf.png");
    }
   
    update(deltaTime) {
        super.update(deltaTime);
        const moveY = velocityY * deltaTime;
        if (this.direction == -1) {
            this.y -= moveY;
            if (this.y < this.startY - minY) {
                this.direction = 1;
                this.y = this.startY - minY;
            }
        } else {
            this.y += moveY;
            if (this.y > this.startY) {
                this.direction = -1;
                this.y = this.startY;
            }               
        }
    }
}