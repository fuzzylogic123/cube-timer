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
        <td><button type="button" class="remove btn"><i class="x bi bi-x-lg"></i></button></td>
      </tr>`
    }
}

solveListHTML(session);