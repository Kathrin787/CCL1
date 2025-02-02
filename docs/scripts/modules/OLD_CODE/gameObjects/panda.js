import {BaseGameObject} from "./baseGameObject.js";
import {global} from "../modules/global.js";

class Panda extends BaseGameObject {
    name = "Panda";
    xVelocity = 0;
    yVelocity = 0;

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("../../images/Panda.png", 1, 1)
    }

    update = function() {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        if (this.xVelocity === 0) {
            this.switchCurrentSprites(
                this.animationData.firstSpriteIndex,
                this.animationData.firstSpriteIndex);
        }
    }
}

export {Panda}