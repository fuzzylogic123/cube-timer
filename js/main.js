"use strict"

//repeats timer function every specified time interval
let updateTimerHandle;
//keeps track of the total miliseconds passed since timer began
let totalMiliSec = 0;
//creates global variable to the timers initilisation
let startTime;
//global timeout handler
let timerDelay;
let cancelled = false;
let spaceDownThreshold = 400;
let startColor = '#32CD30';
let holdColor = '#FF0000';
let defaultColor = 'white';
//retrives DOM elements
let clock = document.getElementById('clock');
let scramble = document.getElementById('scramble');
let averages = document.getElementById('averages');
let menus = document.getElementById('tool-bar');

//starts the timer and sets callback function to update the timer every time the browser screen refreshes
function startTimer() {
    startTime = Date.now();
    requestAnimationFrame(updateTimer);
}

//updates the timer
function updateTimer() {
    if (!cancelled) {
        let timeElapsed = Date.now() - startTime;
        clock.innerHTML = formatTime(timeElapsed);
        updateTimerHandle = requestAnimationFrame(updateTimer);
    }
}

//takes total miliseconds and returns a formatted string to display
function formatTime(totalMiliSec) {
    let dispSeconds = Math.floor(totalMiliSec / 1000);
    let dispMiliSec = totalMiliSec % 1000;
    dispMiliSec = `00${dispMiliSec}`.substr(-3);
    return `${dispSeconds}.${dispMiliSec}`;
}

//waits for a key down, then sets a delay to run timerReady after delay
addEventListener("keydown", setDelay);

//once the space key is held down, this turns the clock red until spaceDownThreshold has passed
function setDelay(e) {
    if (e.key === " ") {
        removeEventListener("keydown", setDelay);
        clock.style.color = holdColor;
        timerDelay = setTimeout(timerReady, spaceDownThreshold);
        //If the user releases the space bar before the timing threshold, then timerReady will not run
        addEventListener("keyup", clearDelay);
    }
}

//if space is released before required time interval, then the timer start action is cancelled
function clearDelay(e) {
    if (e.key === " ") {
        removeEventListener("keyup", clearDelay);
        clearTimeout(timerDelay);
        clock.style.color = defaultColor;
        addEventListener("keydown", setDelay);
    }
}

//runs if user has held space bar for required spaceDownThreshold (waits for space release to start timer)
function timerReady() {
    removeEventListener("keyup", clearDelay);
    clock.style.color = startColor;
    //everything is hidden to simplify the timer
    scramble.style.display = 'none';
    averages.style.display = 'none';
    menus.style.display = 'none';
    document.body.style.cursor = 'none';
    addEventListener("keyup", confirmStart);
}

//starts the timer
function confirmStart(e) {
    if (e.key === " ") {
        removeEventListener("keyup", confirmStart);
        clock.style.color = defaultColor;
        startTimer();
        addEventListener("keydown", stopTimer, { once: true });
    }
}

//runs when space is clicked to stop timer
function stopTimer() {
    cancelled = true;
    clock.innerHTML = formatTime(Date.now() - startTime);
    //redisplay all components that were hidden
    scramble.style.display = 'block';
    averages.style.display = 'block';
    menus.style.display = 'block';
    document.body.style.cursor = 'auto';
    let currentSolve = new Solve(clock.innerHTML);
    session.addSolve(currentSolve);
    addEventListener("keyup", resetTimer);
}

//resets timer function
function resetTimer() {
    removeEventListener("keyup", resetTimer);
    addEventListener("keydown", setDelay);
    cancelled = false;
}