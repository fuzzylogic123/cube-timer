"use strict";

console.log(session);
console.log(session.solveList);
function solveListHTML(session) {
    const list = document.getElementById('solve-list')
    for (let i = 0; i < session.solveList.length; i++) {
        const solve = session.solveList[i].time;
        const listItem = document.createElement("li");
        listItem.classList.add('list-group-item');
        listItem.innerHTML = formatTime(solve);
        list.appendChild(listItem);
    }
}

solveListHTML(session);