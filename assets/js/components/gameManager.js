import $ from "jquery"
import UiAnimator from "./uiAnimator";
import SpriteAnimation from "./spriteAnimator"
import mParticleImplementation from "./mParticleImplementation";
import listenForSweep from "./mParticleSetSweepEvent";

class gameManager {
    constructor(Inputs, firstSprite, secondSprite, finalSprite) {
        this.Inputs = Inputs;
        this.uiAnimator = null;
        this.userSelection = null;
        this.firstSequence = null;
        this.finalSequence = null;
        this.secondSequence = null;
        this.firstSprite = firstSprite;
        this.finalSprite = finalSprite;
        this.secondSprite = secondSprite;
    }

    init() {
        this.loadIleSequence();
        this.startIdleSequence();
        mParticleImplementation();
        listenForSweep();
    }

    loadIleSequence() {
        this.firstSequence = new SpriteAnimation(this.firstSprite, 72000, 20, 20);
        this.secondSequence = new SpriteAnimation(this.secondSprite, 21600, 30, 60);
    }

    startIdleSequence() {
        this.firstSequence.play();
        this.waitForClick()

    }

    waitForClick() {
        this.Inputs.on("touchend touchmove touchstart ", () => {
            this.preventScroll(event);
            this.handleClick();
            this.stopListening();
        })
    }

    preventScroll(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;

    }

    stopListening() {
        this.Inputs.off("touchend touchmove touchstart");
    }

    handleClick() {
        this.userSelection = event.target;
        this.uiAnimator = new UiAnimator(event.target);
        this.uiAnimator.aimForCenter();
        this.secondSequence.loadSelectionSprite(this.userSelection, this.finalSprite);
        this.startFinalSequence()
    }

    startFinalSequence() {
        this.replaceSequence(this.firstSequence, this.secondSequence);
        this.loadChosenSequence();
    }

    loadChosenSequence() {
        this.finalSequence = new SpriteAnimation(this.finalSprite, 4320000, 20, 20);
        this.replaceSequence(this.secondSequence, this.finalSequence);
        this.uiAnimator.uiFadein(".game-result-group", 2.8);
        this.uiAnimator.uiFadein(".game-result-group-first", 3.2);
        this.uiAnimator.uiFadein(".game-result-group-second", 3.6);
    }

    replaceSequence(spriteToReplace, nextSprite) {
        spriteToReplace.pause(() => {
            spriteToReplace.hide();
            nextSprite.play();
            this.uiAnimator.uiLaunchSequence()
        },)
    }
}

let onPageLoad = function onPageLoad() {
    let game = new gameManager($(".game-input"), $(".game-sprite-default"), $(".game-sprite-chomp"), $(".game-sprite-selected"));
    game.init()
}


export default onPageLoad
