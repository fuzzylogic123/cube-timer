"use strict";

let activeIndex = sessionList.active;

const solveListToggle = document.querySelector('#solveListToggle');
const graphToggle = document.querySelector('#graphContentToggle');
const solveListIcon = document.querySelector('#solveListIcon');
const graphIcon = document.querySelector('#graphIcon');
graphToggle.addEventListener('click', ()=> {
  const solveList = document.querySelector('.solveList');
  solveList.style.display = 'none';
  const stats = document.querySelector('#graphsContent');
  stats.style.display = 'block';
  graphToggle.classList.add('bg-secondary');
  solveListToggle.classList.remove('bg-secondary');
  solveListIcon.classList.remove('text-light');
  solveListIcon.classList.add('text-dark');
  graphIcon.classList.remove('text-dark');
  graphIcon.classList.add('text-light');
  initDropdownGraphs();
  calcStats();
  updateGraphs(solveTimes, distribution, distributionLabels, labels);
})

solveListToggle.addEventListener('click', ()=> {
  const solveList = document.querySelector('.solveList');
  solveList.style.display = 'block';
  const stats = document.querySelector('#graphsContent');
  stats.style.display = 'none';
  solveListToggle.classList.add('bg-secondary');
  graphToggle.classList.remove('bg-secondary');
  graphIcon.classList.remove('text-light');
  graphIcon.classList.add('text-dark');
  solveListIcon.classList.remove('text-dark');
  solveListIcon.classList.add('text-light');
  initDropdown();
})

function solveListHTML() {
  const tableContents = document.getElementById('table-contents');
  const session = sessionList.list[activeIndex];
  if (session.solveList.length !== 0) {
    tableContents.innerHTML = '';
    for (let i = 0; i < session.solveList.length; i++) {
      const solve = session.solveList[i];
      tableContents.innerHTML += `
        <tr>
        <td class="list-items">${solve.toString()}</td>
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
}

function sortList(e) {
  const session = sessionList.list[activeIndex];
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

function initDropdown() {
  const listOfSessions = sessionList.list;
  activeIndex = sessionList.active;
  const dropdown = document.querySelector('#dropdown');
  dropdown.innerHTML = '';
  updateLSData(sessionKey, sessionList);
  for (let i = 0; i < listOfSessions.length; i++) {
    const session = listOfSessions[i];
    let selected = i === activeIndex;
    const option = new Option(`${session.name} - ${session.solveType}`, i, false, selected);
    dropdown.appendChild(option);
  }
  dropdown.addEventListener('change', (e) => {
    activeIndex = Number(e.target.value);
    sessionList.active = activeIndex;
    solveListHTML();
    updateLSData(sessionKey, sessionList);
  });
}

function addSession() {
  const sessionName = document.querySelector('#floatingInput');
  const solveType = document.querySelector('#solve-type');
  const session = new Session(sessionName.value, solveType.value);
  sessionList.add(session);
  activeIndex = sessionList.list.length - 1;
  sessionList.active = activeIndex;
  initDropdown();
  solveListHTML();
  sessionName.value = '';
  solveType.selectedIndex = null;
}

function editSession() {
  const sessionName = document.querySelector('#edit-input');
  const solveTypeInput = document.querySelector('#edit-solve-type');
  const activeIndex = sessionList.active;
  const activeSession = sessionList.list[activeIndex]
  activeSession.solveType = solveTypeInput.value;
  activeSession.name = sessionName.value;
  initDropdown();
  sessionName.value = '';
  solveTypeInput.selectedIndex = null;
}

// document.querySelector('#add-session').addEventListener('click', ()=> {

// })


const deleteAll = document.querySelector('#clear-session');
deleteAll.addEventListener('click', () => {
  if (sessionList.list.length > 1) {
    sessionList.remove(activeIndex);
    activeIndex = sessionList.active
    const session = sessionList.list[activeIndex];
    initDropdown();
    solveListHTML();
  } else {
    const len = sessionList.list[activeIndex].solveList.length;
    for (let i = 0; i < len; i++) {
      const session = sessionList.list[activeIndex];
      session.remove(0);
    }
    updateLSData(sessionKey, sessionList);
    solveListHTML();
  }
});
//add filter function to filters
const filters = document.querySelectorAll('.filter')
filters.forEach(element => {
  element.addEventListener('click', sortList);
});

//initialise the list (newest first)
if (sessionList.list.length > 0) {
  sessionList.list[activeIndex].solveList.sort((a, b) => b.date - a.date);
  solveListHTML();
  initDropdown();
}

const addSessionButton = document.querySelector('#confirm-new-session');
addSessionButton.addEventListener('click', addSession);

const confirmEditButton = document.querySelector('#confirm-edit-session');
confirmEditButton.addEventListener('click', editSession);

const editSessionButton = document.querySelector('#edit-session');
editSessionButton.addEventListener('click', () => {
  const sessionName = document.querySelector('#edit-input');
  const solveTypeInput = document.querySelector('#edit-solve-type');
  const activeIndex = sessionList.active;
  const activeSession = sessionList.list[activeIndex]
  solveTypeInput.value = activeSession.solveType;
  sessionName.value = activeSession.name;
})