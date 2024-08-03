const gameContainer = document.getElementById('background');
const cellSize = 51;
let rows = Math.floor(window.innerHeight / cellSize);
let cols = Math.floor(window.innerWidth / cellSize);

let grid = createRandomGrid(rows, cols);

function createRandomGrid(rows, cols) {
    let grid = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            gameContainer.appendChild(cell);
            row.push(Math.random() > 0.5 ? 1 : 0);
        }
        grid.push(row);
    }
    return grid;
}

function drawGrid(grid) {
    const cells = document.querySelectorAll('.cell');
    let index = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 1) {
                cells[index].classList.add('alive');
            } else {
                cells[index].classList.remove('alive');
            }
            index++;
        }
    }
}

function getNextGeneration(grid) {
    const nextGrid = grid.map(arr => [...arr]);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const neighbors = getAliveNeighbors(grid, i, j);
            if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
                nextGrid[i][j] = 0;
            } else if (grid[i][j] === 0 && neighbors === 3) {
                nextGrid[i][j] = 1;
            }
        }
    }
    return nextGrid;
}

function getAliveNeighbors(grid, x, y) {
    let aliveNeighbors = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const nx = x + i;
            const ny = y + j;
            if (nx >= 0 && nx < rows && ny >= 0 && ny < cols) {
                aliveNeighbors += grid[nx][ny];
            }
        }
    }
    return aliveNeighbors;
}

function update() {
    grid = getNextGeneration(grid);
    drawGrid(grid);
    setTimeout(update, 150); // Затримка між поколіннями в мілісекундах
}

drawGrid(grid);
update();

window.addEventListener('resize', () => {
    rows = Math.floor(window.innerHeight / cellSize);
    cols = Math.floor(window.innerWidth / cellSize);
    gameContainer.innerHTML = '';
    grid = createRandomGrid(rows, cols);
    drawGrid(grid);
});
