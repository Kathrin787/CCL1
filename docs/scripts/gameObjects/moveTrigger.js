import { BaseGameObject } from "./baseGameObject.js";

const relativeBlocksize = 0.3;

export class MoveTrigger {
    blockLeft = null;
    blockRight = null;
    backgroundShift = 0;
    backGroundDiv = null;
    canvas = null;
    gameContainier = null;

    constructor() {
        this.backGroundDiv = document.querySelector("#background");
        this.canvas = document.querySelector("#canvas");
        this.gameContainier = document.querySelector("#gameContainer");

        this.blockLeft = new BaseGameObject(0, 0, 300, 700, "box-left");
        this.blockRight = new BaseGameObject(700, 0, 300, 700, "box-right");
    }

    moveScreen(changeX) {
        const maxBackgroundShift = 10000 - this.gameContainier.offsetWidth;
        const blockWidth = this.gameContainier.offsetWidth * relativeBlocksize;
        this.blockLeft.width = blockWidth;
        this.blockRight.width = blockWidth;

        let correctedChangeX = changeX;
        if (this.backgroundShift + changeX < 0) {
            correctedChangeX = -this.backgroundShift;
        }

        if (this.backgroundShift + changeX > maxBackgroundShift) {
            correctedChangeX = maxBackgroundShift - this.backgroundShift;
        }

        this.backgroundShift += correctedChangeX;
        this.blockLeft.x += correctedChangeX;

        const blockXDifference = this.gameContainier.offsetWidth - blockWidth;
        this.blockRight.x = this.blockLeft.x + blockXDifference;

        this.backGroundDiv.style.backgroundPositionX = -this.backgroundShift + "px";
        this.canvas.style.marginLeft = -this.backgroundShift  + "px";
    }
}