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
    totalMiliSec = 0;
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
let spaceDownThreshold = 400;

//waits for a key down, then sets a delay to run initiateTiming after delay
addEventListener("keydown", setDelay);

//If the user releases the space bar before the timing threshold, then initiateTiming will not run
addEventListener("keyup", clearWait);

//checks if space bar is released and then starts timer
function initiateTiming() {
    clock.style.color = 'Green';
    addEventListener("keyup", confirmStart);
}

function confirmStart(e) {
    if (e.key === " ") {
        clock.style.color = 'Black';
        startTimer();
        removeEventListener("keydown", setDelay);
        removeEventListener("keyup", confirmStart);
        addEventListener("keydown", stopTimer);
    }
}

function setDelay(e) {
    if (e.key === " ") {
        clock.style.color = 'Red';
        removeEventListener("keydown", setDelay);
        timerDelay = setTimeout(initiateTiming, spaceDownThreshold);
    }
}

function clearWait(e) {
    if (e.key === " ") {
        clearTimeout(timerDelay);
        clock.style.color = 'Black'
    }
}

function stopTimer(e) {
    if (e.key ===" ") {
        clearInterval(timerHandle);
        removeEventListener("keydown", stopTimer);
        addEventListener('keyup', restartTimer);
    }
}

function restartTimer(e) {
    if (e.key === " ") {
        addEventListener("keydown", setDelay);
        addEventListener("keyup", clearWait);
    } 
}