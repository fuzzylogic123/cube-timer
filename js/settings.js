"use strict"

const saveChanges = document.querySelector('#saveSettings');
const settingsIcon = document.querySelector('#settings');

const backgrounds = {
    0: ['./backgrounds/particles/particles.js', './backgrounds/particles/particles.css'],
    1: ['./backgrounds/balls/balls.js', './backgrounds/balls/balls.css'],
    2: ['', 'backgrounds/gradients/gradient.css'],
    3: ['./img/jellyfish.jpg'],
    4: ['./img/colored-smoke.jpg'],
    5: ['./img/cube1.jpg'],
    6: ['./img/fish.jpg'],
    7: ['./img/orangeSpirals.jpg'],
    8: ['./img/owl.jpg']
};

function initPreferences() {
    setBackground();
    document.body.style.backgroundColor = settings.backgroundColor;
}

//when the user clicks to open the settings modal
settingsIcon.addEventListener('click', () => {
    const backgroundSelection = document.querySelector('#backgroundSelection');
    const manualEntry = document.querySelector('#entryManual');
    const scrambleLenRef = document.querySelector('#scrambleLength');
    const backgroundColor = document.querySelector('#backgroundColor');
    backgroundSelection.value = settings.background;
    backgroundColor.value = settings.backgroundColor;
    manualEntry.checked = settings.manualEntry;
    scrambleLenRef.value = scrambleLen;
})

//when the user saves their changes
saveChanges.addEventListener('click', () => {
    const backgroundSelection = document.querySelector('#backgroundSelection');
    const manualEntry = document.querySelector('#entryManual');
    const scrambleLen = document.querySelector('#scrambleLength');
    const backgroundColor = document.querySelector('#backgroundColor');
    settings.background = backgroundSelection.value;
    settings.manualEntry = manualEntry.checked;
    settings.setScrambleLen(sessionList.list[sessionList.active].solveType, Number(scrambleLen.value));
    settings.backgroundColor = backgroundColor.value;
    updateLSData(settingsKey, settings);
    dnf.style.display = "none";
    plusTwo.style.display = "none";
    window.location.reload();
});

function setBackground() {
    const backgroundIndex = settings.background;
    if (backgroundIndex > 2) {
        const image = backgrounds[backgroundIndex];
        document.body.style.backgroundImage = `url(${image})`;
    } else {
        const source = backgrounds[backgroundIndex];
        const currentScript = source[0];
        const currentCSS = source[1];
        let myScript = document.createElement("script");
        myScript.setAttribute("src", currentScript);
        document.body.appendChild(myScript);
        document.head.innerHTML += `<link rel="stylesheet" href="${currentCSS}">`;
    }
}

initPreferences();

const backgroundDropdown = document.querySelector('#backgroundSelection');

backgroundDropdown.addEventListener('change', (e) => {
        //if the background is set to a picture, background color picker is invisible
        document.querySelector('#colorPicker').style.display = e.target.value > 1 ? 'none' : '';
})