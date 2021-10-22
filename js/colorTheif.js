"use strict"

const colorThief = new ColorThief();
const img = document.querySelector('#backgroundPreview');

// Make sure image is finished loading
if (img.complete) {
    console.log(img);
    console.log('image was complete');
    colorThief.getColor(img);
} else {
    image.addEventListener('load', function() {
    colorThief.getColor(img);
    });
}

console.log(colorThief);