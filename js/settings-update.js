"use strict"

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