"use strict";

function solveListHTML(session) {
  const tableContents = document.getElementById('table-contents');
  if (session.solveList.length !== 0) {
    tableContents.innerHTML = '';
    for (let i = 0; i < session.solveList.length; i++) {
      const solve = session.solveList[i];
      tableContents.innerHTML += `
        <tr>
        <td class="list-items">${formatTime(solve.time)}</td>
        <td class="list-items">${solve.scramble}</td>
        <td class="list-items">${solve.date.toLocaleDateString("en-AU")}</td>
        <td><button type="button" class="remove btn"><i class="x bi bi-x-lg"></i></button></td>
      </tr>`
    }
  }
}

solveListHTML(session);