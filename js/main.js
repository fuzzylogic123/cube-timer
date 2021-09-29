"use strict"

//repeats timer function every specified time interval
let timerHandle;
//keeps track of the total miliseconds passed since timer began
let totalMiliSec = 0;
//timer interval by which the timer updates
let increment = 1;
//creates global variable for the lag between timer updates
let offset;
//retrives clock div
let clock = document.getElementById('clock');

//starts the timer and sets callback function to update the timer ever increment
function startTimer() {
    offset = Date.now();
    timerHandle = setInterval(updateTimer, increment);
}

//updates the timer
function updateTimer() {
    totalMiliSec += timeElapsed();
    let dispSeconds = Math.floor(totalMiliSec/1000);
    let dispMiliSec = totalMiliSec % 1000;
    clock.innerHTML = `${dispSeconds}.${dispMiliSec}`;
}

//calculates the time passed since the timer was last updated
function timeElapsed() {
    let now = Date.now();
    let timeDiff = now - offset;
    offset = now;
    return timeDiff
}


startTimer()
