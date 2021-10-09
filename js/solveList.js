"use strict";

console.log(sessionList);
let activeIndex = sessionList.active;

function solveListHTML() {
  const tableContents = document.getElementById('table-contents');
  const session = sessionList.list[activeIndex];
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
      session.remove(id);
      updateLSData(sessionKey, sessionList);
      solveListHTML();
    });
  });
  const deleteAll = document.querySelector('.delete-all');
  deleteAll.addEventListener('click', () => {
    if (sessionList.list > 1) {
      sessionList.remove(activeIndex);
      sessionList = updateLSData(sessionKey, sessionList);
      activeIndex = sessionList.active
      session = sessionList.list[activeIndex];
      console.log(sessionList);
      solveListHTML();
    } else {
      console.log('session was not deleted, you only have one...')
    }
  });
  //add filter function to filters
  const filters = document.querySelectorAll('.filter')
  filters.forEach(element => {
    element.addEventListener('click', sortList);
  });
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
}

function sessionSelect(sessionList) {
  const listOfSessions = sessionList.list;
  const activeIndex = sessionList.active;
  const activeSession = listOfSessions[activeIndex];
  const buttonLabel = document.querySelector('#dropdownMenuButton1');
  const dropdown = document.querySelector('#session-options');
  console.log(activeSession);
  buttonLabel.innerHTML = activeSession.name;
  buttonLabel.id = activeSession.activeIndex;
  // const option = document.createElement('option');
  // option.innerHTML = session.name;
  // option.value = i;
  // dropdown.appendChild(option);
  console.log(sessionList.list);
  for (let i = 0; i < listOfSessions.length; i++) {
    const element = listOfSessions[i];
    dropdown.innerHTML += `<li id="${i}" class="dropdown-item">${element.name}</li>`;
  }
}

// document.querySelector('#add-session').addEventListener('click', ()=> {

// })

//initialise the list (newest first)
if (sessionList.list.length > 0) {
  console.log(sessionList);
  sessionList.list[activeIndex].solveList.sort((a, b) => b.date - a.date);
  solveListHTML();
  sessionSelect(sessionList);
}