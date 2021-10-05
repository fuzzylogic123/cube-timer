"use strict"

//repeats timer function every specified time interval
let updateTimerHandle;
//creates global variable to the timers initilisation
let startTime;
//global timeout handler
let timerDelay;
//defines whether or not the timer animation should cease
let cancelled = false;
//how long the user must hold space for the timer to initiate
let spaceDownThreshold = 400;
//colours for the clock
let startColor = '#32CD30';
let holdColor = '#FF0000';
let defaultColor = 'white';
//retrives DOM elements
const clock = document.getElementById('clock');
const scramble = document.getElementById('scramble');
const ao5 = document.getElementById('ao5');
const ao12 = document.getElementById('ao12');
const menus = document.getElementById('tool-bar');
const statIcon = document.getElementById('stat-icon');

//fill averages on screen
ao5.innerHTML = session.getAverage(5);
ao12.innerHTML = session.getAverage(12);

statIcon.addEventListener('click', () => {
    updateLSData(sessionKey, session);
    window.location.href = "./stats.html";
})

//generates scramble
let scrambleNotation = [["R", "R'", "R2"], ["L", "L'", "L2"], ["F", "F'", "F2"], ["B", "B'", "B2"], ["U", "U'", "U2"], ["D", "D'", "D2"]]

let currentScramble = scrambleGen(scrambleNotation)
scrambleToHTML(currentScramble);

function selectRandom(array) {
    return Math.floor(Math.random() * array.length);
}

//function to generate a new scramble
function scrambleGen(scrambleNotation, len = 20) {
    let scramble = [];
    let removed;
    for (let i = 0; i < len; i++) {
        let groupIndex = selectRandom(scrambleNotation);
        let scrambleGroup = scrambleNotation[groupIndex];
        let letter = scrambleGroup[selectRandom(scrambleGroup)];
        scramble.push(letter);
        //replace the previously removed entry if it exists
        if (i > 0) scrambleNotation.push(removed[0]);
        removed = scrambleNotation.splice(groupIndex, 1);
    }
    return scramble;
}

//converts scramble array to HTML
function scrambleToHTML(scramble) {
    let scrambleRef = document.getElementById('scramble');
    scrambleRef.innerHTML = '';
    let h2 = document.createElement("h2");
    scrambleRef.appendChild(h2);
    for (let i = 0; i < scramble.length; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add('scrambleLetter');
        newDiv.innerHTML = scramble[i];
        h2.appendChild(newDiv);
    }
}

/*timer code*/

//starts the timer and sets callback function to update the timer every time the browser screen refreshes
function startTimer() {
    cancelled = false;
    startTime = Date.now();
    requestAnimationFrame(updateTimer);
}

//updates the timer
function updateTimer() {
    if (!cancelled) {
        console.log('the timer is still updating')
        let timeElapsed = Date.now() - startTime;
        clock.innerHTML = formatTime(timeElapsed);
        updateTimerHandle = requestAnimationFrame(updateTimer);
    }
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
    console.clear()
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
        addEventListener("keydown", stopTimer);
    }
}

//runs when space is clicked to stop timer
function stopTimer() {
    removeEventListener("keydown", stopTimer);
    cancelled = true;
    console.log('timer has been stopped');
    let solveTime = Date.now() - startTime;
    clock.innerHTML = formatTime(solveTime);
    //redisplay all components that were hidden
    scramble.style.display = 'block';
    averages.style.display = 'block';
    menus.style.display = 'block';
    document.body.style.cursor = 'auto';
    //store solve
    let currentSolve = new Solve(solveTime, currentScramble);
    session.addSolve(currentSolve);
    updateLSData(sessionKey, session);
    //update averages
    ao5.innerHTML = session.getAverage(5);
    ao12.innerHTML = session.getAverage(12);
    //generate new scramble
    currentScramble = scrambleGen(scrambleNotation);
    scrambleToHTML(currentScramble);
    addEventListener("keyup", resetTimer);
}

//resets timer function
function resetTimer() {
    removeEventListener("keyup", resetTimer);
    addEventListener("keydown", setDelay);
}