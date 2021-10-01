"use strict";

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
    constructor(solveTime) {
        this._time = solveTime;
        this._date = new Date;
    }
    get date() {
        return this._date;
    }
    get solveTime() {
        return this._solveTime;
    }
}

class Session {
    constructor(sessionName, solveList, solveType) {
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
    get sessionName() {
        return this._sessionName;
    }
    get date() {
        return this._date;
    }
    addSolve(solve) {
        this._solveList.push(solve);
    }
}

let sessionList = [];

let session = new Session('Session 1', [], "3x3");