"use strict"

let labels;
let solveTimes;
let distributionLabels;
let distribution;

function initDropdownGraphs() {
    const listOfSessions = sessionList.list;
    activeIndex = sessionList.active;
    const dropdown = document.querySelector('#dropdown-graphs');
    dropdown.innerHTML = '';
    updateLSData(sessionKey, sessionList);
    for (let i = 0; i < listOfSessions.length; i++) {
        const session = listOfSessions[i];
        let selected = i === activeIndex;
        const option = new Option(`${session.name} - ${session.solveType}`, i, false, selected);
        dropdown.appendChild(option);
    }
    dropdown.addEventListener('change', (e) => { 
        activeIndex = Number(e.target.value);
        sessionList.active = activeIndex;
        calcStats();
        updateGraphs(solveTimes, distribution, distributionLabels, labels);
        updateLSData(sessionKey, sessionList);
    });
}


initDropdownGraphs();
calcStats();

function calcStats() {
    let session = sessionList.list[activeIndex];
    solveTimes = [];
    for (let i = session.solveList.length - 1; i >= 0; i--) {
        const solveTime = session.solveList[i].time / 1000;
        if (!session.solveList[i].penalty) {
            solveTimes.push(solveTime);
        }
    }
    labels = Array.from({ length: solveTimes.length }, (_, i) => i + 1);

    const average = (array) => array.reduce((a, b) => a + b) / array.length;
    const averageRef = document.querySelector('#average');

    let averageTime;
    if (solveTimes.length > 0) {
        averageTime = average(solveTimes);
        averageRef.innerHTML = (averageTime).toFixed(2);
    } else {
        averageRef.innerHTML = 'N/A'
    }

    const solveNumRef = document.querySelector('#numberOfSolves').innerHTML = session.solveList.length;

    //solve distibution
    const INCREMENT_WIDTH = 10;

    let min = Math.min(...solveTimes);
    let max = Math.max(...solveTimes);

    distribution = [];
    let j = 0;

    let currentThreshold = Math.floor(min);
    let solveCount = 0;
    distributionLabels = [];
    while (solveCount < solveTimes.length) {
        distribution[j] = 0;
        for (let i = 0; i < solveTimes.length; i++) {
            const solveTime = solveTimes[i];
            if (solveTime >= currentThreshold && solveTime < currentThreshold + 1) {
                distribution[j] += 1;
                solveCount += 1;
            }
        }
        currentThreshold += 1;
        distributionLabels.push(`${currentThreshold - 1} - ${currentThreshold}`);
        j++;
    }

    //normal  distribution

    function ncdf(x, mean, std) {
        var x = (x - mean) / std
        var t = 1 / (1 + .2315419 * Math.abs(x))
        var d = .3989423 * Math.exp(-x * x / 2)
        var prob = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
        if (x > 0) prob = 1 - prob
        return prob
    }

    function getStandardDeviation(array) {
        const n = array.length
        const mean = array.reduce((a, b) => a + b) / n
        return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    }


    const timeInput = document.querySelector('#userTime');
    timeInput.addEventListener('change', () => {
        const sd = getStandardDeviation(solveTimes);
        console.log('standard deviation:', sd);
        const chanceRef = document.querySelector('#chance');
        chanceRef.innerHTML = (ncdf(timeInput.value, averageTime, sd) * 100).toFixed(2) + '%';
    });

}
