import {global} from "./global.js";
import {Leaf} from "../gameObjects/leaf.js"
import {Panda} from "../gameObjects/panda.js";

document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';

    const panda = new Panda(100, 400, 50, 50); // Create a Panda object
    global.allGameObjects.push(panda); // Add the Panda to the global game objects

    // Ensure the game container exists in your HTML
    const gameElement = document.getElementById('gameContainer');
    if (!gameElement) {
        console.error('No game container found. Ensure you have an element with id="gameContainer" in your HTML.');
    } else {
        setInterval(() => {
            const leaf = new Leaf();
        },2000);
    }

    console.log('Game Started!');
}

function gameLoop(totalRunningTime) {
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime;
    global.deltaTime /= 1000;
    global.prevTotalRunningTime = totalRunningTime;
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

    // Update and draw all active game objects
    for (var i = 0; i < global.allGameObjects.length; i++) {
        if (global.allGameObjects[i].active == true) {
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].draw();
        }
    }

    requestAnimationFrame(gameLoop);
}
