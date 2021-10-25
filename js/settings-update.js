"use strict"

function initPreferences() {
    setBackground();
    document.body.style.backgroundColor = settings.backgroundColor;
    // dnf.style.display = "none";
    // plusTwo.style.display = "none";
}


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


//global code
initPreferences()