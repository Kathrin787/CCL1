import { BaseGameObject } from "./baseGameObject.js";

export class TreeM extends BaseGameObject {
    constructor (x, y) {
        super(x, y, 200, 200, "tree");
        this.loadImage("../images/Tree.png");
    }
}

export class TreeL extends BaseGameObject {
    constructor (x, y) {
        super(x, y, 200, 247, "tree");
        this.loadImage("../images/TreeL.png")
    }
}

export class TreeS extends BaseGameObject {
    constructor (x, y) {
        super(x, y, 200, 158, "tree");
        this.loadImage("../images/TreeS.png")
    }
}