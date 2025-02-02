
export class BaseGameObject {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    previousX = 0;
    previousY = 0;
    name = null;
    image = null;
    active = true;

    constructor (x, y, width, height, name) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.name = name;
        this.previousX = x;
        this.previousY = y;
    }

    getBoxBounds() {
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        }
    }

    loadImage(imageSource) {
        this.image = new Image();
        this.image.src = imageSource
    }

    update(deltaTime) {
        this.previousX = this.x
        this.previousY = this.y
    }

    draw(ctx, deltaTime) {        
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
