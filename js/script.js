const grid = document.querySelector('.grid');
const pencilColorDom = document.querySelector('.color-input');
const canvasColorDom = document.querySelector('.canvas-input');
const pencilHueb = new Huebee(pencilColorDom, {});
const canvasHueb = new Huebee(canvasColorDom, {});
const inputRange = document.querySelector('.input-range');
const rangeValue = document.querySelector('.grid-size');

let pencilColor = pencilColorDom.value;
let canvasColor = canvasColorDom.value;

const mousedownDraw = (e) => e.target.style.backgroundColor = pencilColor;
const mouseoverDraw = (e) => e.buttons == 1 ? e.target.style.backgroundColor = pencilColor : null;

function createGrid(size) {
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