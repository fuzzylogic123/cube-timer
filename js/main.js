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
    let dispSeconds = Math.floor(totalMiliSec / 1000);
    let dispMiliSec = totalMiliSec % 1000;
    dispMiliSec = `00${dispMiliSec}`.substr(-3);
    clock.innerHTML = `${dispSeconds}.${dispMiliSec}`;
}

//calculates the time passed since the timer was last updated
function timeElapsed() {
    let now = Date.now();
    let timeDiff = now - offset;
    offset = now;
    return timeDiff
}

//global timeout handler
let timerDelay;
let spaceDownThreshold = 333;

//checks if space bar is released and then starts timer
function initiateTiming() {
    addEventListener("keyup", (e) => {
        if (e.key === " ") {
            startTimer();
        }
    })
}

//waits for a key down, then sets a delay to run initiateTiming after delay
addEventListener("keydown", (e) => {
    if (e.key === " ") {
        timerDelay = setTimeout(initiateTiming, spaceDownThreshold);
    }
})

//If the user releases the space bar before the timing threshold, then initiateTiming will not run
addEventListener("keyup", (e) => {
    if (e.key === " ") {
        clearTimeout(timerDelay);
    }
})
