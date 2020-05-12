let submitSweepsEvent = function() {
    let gameForm = document.getElementById('game-form');
    if(gameForm) {
        let branchIoUrl = document.getElementsByName('branch-io-url')[0].value;

        gameForm.addEventListener("submit", function (e) {
            e.preventDefault();
            setSweepEvent();
            window.location.href = branchIoUrl;

        });
    }
};

let setSweepEvent = function() {
    mParticle.logEvent(
        'sweeps19',
        mParticle.EventType.Other,
        {'sweeps19':'sweeps19'}
    );

};

export default submitSweepsEvent;