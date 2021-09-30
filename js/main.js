"use strict"

//repeats timer function every specified time interval
let timerHandle;
//keeps track of the total miliseconds passed since timer began
let totalMiliSec = 0;
//timer interval by which the timer updates
let increment = 1;
//creates global variable for the lag between timer updates
let startTime;
//retrives clock div
let clock = document.getElementById('clock');
let scramble = document.getElementById('scramble');
let averages = document.getElementById('averages');
let menus = document.getElementById('tool-bar');

//starts the timer and sets callback function to update the timer ever increment
function startTimer() {
    startTime = Date.now();
    totalMiliSec = 0;
    requestAnimationFrame(updateTimer);
}

//updates the timer
function updateTimer() {
    let timeElapsed = Date.now() - startTime;
    clock.innerHTML = formatTime(timeElapsed);
    timerHandle = requestAnimationFrame(updateTimer);
}

//takes total miliseconds and returns a formatted string to display
function formatTime(totalMiliSec) {
    let dispSeconds = Math.floor(totalMiliSec / 1000);
    let dispMiliSec = totalMiliSec % 1000;
    dispMiliSec = `00${dispMiliSec}`.substr(-3);
    return `${dispSeconds}.${dispMiliSec}`;
}

//global timeout handler
let timerDelay;
let spaceDownThreshold = 400;
let startColor = '#32CD30';
let holdColor = '#FF0000';
let defaultColor = 'white';

//waits for a key down, then sets a delay to run timerReady after delay
addEventListener("keydown", setDelay);

//If the user releases the space bar before the timing threshold, then timerReady will not run
addEventListener("keyup", clearWait);

//runs if user has held space bar for required spaceDownThreshold
function timerReady() {
    clock.style.color = startColor;
    scramble.style.display = 'none';
    averages.style.display = 'none';
    menus.style.display = 'none';
    document.body.style.cursor = 'none';
    removeEventListener("keyup", clearWait);
    removeEventListener("keydown", setDelay);
    addEventListener("keyup", confirmStart);
}

//waits for user to release the space bar, and then starts the timer
function confirmStart(e) {
    if (e.key === " ") {
        clock.style.color = defaultColor;
        startTimer();
        removeEventListener("keyup", confirmStart);
        addEventListener("keydown", stopTimer);
    }
}

//once the space key is held down, this turns the clock red until spaceDownThreshold has passed
function setDelay(e) {
    if (e.key === " ") {
        clock.style.color = holdColor;
        timerDelay = setTimeout(timerReady, spaceDownThreshold);
    }
}

//if space is released before required time interval, then the timer start action is cancelled
function clearWait(e) {
    if (e.key === " ") {
        clearTimeout(timerDelay);
        clock.style.color = defaultColor;
    }
}

//runs when space is clicked to stop timer
function stopTimer() {
    cancelAnimationFrame(timerHandle);
    clock.innerHTML = formatTime(Date.now() - startTime);
    scramble.style.display = 'block';
    averages.style.display = 'block';
    menus.style.display = 'block';
    document.body.style.cursor = 'auto';
    addEventListener("keydown", setDelay);
    addEventListener("keyup", clearWait);
}