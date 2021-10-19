"use strict"

const submit = document.querySelector('#saveSettings');
const settingsIcon = document.querySelector('#settings');

settingsIcon.addEventListener('click', () => {
    const backgroundSelection = document.querySelector('#backgroundSelection');
    const manualEntry = document.querySelector('#entryManual');
    const scrambleLen = document.querySelector('#scrambleLength');
    backgroundSelection.value = settings.background;
    manualEntry.checked = settings.manualEntry;
    scrambleLen.value = settings.scrambleLen;
})

submit.addEventListener('click', () => {
    const backgroundSelection = document.querySelector('#backgroundSelection');
    const manualEntry = document.querySelector('#entryManual');
    const scrambleLen = document.querySelector('#scrambleLength');
    settings.background = backgroundSelection.value;
    settings.manualEntry = manualEntry.checked;
    settings.scrambleLen = Number(scrambleLen.value);
    updateLSData(settingsKey, settings);
});