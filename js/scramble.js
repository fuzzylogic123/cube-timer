"use strict"

//generates scramble
const scrambleNotationList = {
    '2x2': [["R", "R'", "R2"], ["L", "L'", "L2"], ["F", "F'", "F2"], ["B", "B'", "B2"], ["U", "U'", "U2"], ["D", "D'", "D2"]],
    '3x3': [["R", "R'", "R2"], ["L", "L'", "L2"], ["F", "F'", "F2"], ["B", "B'", "B2"], ["U", "U'", "U2"], ["D", "D'", "D2"]],
    '4x4': [["R", "R'", "R2", "r", "Rw"], ["L", "L'", "L2", "l", "Lw"], ["F", "F'", "F2", "f", "Fw"], ["B", "B'", "B2", "b", "Bw"], ["U", "U'", "U2", "u", "Uw"], ["D", "D'", "D2", "d", "Dw"]],
    '5x5': [["R", "R'", "R2", "r", "Rw", "3Rw"], ["L", "L'", "L2", "l", "Lw", "3Lw"], ["F", "F'", "F2", "f", "Fw", "3Fw"], ["B", "B'", "B2", "b", "Bw", "3Bw"], ["U", "U'", "U2", "u", "Uw", "3Uw"], ["D", "D'", "D2", "d", "Dw", "3Dw"], ["M"], ["S"], ["E"]],
    '6x6': [["R", "R'", "R2", "r", "Rw", "3Rw"], ["L", "L'", "L2", "l", "Lw", "3Lw"], ["F", "F'", "F2", "f", "Fw", "3Fw"], ["B", "B'", "B2", "b", "Bw", "3Bw"], ["U", "U'", "U2", "u", "Uw", "3Uw"], ["D", "D'", "D2", "d", "Dw", "3Dw"]],
    '7x7': [["R", "R'", "R2", "r", "Rw", "3Rw"], ["L", "L'", "L2", "l", "Lw", "3Lw"], ["F", "F'", "F2", "f", "Fw", "3Fw"], ["B", "B'", "B2", "b", "Bw", "3Bw"], ["U", "U'", "U2", "u", "Uw", "3Uw"], ["D", "D'", "D2", "d", "Dw", "3Dw"]],
    'Skewb': [["U", "U'"], ["L", "L'"], ["B", "B'"], ["R", "R'"]],
    'Pyraminx': [["U", "U'"], ["L", "L'"], ["B", "B'"], ["R", "R'"]],
    '3BLD': [["R", "R'", "R2"], ["L", "L'", "L2"], ["F", "F'", "F2"], ["B", "B'", "B2"], ["U", "U'", "U2"], ["D", "D'", "D2"]],
}

const sessionType = sessionList.list[sessionList.active].solveType;
let scrambleLen = settings.scrambleLen[sessionType];
let scrambleNotation = scrambleNotationList[sessionList.list[sessionList.active].solveType];
let currentScramble = scrambleGen(scrambleNotation, scrambleLen);
scrambleToHTML(currentScramble);

function selectRandom(array) {
    return Math.floor(Math.random() * array.length);
}

//function to generate a new scramble
function scrambleGen(scrambleNotation, len = 25) {
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
    scrambleNotation.push(removed[0]);
    return scramble.join(' ');
}

//converts scramble array to HTML
function scrambleToHTML(scramble) {
    scramble = scramble.split(' ');
    const scrambleRef = document.getElementById('scramble');
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
