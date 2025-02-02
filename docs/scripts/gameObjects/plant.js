import { BaseGameObject } from "./baseGameObject.js";
import { AnimatingGameObject } from "./animatingGameObject.js";

export class Plant extends AnimatingGameObject {
    constructor (x, y) {
        super(x, y, 60, 60, "plant");

        this.loadImagesFromSpritesheet("../../images/Plant.png", 4, 1);
        this.switchCurrentSprites(0, 3);
    }
}