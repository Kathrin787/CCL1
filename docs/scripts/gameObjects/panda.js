import { checkCollisionWithAnyOther, endGame, gameOverScreen, getAllGameObjects, increaseScore } from "../modules/main.js";
import { AnimatingGameObject } from "./animatingGameObject.js";
import { MoveTrigger } from "./moveTrigger.js";

const gravity = 2000;
const jumpForce = -850;
const speed = 300;

export class Panda extends AnimatingGameObject {
    moveTrigger = null;
    velocityY = 0;
    velocityX = 0;
    isOnGround = true;
    goToLeft = false;
    goToRight = false;

    constructor (x, y, width, height) {
        super(x, y, width, height, "panda");
        
        this.loadImagesFromSpritesheet("../images/PandaWalking.png", 4, 4);
        this.switchCurrentSprites(0, 0);

        this.moveTrigger = new MoveTrigger();
    }
    
    update(deltaTime) {
        super.update(deltaTime);

        const lastVelocityX = this.velocityX;

        if (this.goToRight == true && this.goToLeft == true) {
            this.velocityX = 0;
        } else if (this.goToRight == true) {
            this.velocityX = speed;
        } else if (this.goToLeft == true) {
            this.velocityX = -speed;
        } else {
            this.velocityX = 0;
        }

        this.velocityY += gravity * deltaTime;

        const movingX = this.velocityX * deltaTime;
        const movingY = this.velocityY * deltaTime;

        this.x += movingX;
        this.y += movingY;
        if (this.x < 0) {
            this.x = 0;
        }

        if (this.velocityX == 0) {
            this.switchCurrentSprites(0, 0);
        } else if (lastVelocityX < this.velocityX) {
            this.switchCurrentSprites(0, 7);
        } else if (lastVelocityX > this.velocityX) {
            this.switchCurrentSprites(8, 15);
        }

        if (this.y > 1000) {
            gameOverScreen();
        }

        const objects = getAllGameObjects();
        for (var i = 0; i < objects.length; i++) {
            const object = objects[i];
            if (object.active == true) {
                if (object.name == "tree" || object.name == "platform") {
                    if (checkCollisionWithAnyOther(this, object)) {
                        this.movePandaToNearestEdge(object);
                    }
                } else if (object.name == "leaf") {
                    if (checkCollisionWithAnyOther(this, object)) {
                        object.active = false;
                        const audio = new Audio ("../sounds/collectleaf.mp3");
                        audio.loop = false;
                        audio.play();
                        increaseScore();
                    }
                } else if (object.name == "plant") {
                    if (checkCollisionWithAnyOther(this, object)) {
                        gameOverScreen();
                    }
                } else if (object.name == "finishFlag") {
                    if (checkCollisionWithAnyOther(this, object)) {
                        const audio = new Audio ("../sounds/goodend.mp3");
                        audio.loop = false;
                        audio.play();
                        endGame();
                    }
                }
            }
        }

        const blockLeft = this.moveTrigger.blockLeft;
        if (checkCollisionWithAnyOther(this, blockLeft)) {
            const changeX = blockLeft.x + blockLeft.width - this.x;
            this.moveTrigger.moveScreen(-changeX);
        }

        const blockRight = this.moveTrigger.blockRight;
        if (checkCollisionWithAnyOther(this, blockRight)) {
            const changeX = this.x + this.width - blockRight.x;
            this.moveTrigger.moveScreen(changeX);
        }
    }

    jump() {
        if (this.isOnGround) {
            this.velocityY = jumpForce;
            this.isOnGround = false;
            const audio = new Audio ("../sounds/jump.mp3");
            audio.volume = 0.2;
            audio.loop = false;
            audio.play();
        }
    }

    goRight() {
        this.goToRight = true;
    }

    stopRight() {
        this.goToRight = false;
    }

    goLeft() {
        this.goToLeft = true;
    }

    stopLeft() {
        this.goToLeft = false;
    }

    movePandaToNearestEdge(object) { // corrects the movement of the panda, because if he runs into a tree, he gets pushed back to the edge
        let box1 = this.getBoxBounds();
        let box2 = object.getBoxBounds();
    
        const topEdgeDistance = box1.bottom - box2.top;
        const bottomEdgeDistance = box2.bottom - box1.top;
        const leftEdgeDistance = box1.right - box2.left;
        const rightEdgeDistance = box2.right - box1.left;
        
        const edgeDistances = [topEdgeDistance, bottomEdgeDistance, leftEdgeDistance, rightEdgeDistance];
        const minDistance = Math.min(...edgeDistances);
    
        switch (minDistance) {
            case topEdgeDistance:
                this.y -= topEdgeDistance;
                this.velocityY = 0;
                this.isOnGround = true;
                break;
            case bottomEdgeDistance:
                this.y += bottomEdgeDistance;
                break;
            case leftEdgeDistance:
                this.x -= leftEdgeDistance + 1;
                break;
            case rightEdgeDistance:
                this.x += rightEdgeDistance + 1;
                break;
        }
    }
}