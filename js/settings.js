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
    setBackground();
    updateLSData(settingsKey, settings);
});

function setBackground() {
    const backgroundIndex = settings.background;
    const source = backgrounds[backgroundIndex];
    console.log(source);
    for (let i = 0; i < source.length; i++) {
        const currentSource = source[i];
        let myScript = document.createElement("script");
        myScript.setAttribute("src", currentSource);
        document.body.appendChild(myScript);
    }
}

const backgrounds = {
    0: ['https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js', './backgrounds/particles/particles.js'],
    1: [''],
    2: ['./backgrounds/balls/balls.js'],
    // 3: ['./img/colored-smoke.jpg']
};