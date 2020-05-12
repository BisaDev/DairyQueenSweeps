import $ from "jquery";

class SpriteAnimation {

    constructor($spriteContainer, length, fps, transitionEvery) {
        this.fps = fps;
        this.length = length;
        this.currentFrame = 1;
        this.animationInterval = null;
        this.transitionEvery = transitionEvery;
        this.$spriteContainer = $spriteContainer;
        this.timeoutInterval = (1 / this.fps) * 1000;
        this.canvasWidth = this.$spriteContainer.width();
        this.totalFrames = this.length / this.canvasWidth;
    }

    play() {
        this.$spriteContainer.show();
        this.startFrameRate();
    }

    startFrameRate() {
        this.animationInterval =
            setInterval(() => {
                this.advanceFrame(this.$spriteContainer)
            }, this.timeoutInterval)
    }


    advanceFrame(container) {
        if (this.currentFrame >= this.totalFrames) {
            this.currentFrame = 1
        }
        const newPosition = this.currentFrame * this.canvasWidth;
        container.css('background-position-x', newPosition);
        this.currentFrame++
    }

    pause(callback) {
        if (!this.paused) {
            if (this.currentFrame % this.transitionEvery === 0) {
                this.paused = true;
                clearInterval(this.animationInterval);
                callback()
            } else {
                setTimeout(() => {
                    this.pause(callback)
                }, this.timeoutInterval)
            }
        }
    }

    resume() {
        if (this.paused) {
            this.startFrameRate()
        }
    }

    hide() {
        this.$spriteContainer.hide()
    }

    loadSelectionSprite(userInput , spriteSheet ){
        spriteSheet.css({ "background": " url(\"/dist/images/ss_" + userInput.id + ".png\")" });
    }
}

export default SpriteAnimation


