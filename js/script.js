let upArrowSession = document.querySelector('#upArrowSession');
let downArrowSession = document.querySelector('#downArrowSession');
let inputSession = document.querySelector('#inputSession');

let upArrowBreak = document.querySelector('#upArrowBreak');
let downArrowBreak = document.querySelector('#downArrowBreak');
let inputBreak = document.querySelector('#inputBreak');

let clock = document.querySelector('#clock');
let startClock = document.querySelector('#startClock');
let pauseClock = document.querySelector('#pauseClock');
let stopClock = document.querySelector('#stopClock');
let resetClock = document.querySelector('#resetClock');

let myBreak = document.querySelector('#inputBreak');

let sessionDiv = document.querySelector('#sessionDiv');
let breakDiv = document.querySelector('#breakDiv');

let myInterval = -1;
inputSession.value = 25;
let timeInSeconds = inputSession.value * 60;
//let timeInSeconds = 6;
//let timer;
let flagBreak = false;

document.addEventListener("DOMContentLoaded", function () {
    updateSelectedTime(inputSession.value * 60);
});

function incrementSession() {
    inputSession.value++;
    updateSelectedTime(inputSession.value * 60);
    timeInSeconds = inputSession.value * 60;
}

function decrementSession() {
    if (inputSession.value > 1) {
        inputSession.value--;
        updateSelectedTime(inputSession.value * 60);
    } else return;
}

function incrementBreak() {
    inputBreak.value++;
}

function decrementBreak() {
    if (inputBreak.value > 1) {
        inputBreak.value--;
    } else return;
}

upArrowSession.addEventListener('click', function () {
    incrementSession();
});

downArrowSession.addEventListener('click', function () {
    decrementSession();
});

upArrowBreak.addEventListener('click', function () {
    incrementBreak();
});

downArrowBreak.addEventListener('click', function () {
    decrementBreak();
});

startClock.addEventListener('click', function () {
    blockButton(upArrowSession, 'none');
    blockButton(downArrowSession, 'none');
    blockButton(upArrowBreak, 'none');
    blockButton(downArrowBreak, 'none');
    blockButton(startClock, 'none');
    blockButton(pauseClock, 'auto');
    blockButton(stopClock, 'auto');
    if (timeInSeconds == inputSession.value * 60) {
        getTimer(inputSession.value * 60, 'start');
    } else {
        getTimer(timeInSeconds, 'start');
    }
});

pauseClock.addEventListener('click', function () {
    blockButton(startClock, 'auto');
    blockButton(pauseClock, 'none');
    blockButton(stopClock, 'none');
    getTimer(0, 'pause');
});

stopClock.addEventListener('click', function () {
    blockButton(upArrowSession, 'auto');
    blockButton(downArrowSession, 'auto');
    blockButton(upArrowBreak, 'auto');
    blockButton(downArrowBreak, 'auto');
    blockButton(startClock, 'auto');
    setDivColor(sessionDiv, 'white');
    setDivColor(breakDiv, 'white');
    getTimer(0, 'stop');

});

resetClock.addEventListener('click', function () {
    window.location.reload();
});

function getTimer(timer, selector) {
    //var timer = duration;
    if (flagBreak == true) {
        flagBreak = false;
        myInterval = setInterval(function () {
            blockButton(pauseClock,'none');
            setDivColor(sessionDiv, 'white');
            setDivColor(breakDiv, 'red');
            timeInSeconds = timer;
            updateSelectedTime(timer);
            console.log("Timer break: " + timer);
            if (--timer < 0) {
                timer = 0;
                clearInterval(myInterval);
                timeInSeconds = inputSession.value * 60;
                myInterval = -1;
                updateSelectedTime(inputSession.value * 60);
                setDivColor(breakDiv, 'white');
                blockButton(upArrowSession, 'auto');
                blockButton(downArrowSession, 'auto');
                blockButton(upArrowBreak, 'auto');
                blockButton(downArrowBreak, 'auto');
                blockButton(startClock, 'auto');
                blockButton(pauseClock, 'auto');
            }
        }, 1000);
    }
    
    if (myInterval == -1 && selector == 'start') {
        myInterval = setInterval(function () {
            setDivColor(sessionDiv, 'lightgreen');
            timeInSeconds = timer;
            updateSelectedTime(timer);
            console.log("Timer: " + timer);
            if (--timer < 0) {
                timer = 0;
                timeInSeconds = timer;
                clearInterval(myInterval);
                myInterval = -1;
                flagBreak = true;
                getTimer(myBreak.value * 60, 'start'); // break write here!
            }
        }, 1000);
    } else if (myInterval != -1 && selector == 'pause') {
        clearInterval(myInterval);
        myInterval = -1;
    } else if (myInterval != -1 && selector == 'stop') {
        clearInterval(myInterval);
        timeInSeconds = inputSession.value * 60;
        myInterval = -1;
        updateSelectedTime(inputSession.value * 60);
    }
}

function updateSelectedTime(timer) {
    let hour = parseInt(timer / 3600, 10);
    let minutes = parseInt((timer % 3600) / 60, 10);
    let seconds = parseInt(((timer % 3600) % 60), 10);

    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    clock.value = hour + ":" + minutes + ":" + seconds;
}

function setDivColor(div, color) {
    div.style.backgroundColor = color;
}

function blockButton(buttonName, state) {
    buttonName.style.pointerEvents = state;
}

