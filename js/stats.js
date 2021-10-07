"use strict";

function solveListHTML(session) {
  const tableContents = document.getElementById('table-contents');
  if (session.solveList.length === 0) {
    tableContents.innerHTML = "<tr><td>-</td><td>-</td><td>-</td></tr>"
  }
    for (let i = 0; i < session.solveList.length; i++) {
        const solve = session.solveList[i];
        tableContents.innerHTML += `
        <tr>
        <td>${formatTime(solve.time)}</td>
        <td>${solve.scramble}</td>
        <td>${solve.date.toLocaleDateString("en-AU")}</td>
        <td><button type="button" class="remove btn"><i class="x bi bi-x-lg"></i></button></td>
      </tr>`
    }
}

solveListHTML(session);