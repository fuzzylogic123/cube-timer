"use strict";

class Solve {
    constructor(solveTime) {
        this._date = new Date;
        this._solveTime = solveTime;
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