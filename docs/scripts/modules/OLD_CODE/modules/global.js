import { Tree } from "../NEW_CODE/gameObjects/tree";

const global = {};

global.canvas = document.querySelector("#canvas");

global.ctx = canvas.getContext("2d");
global.prevTotalRunningTime = 0;
global.deltaTime = 0;
global.allGameObjects = [15, 13];
global.panda = {};
global.backgroundShift = 0;
global.backgroundMaxShift = -600;

global.tree = new Tree(10, 10)

const game = document.getElementById('game');
const panda = document.getElementById('panda');
const scoreElement = document.getElementById('score');
let score = 0;
let isJumping = false;

global.getCanvasBounds = function () {
    let bounds =  {
        "left": 0,
        "right": this.canvas.width,
        "top": 0, 
        "bottom": this.canvas.height
    }

    return bounds;
}

global.checkCollisionWithAnyOther = function (givenObject) {
    for (let i = 0; i < global.allGameObjects.length; i++) {
        let otherObject = global.allGameObjects[i];
        if (otherObject.active == true) {
            let collisionHappend = this.detectTreeCollision(givenObject, otherObject);
            if (collisionHappend) {
                givenObject.reactToCollision(otherObject);
                otherObject.reactToCollision(givenObject);
            }
        }
    }
}

global.detectTreeCollision = function(gameObject1, gameObject2) {
    let tree1 = gameObject1.getBoxBounds();
    let tree2 = gameObject2.getBoxBounds();
    if (gameObject1 != gameObject2) {
        if (tree1.top <= tree2.bottom &&
            tree1.left <= tree2.right &&
            tree1.bottom >= tree2.top &&
            tree1.right >= tree2.left) {
                return true;
            }
    } return false;
}

export {global}