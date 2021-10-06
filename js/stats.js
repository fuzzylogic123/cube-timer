"use strict";

function solveListHTML(session) {
    const list = document.getElementById('solve-list')
    for (let i = 0; i < session.solveList.length; i++) {
        const solve = session.solveList[i];
        document.getElementById('table-contents').innerHTML += `
        <tr>
        <td>${formatTime(solve.time)}</td>
        <td>${solve.scramble}</td>
        <td>${solve.date.toLocaleDateString("en-AU")}</td>
      </tr>`
    }
}

solveListHTML(session);