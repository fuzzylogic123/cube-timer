import { randomScrambleForEvent } from "https://cdn.cubing.net/js/cubing/scramble";


function scrambleToHTML(scramble) {
    scramble = scramble.split(' ');
    const scrambleRef = document.getElementById('scramble');
    scrambleRef.innerHTML = '';
    let h2 = document.createElement("h2");
    scrambleRef.appendChild(h2);
    for (let i = 0; i < scramble.length; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add('scrambleLetter');
        newDiv.innerHTML = scramble[i];
        h2.appendChild(newDiv);
    }
}

const getScramble = async type => {
    switch (type) {
        case "3x3":
            type = "333";
            break;
        case "2x2":
            type = "222";
            break;
        case "4x4":
            type = "444";
            break;
        case "5x5":
            type = "555";
            break;
        case "6x6":
            type = "666";
            break;
        case "7x7":
            type = "777";
            break;
        case "3BLD":
            type = "333bf";
            break;
        case "Megaminx":
            type = "minx";
            break;
    
        default:
            break;
    }
    const scramble = await randomScrambleForEvent(type);
    let scrambleString = scramble.toString();
    scrambleToHTML(scrambleString);
    return scrambleString;
}

export default getScramble;