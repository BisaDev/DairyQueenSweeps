export default function () {
    loopOptions();
}

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function draggable(draggableOption){

    draggableOption.addEventListener('touchmove',function(ev){
        preventDefault();
        const optionsDiv = document.querySelector('#object-div');
        let divOffsetTop = optionsDiv.offsetTop;
        let touchLocation = ev.targetTouches[0];
        let correctTopLocation = touchLocation.pageY - divOffsetTop;

        if(correctTopLocation > 10 && correctTopLocation < 40){
            draggableOption.style.top = (correctTopLocation) + 'px';
            draggableOption.style.transform = 'translateY(-50%)';
        }
    });

    draggableOption.addEventListener('touchend',function(){
        let parentContainer = draggableOption.parentNode;

        switch (draggableOption.className) {
            case 'image left':
                parentContainer.classList.add('content-image-left');
                draggableOption.classList.add('object-left');
                break;
            case 'image center':
                parentContainer.classList.add('content-image-center');
                draggableOption.classList.add('object-center');
                break;
            case 'image right':
                parentContainer.classList.add('content-image-right');
                draggableOption.classList.add('object-right');
                break;
        }
    });
}

function loopOptions(){
    const optionsDivElements = document.querySelectorAll('.image');

    optionsDivElements.forEach(function(draggableOption){
        draggable(draggableOption);
    });

}


