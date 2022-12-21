const grid = document.querySelector('.grid');
const colorPalette = document.querySelector('.color-input');
const hueb = new Huebee(colorPalette, {});
const inputRange = document.querySelector('.input-range');
const rangeValue = document.querySelector('.grid-size');

let color = colorPalette.value;

const mousedownDraw = (e) => e.target.style.backgroundColor = color;
const mouseoverDraw = (e) => e.buttons == 1 ? e.target.style.backgroundColor = color : null;

function createGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    let children = [];
    for (let i = 0; i < size * size; i++) {
        let div = document.createElement('div');
        div.classList.add(`bg-${color}`);
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


hueb.on('change', (c, hue, sat, lum) => {
    color = c;
    addListeners();
});

inputRange.addEventListener('change', (e) => {
    console.log(e.target.value);
    clearGrid();
});

createGrid(inputRange.value);