import { TreeM, TreeL, TreeS } from "../gameObjects/tree.js"
import { Panda } from "../gameObjects/panda.js"
import { StartPlatform, FinishPlatform } from "../gameObjects/platform.js";
import { StartFlag, FinishFlag } from "../gameObjects/flag.js";
import { Leaf } from "../gameObjects/leaf.js";
import { Plant } from "../gameObjects/plant.js";

document.getElementById('easyButton').addEventListener('click', () => startGame(0.0));
document.getElementById('mediumButton').addEventListener('click', () => startGame(0.25));
document.getElementById('hardButton').addEventListener('click', () => startGame(0.75));

const restartButtons = document.getElementsByClassName('singleButton');

for (let i = 0; i < restartButtons.length; i++) {
    restartButtons.item(i).addEventListener('click', () => {
        location.reload();
    });
}

let gameObjects = [];
let panda = null;
let runningGame = true;

let deltaTime = 0;
let prevTotalTime = 0;
let score = 0;
let backgroundAudio = null;

const canvasWidth = 10000;
const progressBar = document.getElementById('progress-bar');

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
const scoreValue = document.getElementById('scoreValue');

function startGame(plantPercentage) {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    document.getElementById('score').style.display = 'block';

    backgroundAudio = new Audio ("../sounds/musicbackground.mp3");
    backgroundAudio.volume = 0.3;
    backgroundAudio.loop = true;
    backgroundAudio.play();

    // Ensure the game container exists in your HTML
    const gameElement = document.getElementById('gameContainer');
    if (!gameElement) {
        console.error('No game container found. Ensure you have an element with id="gameContainer" in your HTML.');
    } else {
        const gameHeight = gameElement.offsetHeight; // get actual height of browser

        const startplatform = new StartPlatform(0, gameHeight - 200);
        gameObjects.push(startplatform);

        let lastGap = true;

        for (let i = 200; i < 9800; i += 200) {
            const random = Math.random();
            const randomLeaf = Math.random();
            const randomPlant = Math.random();

            let tree = null;
            let leaf = null;
            let plant = null;

            if (random < 0.25) {
                tree = new TreeS(i, gameHeight - 158);
                if (randomLeaf < 0.5) {
                    leaf = new Leaf(i + 80, gameHeight - 228);
                } else if (randomPlant < plantPercentage) {
                    plant = new Plant(i + 80, gameHeight - 218);
                }
            } else if (random < 0.50) {
                tree = new TreeL(i, gameHeight - 247);
                if (randomLeaf < 0.5) {
                    leaf = new Leaf(i + 80, gameHeight - 317);
                } else if (randomPlant < plantPercentage) {
                    plant = new Plant(i + 80, gameHeight - 307);   
                }
            } else if (random < 0.75 || lastGap == true) {
                tree = new TreeM(i, gameHeight - 200);
                if (randomLeaf < 0.5) {
                    leaf = new Leaf(i + 80, gameHeight - 270);
                } else if (randomPlant < plantPercentage) {
                    plant = new Plant (i + 80, gameHeight - 260);
                }
            } else {
                if (randomLeaf < 0.5) {
                    leaf = new Leaf(i + 80, gameHeight - 330);
                }
                // not needed, no tree, placeholder for gap, but important to spawn leaves
            }

            if (tree != null) {
                gameObjects.push(tree);
                lastGap = false;
            } else {
                lastGap = true;
            }

            if (leaf != null) {
                gameObjects.push(leaf);
            }

            if (plant != null) {
                gameObjects.push(plant);
            }
        }
        
        const finishplatform = new FinishPlatform(9800, gameHeight - 200);
        gameObjects.push(finishplatform);

        const startFlag = new StartFlag(20, gameHeight - 300);
        gameObjects.push(startFlag);

        const finishFlag = new FinishFlag(9880, gameHeight - 300);
        gameObjects.push(finishFlag);

        panda = new Panda(100, gameHeight - 280, 60, 80);
        console.log("Hello its me panda");
        gameObjects.push(panda);

        gameLoop(0)
    }
}

export function endGame() {
    backgroundAudio.pause();
    document.getElementById('gameContainer').style.display = 'none';
    // document.getElementById('score').style.display = 'flex';
    document.getElementById('endScreen').style.display = 'flex';
    runningGame = false;
}

export function gameOverScreen() {
    backgroundAudio.pause();
    const audio = new Audio ("../sounds/gameover.mp3");
    audio.volume = 0.3;
    audio.loop = false;
    audio.play();

    document.getElementById('gameContainer').style.display = "none";
    // document.getElementById('score').style.display = 'flex';
    document.getElementById('gameOverScreen').style.display = "flex";
    runningGame = false;
}


document.addEventListener('keydown', (event) => {
    if (event.key === " ") { // Spacebar pressed  
        panda.jump(); // Trigger the panda's jump 
    }
    if (event.key === "d") {
        panda.goRight();
    }
    if (event.key === "a") {
        panda.goLeft();
    }
});

document.addEventListener('keyup', (event) => { // stops movement if button is not pressed
    if (event.key === "d") {
        panda.stopRight();
    }
    if (event.key === "a") {
        panda.stopLeft();
    }
})

// Next game frame
function gameLoop(totalTime) {
    if (prevTotalTime === 0) {
        prevTotalTime = totalTime;
    }
    deltaTime = totalTime - prevTotalTime;
    deltaTime /= 1000;
    prevTotalTime = totalTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < gameObjects.length; i++) {
        if (gameObjects[i].active == true) {
            gameObjects[i].update(deltaTime);
            gameObjects[i].draw(ctx, deltaTime);
        }
    }
 
    const progressPercentage = (panda.x / canvasWidth) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    if (runningGame) {
        requestAnimationFrame(gameLoop);
    }
}

export function increaseScore() {
    score = score + 1;
    scoreValue.textContent = score;
}

export function getAllGameObjects() {
    return gameObjects
}

export function checkCollisionWithAnyOther(panda, object2) { // checks collision with panda 
    let box1 = panda.getBoxBounds();
    let box2 = object2.getBoxBounds();
    
    if(panda != object2) {
        if (box1.top <= box2.bottom && 
            box1.left <= box2.right && 
            box1.bottom >= box2.top &&
            box1.right >= box2.left)
        {
            return true;
        }
    }
    return false;
}