import { endGame } from "../modules/main.js";
import { BaseGameObject } from "./baseGameObject.js";

export class StartFlag extends BaseGameObject {
    constructor (x, y) {
        super(x, y, 100, 100, "startFlag");

        this.loadImage("../images/Startflag.png");
    }
}

export class FinishFlag extends BaseGameObject {
    constructor (x, y) {
        super(x, y, 100, 100, "finishFlag");

        this.loadImage("../images/Finishflag.png");
    }
}