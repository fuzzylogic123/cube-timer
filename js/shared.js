"use strict";

let sessionKey = 'yourBeefsYourMuttons';

//takes total miliseconds and returns a formatted string to display
function formatTime(totalMiliSec) {
    let dispMinutes = Math.floor(totalMiliSec / 60000);
    let dispSeconds = Math.floor((totalMiliSec % 60000) / 1000);
    let dispMiliSec = totalMiliSec % 1000;
    dispMiliSec = `00${dispMiliSec}`.substr(-3);
    if (dispMinutes > 0) {
        dispSeconds = `0${dispSeconds}`.substr(-2);
        return `${dispMinutes}:${dispSeconds}.${dispMiliSec}`;
    } else {
        return `${dispSeconds}.${dispMiliSec}`;
    }
}

/**
 * checkLSData function
 * Used to check if any data in LS exists at a specific key
 * @param {string} key LS Key to be used
 * @returns true or false representing if data exists at key in LS
 */
function checkLSData(key) {
    if (localStorage.getItem(key) != null) {
        return true;
    }
    return false;
}
/**
 * retrieveLSData function
 * Used to retrieve data from LS at a specific key. 
 * @param {string} key LS Key to be used
 * @returns data from LS in JS format
 */
function retrieveLSData(key) {
    let data = localStorage.getItem(key);
    try {
        data = JSON.parse(data);
    }
    catch (err) { }
    finally {
        return data;
    }
}
/**
 * updateLSData function
 * Used to store JS data in LS at a specific key
 * @param {string} key LS key to be used
 * @param {any} data data to be stored
 */
function updateLSData(key, data) {
    let json = JSON.stringify(data);
    localStorage.setItem(key, json);
}

class Solve {
    constructor(solveTime, scramble, penatly = '') {
        this._solveTime = solveTime;
        this._scramble = scramble
        this._date = new Date();
        this._penatly = penatly;
    }
    get date() {
        return this._date;
    }
    get time() {
        return this._solveTime;
    }
    get penatly() {
        return this._penatly;
    }
    get scramble() {
        return this._scramble;
    }
    set penatly(penatly) {
        this._penatly = penatly;
    }
    fromData(data) {
        this._date = new Date(data._date);
        this._solveTime = data._solveTime;
        this._scramble = data._scramble;
    }
}

class Session {
    constructor(sessionName, solveType, solveList=[]) {
        this._solveList = solveList;
        this._solveType = solveType;
        this._sessionName = sessionName;
        this._date = new Date;
    }
    get solveList() {
        return this._solveList;
    }
    get solveType() {
        return this._solveType;
    }
    get name() {
        return this._sessionName;
    }
    get date() {
        return this._date;
    }
    add(solve) {
        this._solveList.push(solve);
    }
    remove(i) {
        this._solveList.splice(i, 1);
    }
    getAverage(numberOfSolves) {
        if (this._solveList.length >= numberOfSolves) {
            //get the most recent n solves
            let chosenSolves = this._solveList.slice(-numberOfSolves);
            let chosenTimes = [];
            for (let i = 0; i < chosenSolves.length; i++) {
                chosenTimes.push(chosenSolves[i].time);
            }
            let min = Math.min(...chosenTimes);
            let max = Math.max(...chosenTimes);
            chosenTimes = chosenTimes.filter(e => e != min && e != max);
            let sum = 0;
            for (let i = 0; i < chosenTimes.length; i++) {
                sum += chosenTimes[i];
            }
            return formatTime(Math.round(sum / chosenTimes.length));
        } else {
            return '--';
        }
    }
    fromData(data) {
        this._solveList = [];
        let storedSolveList = data._solveList;
        for (let i = 0; i < storedSolveList.length; i++) {
            let solve = new Solve();
            solve.fromData(storedSolveList[i]);
            this._solveList.push(solve);
        }
        this._sessionName = data._sessionName;
        this._solveType = data._solveType;
    }
}

class SessionList {
    constructor(sessions=[], activeIndex=0) {
        this._sessionList = sessions;
        this._activeIndex = activeIndex;
    }
    get list() {
        return this._sessionList;
    }
    get active() {
        return this._activeIndex;
    }
    /**
     * @param {number} newActiveIndex
     */
    set active(newActiveIndex) {
        this._activeIndex = newActiveIndex;
    }
    add(session) {
        this._sessionList.push(session);
    }
    remove(i) {
        this._sessionList.splice(i, 1);
        this._activeIndex = i === 1 ? 0 : this._sessionList.length - 1;
    }
    fromData(data) {
        this._sessionList = [];
        let sessionList = data._sessionList;
        for (let i = 0; i < sessionList.length; i++) {
            const session = new Session();
            session.fromData(sessionList[i])
            this._sessionList.push(session);

        }
        this._activeIndex  = Number(data._activeIndex);
    }
}

let sessionList;
let data;

if (checkLSData(sessionKey)) {
    data = retrieveLSData(sessionKey);
    sessionList = new SessionList();
    sessionList.fromData(data);
} else {
    sessionList = new SessionList([new Session('Session 1', "3x3")]);
}