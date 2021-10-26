"use strict"


let session = sessionList.list[activeIndex];

let solveTimes = [];
let labels = Array.from({ length: session.solveList.length }, (_, i) => i + 1);
for (let i = session.solveList.length - 1; i >= 0; i--) {
    const solveTime = session.solveList[i].time / 1000;
    solveTimes.push(solveTime);
}

const average = (array) => array.reduce((a, b) => a + b) / array.length;
const averageRef = document.querySelector('#average');

if (solveTimes.length > 0) {
    const averageTime = average(solveTimes);
    averageRef.innerHTML = (averageTime).toFixed(2);
} else {
    averageRef.innerHTML = 'N/A'
}

const solveNumRef = document.querySelector('#numberOfSolves').innerHTML = session.solveList.length;

//solve distibution
const INCREMENT_WIDTH = 10;

let min = Math.min(...solveTimes);
let max = Math.max(...solveTimes);

let distribution = [];
let j = 0;

let currentThreshold = Math.floor(min);
let solveCount = 0;
let distributionLabels = [];
while (solveCount < solveTimes.length) {
    distribution[j] = 0;
    for (let i = 0; i < solveTimes.length; i++) {
        const solveTime = solveTimes[i];
        if (solveTime > currentThreshold && solveTime < currentThreshold + 1) {
            distribution[j] += 1;
            solveCount += 1;
        }
    }
    currentThreshold += 1;
    distributionLabels.push(currentThreshold);
    j++;
}