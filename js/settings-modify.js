"use strict"

const saveChanges = document.querySelector('#saveSettings');
const settingsIcon = document.querySelector('#settings');

//when the user clicks to open the settings modal
settingsIcon.addEventListener('click', () => {
    const backgroundSelection = document.querySelector('#backgroundSelection');
    console.log(backgroundSelection.value);
    const manualEntry = document.querySelector('#entryManual');
    const scrambleLenRef = document.querySelector('#scrambleLength');
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
    scrambleLenRef.value = settings.scrambleLen[sessionType];
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
    const scrambleLen = document.querySelector('#scrambleLength');
    const backgroundColor = document.querySelector('#backgroundColor');
    const textColor = document.querySelector('#textColor');
    const holdDownThresh = document.querySelector('#holdDownThresh');
    settings.background = backgroundSelection.value;
    settings.manualEntry = manualEntry.checked;
    settings.setScrambleLen(sessionList.list[sessionList.active].solveType, Number(scrambleLen.value));
    settings.backgroundColor = backgroundColor.value;
    settings.holdDownThresh = (holdDownThresh.value) * 1000;
    settings.textColor = textColor.value;
    updateLSData(settingsKey, settings);
    dnf.style.display = "none";
    plusTwo.style.display = "none";
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