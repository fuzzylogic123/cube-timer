"use strict";

console.log(sessionList);
const session = sessionList.active;
console.log(session);

function solveListHTML() {
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
        <td>
        <button type="button" class=" delete remove btn" id="${i}">
        <i class="x bi bi-x-lg"></i>
        </button>
        </td>
      </tr>`
    }
  } else {
    //display dashes to show the table is empty
    tableContents.innerHTML = '<tr><td>-</td><td>-</td><td>-</td><td> </td></tr>'
  }
  //add delete solve to each delete button
  const deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach(element => {
    element.addEventListener('click', (e) => {
      const id = e.target.id;
      console.log(id);
      session.remove(id);
      updateLSData(sessionKey, sessionList);
      solveListHTML();
    });
    const deleteAll = document.querySelector('.delete-all');
    deleteAll.addEventListener('click', () => {
      console.log('remember to implement sessions')
    });
    //add filter function to filters
    const filters = document.querySelectorAll('.filter')
    filters.forEach(element => {
      element.addEventListener('click', sortList);
    });
  });
}

function sortList(e) {
  document.querySelectorAll('.filter').forEach(e => {
    if (e.classList.contains("filter-active")) {
      e.classList.remove("filter-active");
    }
  });
  let filter = e.target.id;
  const filterRef = document.getElementById(filter);
  switch (filter) {
    case 'slowest':
      filterRef.classList.add('filter-active');
      session.solveList.sort((a, b) => b.time - a.time);
      break;
    case 'fastest':
      filterRef.classList.add('filter-active');
      session.solveList.sort((a, b) => a.time - b.time);
      break;
    case 'oldest':
      filterRef.classList.add('filter-active');
      session.solveList.sort((a, b) => a.date - b.date);
      break;
    case 'newest':
      filterRef.classList.add('filter-active');
      session.solveList.sort((a, b) => b.date - a.date);
  }

  solveListHTML();
}

function sessionSelect(sessionList) {
  sessionList = sessionList.list;
  for (let i = 0; i < sessionList.length; i++) {
    const session = sessionList[i];
    const option = document.createElement('option');
    option.innerHTML = session.name;
    option.value = i;
    const dropdown = document.querySelector('#session-select');
    dropdown.appendChild(option);
  }
}

//initialise the list (newest first)
session.solveList.sort((a, b) => b.date - a.date);
console.log(session);
solveListHTML();
console.log('hi')
sessionSelect(sessionList);