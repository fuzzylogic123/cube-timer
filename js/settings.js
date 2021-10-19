"use strict"

const submit = document.querySelector('#saveSettings');
const settingsIcon = document.querySelector('#settings');

const backgrounds = {
    0: ['./backgrounds/particles/particles.js', './backgrounds/particles/particles.css'],
    1: [''],
    2: ['./backgrounds/balls/balls.js', './backgrounds/balls/balls.css'],
    // 3: ['./img/colored-smoke.jpg']
};

setBackground();

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
    window.location.reload();
});

function setBackground() {
    const backgroundIndex = settings.background;
    const source = backgrounds[backgroundIndex];
    console.log(source);
    const currentSource = source[0];
    const currentCSS = source[1];
    console.log(currentCSS);
    let myScript = document.createElement("script");
    myScript.setAttribute("src", currentSource);
    document.body.appendChild(myScript);
    document.head.innerHTML += `<link rel="stylesheet" href="${currentCSS}">`;
}