import $ from "jquery";
import {Power1, TweenMax} from "gsap/TweenMax";

class UiAnimator {
    constructor(selector, container, outputSelector , modalContainer) {
        this.selector = selector;
        this.container = container;
        this.outputSelector = outputSelector;
        this.modalContainer = $(modalContainer);
        this.displayContainer = $('.modal-display-container');
        this.currentList = [
            "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois ", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana ", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania ", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
        ]

    }

    aimForCenter() {
        this.windowXcenter = $(window).width() / 2;
        this.yOffset = this.getOffset();
        this.selectionObjXPosition = Math.round($(this.selector).offset().left);
        this.selectionObjYPosition = Math.round($(this.selector).offset().top);
        this.selectionObjWidth = ($(this.selector).width()) / 2;
        this.pixelsToXcenter = Math.ceil(this.windowXcenter - this.selectionObjXPosition - this.selectionObjWidth);
        this.pixelsToYcenter = Math.ceil(-this.selectionObjYPosition  + this.yOffset);
    }

    getOffset(){
        if( $(window).width() < 325){
            return 270;

        } else if($(window).width() === 375 && $(window).height() === 559 || $(window).width() === 360 && $(window).height() === 560 || $(window).width() === 375 && $(window).height() === 553) {
            //IPhone 6, 7 and 8
            return 300;

        } else if($(window).width() === 375 && $(window).height() === 635 || $(window).width() === 414 && $(window).height() === 622) {
            //IPhone X, XS, 6+, 7+ and 8+
            return 330;

        } else if($(window).width() === 414 && $(window).height() === 719) {
            //IPhone XR
            return 380;

        } else if($(window).width() > 412 && $(window).width() < 414 && $(window).height() > 604 && $(window).height() < 606) {

            return 380;

        } else if ($(window).width() > 325 && $(window).height() < 635){
            return 250;

        } else {
            return 350;
        }
    }

    launchSelectedInput() {
        TweenMax.to(this.selector, 1, {
            bezier: [
                {x: 0, y: this.pixelsToYcenter - 30},
                {x: this.pixelsToXcenter / 1.8, y: this.pixelsToYcenter -95},
                {x: this.pixelsToXcenter, y: this.pixelsToYcenter }
                ],
            ease: Power3.easeOut,
            scale: .45,
            rotation: 15
        });
        TweenMax.to(this.selector, .5, {
            y: -235,
            ease: Sine.easeIn,
            delay: .5
        });
        TweenMax.to(this.selector, .1, {
            opacity: 0,
            delay: .55
        });

    }

    uiFadeOut(selector, callback) {
        TweenMax.to(selector, .6, {
            opacity: 0,
            onComplete: callback,
            delay: 1.5
        })
    }

    readyResultUI() {
        $(".pre").css("position", "absolute");
        $(".game-result-group").removeClass("-hidden");
    }

    uiFadein(selector, delay) {
        TweenMax.from(selector, 0, {opacity: 0});
        TweenMax.to(selector, .5, {
            ease: Power1.easeOut,
            opacity: 1,
            delay: delay
        })
    }

    uiLaunchSequence() {
        this.launchSelectedInput();
        this.uiFadeOut(".pre", this.readyResultUI);
    }


    createList(toContainer) {
        this.currentList.forEach((state) => {
            $(toContainer).append("<div class=\"modal-item\"><strong>" + state + "</strong></div>")
        });
        this.currentList.forEach((state) => {
            this.displayContainer.append("<div class=\"option modal-item\"><strong>" + state + "</strong></div>")
        });
        this.openModalListener();
        this.closeButtonListen();
        this.scrollDetector();
        this.preventAutoComplete(this.outputSelector)

    }

    listenForInput(selector, event) {
        $(selector).on(event, () => {
            this.toggleModal();
        })
    }

    openModalListener() {
        this.listenForInput(this.selector, "click", this.selector)
    }

    closeButtonListen() {
        this.listenForInput(".modal-close", "click", ".modal-close");
    }

    toggleModal() {
        $(this.container).toggleClass("-visible");
        $("body , html").not('.modal-item-container').toggleClass("-untouchable");
        this.listSelection = $(".active-selection").text();
        $(this.outputSelector).val(this.listSelection);
        $(this.outputSelector).trigger('change');
        $(this.outputSelector).parent().addClass("active");
        this.touchSelectListen();
        if($(this.container).hasClass("-visible")){
            $('.modal-bg:after').on( "touchstart touch touchend", (e) => {
                e.preventDefault()
            })
        }else {
            $('.modal-bg:after').off("touchstart touch touchend")
        }
    }

    touchSelectListen(){
        if ($(this.container).hasClass("-visible")){
            this.listenForInput(".click-area", "click",)
        } else {
            $(".click-area").off("click");
        }
    }

    scrollDetector(){


        this.modalContainer.scroll(() =>{

            this.scrollTop = this.modalContainer.scrollTop();
            this.scrollHeight = this.modalContainer.innerHeight();
            this.windowHeight = document.querySelector('.modal-item-container').scrollHeight;
            this.scrollPosition = (this.scrollTop / (this.windowHeight-this.scrollHeight)) * 100 / 2;
            this.scrollPosition = this.scrollPosition.toFixed(0);


            if ($(".option").removeClass("active-selection")) {
                $(this).removeClass("active-selection");
            }
            $(".option:nth-child(" + this.scrollPosition + ")").addClass("active-selection");


            TweenMax.to( this.displayContainer , .7, {
                y: -this.scrollPosition * 34,
            });

        }).trigger('scroll');
    }

    preventAutoComplete(selector){
        $(selector).bind("change keyup",()=>{
            this.setSelectedToInput(selector)
        });
    }

    setSelectedToInput(selector){
        $(selector).val(this.listSelection);
    }
}

export default UiAnimator
