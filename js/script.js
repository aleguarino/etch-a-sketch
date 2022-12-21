const grid = document.querySelector('.grid');
const pencilColorDom = document.querySelector('.color-input');
const canvasColorDom = document.querySelector('.canvas-input');
const pencilHueb = new Huebee(pencilColorDom, {});
const canvasHueb = new Huebee(canvasColorDom, {});
const inputRange = document.querySelector('.input-range');
const rangeValue = document.querySelector('.grid-size');
const btnRainbow = document.querySelector('.rainbow-btn');

let rainbow = false;
let pencilColor = pencilColorDom.value;
let canvasColor = canvasColorDom.value;

const mousedownDraw = (e) => {
    if (rainbow) {
        e.target.style.backgroundColor = `#${(Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, 0))}`;
    } else {
        e.target.style.backgroundColor = pencilColor;
    }
};
const mouseoverDraw = (e) => {
    if (rainbow && e.buttons == 1) {
        e.target.style.backgroundColor = `#${(Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, 0))}`;
    } else if (e.buttons == 1) {
        e.target.style.backgroundColor = pencilColor;
    }
}

function createGrid(size) {
    grid.style.backgroundColor = canvasColor;
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    let children = [];
    for (let i = 0; i < size * size; i++) {
        let div = document.createElement('div');
        div.classList.add(`bg-${pencilColor}`);
        div.addEventListener('mousedown', mousedownDraw);
        div.addEventListener('mouseover', mouseoverDraw);
        grid.appendChild(div).classList.add('box');
    }
}

function clearGrid() {
    grid.innerHTML = '';
    createGrid(inputRange.value);
}

function addListeners() {
    for (const box of grid.children) {
        box.addEventListener('mousedown', mousedownDraw);
        box.addEventListener('mouseover', mouseoverDraw);
    }
}

function rainbowMode() {
    rainbow = !rainbow;
    btnRainbow.classList.toggle('pressed-btn');
    addListeners();
}

pencilHueb.on('change', (c, hue, sat, lum) => {
    pencilColor = c;
    addListeners();
});

canvasHueb.on('change', (c) => {
    canvasColor = c;
    grid.style.backgroundColor = canvasColor;
});

inputRange.addEventListener('change', (e) => {
    console.log(e.target.value);
    clearGrid();
});

createGrid(inputRange.value);