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
    8: ['./img/owl.jpg'],
    9: ['img/sun?.jpg'],
    10: ['img/leaves.jpg'],
    11: ['img/poly.jpg'],
    12: ['img/hills.jpg'],
    13: ['img/ocean.jpg'],
    14: ['img/eggplant.jpg'],
    15: ['img/beach.jpg'],
    16: ['img/coffee.jpg'],
    17: ['img/sky.jpg'],
};

//when the user clicks to open the settings modal
settingsIcon.addEventListener('click', () => {
    const backgroundSelection = document.querySelector('#backgroundSelection');
    const manualEntry = document.querySelector('#entryManual');
    // const scrambleLenRef = document.querySelector('#scrambleLength');
    const backgroundColor = document.querySelector('#backgroundColor');
    const backgroundPreview = document.querySelector('#backgroundPreview');
    const textColor = document.querySelector('#textColor');
    const holdDownThresh = document.querySelector('#holdDownThresh');
    backgroundSelection.value = settings.background;
    holdDownThresh.value = (settings.holdDownThresh) / 1000;
    backgroundColor.value = settings.backgroundColor;
    textColor.value = settings.textColor;
    manualEntry.checked = settings.manualEntry;
    const sessionType = sessionList.list[sessionList.active].solveType;
    // scrambleLenRef.value = settings.scrambleLen[sessionType];
    if (backgroundSelection.value > 1) {
        document.querySelector('#colorPickerBackground').style.display = 'none';
    }
    if (backgroundSelection.value < 3) {
        backgroundPreview.style.display = 'none';
    } else {
        backgroundPreview.src = backgrounds[backgroundSelection.value];
        backgroundPreview.style.display = 'inline-block';
    }
});

//when the user saves their changes
saveChanges.addEventListener('click', () => {
    const backgroundSelection = document.querySelector('#backgroundSelection');
    const manualEntry = document.querySelector('#entryManual');
    // const scrambleLen = document.querySelector('#scrambleLength');
    const backgroundColor = document.querySelector('#backgroundColor');
    const textColor = document.querySelector('#textColor');
    const holdDownThresh = document.querySelector('#holdDownThresh');
    settings.background = backgroundSelection.value;
    settings.manualEntry = manualEntry.checked;
    // settings.setScrambleLen(sessionList.list[sessionList.active].solveType, Number(scrambleLen.value));
    settings.backgroundColor = backgroundColor.value;
    settings.holdDownThresh = (holdDownThresh.value) * 1000;
    settings.textColor = textColor.value;
    updateLSData(settingsKey, settings);
    window.location.reload();
});


const backgroundDropdown = document.querySelector('#backgroundSelection');

backgroundDropdown.addEventListener('change', (e) => {
    const backgroundPreview = document.querySelector('#backgroundPreview');
    //if the background is set to a picture, background color picker is invisible
    document.querySelector('#colorPickerBackground').style.display = e.target.value > 1 ? 'none' : '';
    if (backgroundSelection.value > 2) {
        backgroundPreview.style.display = 'inline-block'
        backgroundPreview.src = backgrounds[backgroundSelection.value]
    } else {
        backgroundPreview.style.display = 'none';
    };
})