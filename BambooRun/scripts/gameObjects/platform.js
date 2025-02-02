import { BaseGameObject } from "./baseGameObject.js";

export class StartPlatform extends BaseGameObject {
    constructor (x, y) {
        super(x, y, 200, 200, "platform");
        
        this.loadImage("../images/StartPlatform.png")
    }
}

export class FinishPlatform extends BaseGameObject {
    constructor (x, y) {
        super(x, y, 200, 200, "platform");
        
        this.loadImage("../images/FinishPlatform.png")
    }
}