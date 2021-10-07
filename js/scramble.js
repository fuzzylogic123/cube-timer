"use strict"

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
    scrambleNotation.push(removed[0]);
    return scramble.join(' ');
}

//converts scramble array to HTML
function scrambleToHTML(scramble) {
    scramble = scramble.split(' ');
    console.log(scramble);
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
