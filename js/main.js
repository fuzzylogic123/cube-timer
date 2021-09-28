"use strict"

let timer;
let mili = 0;
let sec = 0;
let increment = 1;
let offset;
let clock = document.getElementById('clock');

function startTimer() {
    let offset = Date.now();
    let timer = setInterval(updateTimer, increment);
}

function updateTimer() {
    offset = Date.now()
    mili += timeElapsed();
    if (mili === 1000) {
        sec += 1;
        mili = 0;
    }
    
    clock.innerHTML = `${sec}.${mili}`;
}

function timeElapsed() {
    let now = Date.now();
    let adjustedTime = now - offset;
    offset = now;
    return adjustedTime
}


startTimer()



