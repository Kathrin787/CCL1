import {global} from "./global.js";

function move(event) {
    switch(event.key) {
        case "d":
            if (global.playerObject.xVelocity == 0)
                global.playerObject.switchCurrentSprites (x,y);
            global.playerObject.xVelocity = 200;
            global.playerObject.yVelocity = 0;
            console.log("velocity set");
            break;
        case "a":
            if (global.playerObject.xVelocity == 0)
                global.playerObject.switchCurrentSprites(x,y);
            global.playerObject.xVelocity = -200;
            global.playerObject.yVelocity = 0;
            break;
    }
}

function jump() {
    if (character.classList !="animate"){
        character.classList.add("animate");
    }
    setTimeout(() => {
        character.classList.remove("animate");
    },1000);
}