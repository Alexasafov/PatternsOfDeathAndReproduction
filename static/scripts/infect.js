var Cell;
(function (Cell) {
    Cell[Cell["Common"] = 0] = "Common";
    Cell[Cell["Infect"] = 1] = "Infect";
    Cell[Cell["Intractable"] = 2] = "Intractable";
})(Cell || (Cell = {}));
var nInput = document.getElementById('n');
var gridContainer = document.getElementById('gridContainer');
var startButton = document.getElementById('start');
var clearButton = document.getElementById('clear');
var rows = nInput;
var cols = nInput;
// cell size = 10x10
var sizeHeight = rows * 10;
var sizeWidth = cols * 10;
var playing = false;
var grid;
var timer;
var reproductionTime = 100;
var cellHistory = [];

function getCell(x, y) {
    return document.getElementById(x + "_" + y);
}

function createGrid() {
    var newGrid = new Array(rows);
    for (var i = 0; i < rows; i++) {
        newGrid[i] = new Array(cols);
        for (var j = 0; j < cols; j++) {
            newGrid[i][j] = Cell.Common;
            if(i == (nInput/2+0.5) &&  j == (nInput/2+0.5)){
                newGrid[i][j] = Cell.Infect;
            }
        }
    }
    return newGrid;
}


function initializeGrids() {
    grid = createGrid();
}

function resetGrid() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = Cell.Common;
            if(i == (nInput/2+0.5) &&  j == (nInput/2+0.5)){
                grid[i][j] = Cell.Infect;
            }
        }
    }
}
// Initialize
function initialize() {
    createTable();
    initializeGrids();
    resetGrid();
    setupControlButtons();
}
// Lay out the board
function createTable() {
    if (!gridContainer) {
        // Throw error
        console.error("Problem: No div for the drid table!");
    }
    gridContainer.replaceChildren();
    var table = document.createElement("table");
    var width = sizeWidth / cols;
    var height = sizeHeight / rows;
    for (var i = 0; i < rows; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < cols; j++) { //
            var cell = document.createElement("td");
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "common");
            cell.style.nInput = nInput.toString() + "px";
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gridContainer.appendChild(table);
}

function updateView() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var cell = getCell(i, j);
            if (cell === null) {
                console.log("No cell with these coordinates");
                return;
            }

            // Добавляем текущее состояние клетки в историю
            if (!cellHistory[i]) {
                cellHistory[i] = [];
            }
            cellHistory[i][j] = grid[i][j];

            // Проверяем, чтобы история состояний клетки не превышала 6 последних тиков
            if (cellHistory[i].length > 6) {
                cellHistory[i].shift(); // Удаляем самое старое состояние
            }

            // Обновляем класс клетки на основе последнего состояния из истории
            var lastState = cellHistory[i][j];
            if (lastState == Cell.Common) {
                cell.setAttribute("class", "common");
            } else if (lastState == Cell.Infect) {
                cell.setAttribute("class", "infect");
            } else {
                cell.setAttribute("class", "intractable");
            }
        }
    }
}

function setupControlButtons() {
    startButton.onclick = startButtonHandler;
    clearButton.onclick = clearButtonHandler;
    nInput.onchange = resizeButtonHandler;
}

// clear the grid
function clearButtonHandler() {
    console.log("Clear the game: stop playing, clear the grid");
    playing = false;
    startButton.innerHTML = "Старт";
    clearTimeout(timer);
    var cellsList = document.getElementsByClassName("infect");
    var cell;
    while (cell = cellsList.item(0)) {
        cell.setAttribute("class", "common");
    }
    resetGrid();
}

// start/pause/continue the game
function startButtonHandler() {
    if (playing) {
        console.log("Pause the game");
        playing = false;
        this.innerHTML = "Продожить";
        clearTimeout(timer);
    }
    else {
        console.log("Continue the game");
        playing = true;
        this.innerHTML = "Пауза";
        play();
    }
}

// run the life game
function play() {
    computeNextGen();
    if (playing) {
        timer = setTimeout(play, reproductionTime);
    }
}

function computeNextGen() {
    var nextGrid = createGrid();
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            applyRules(nextGrid, i, j);
        }
    }
    // copy nextGrid to grid
    grid = nextGrid;
    // copy all 1 values to "live" in the table
    updateView();
}
// RULES
// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
function applyRules(nextGrid, row, col) {
    if (row - 1 >= 0) {
        if (grid[row - 1][col] == Cell.Infect && Math.random() < 0.5)
            nextGrid[row][col] = Cell.Infect;
    }
    if (row - 1 >= 0 && col - 1 >= 0) {
        if (grid[row - 1][col - 1] == Cell.Live && Math.random() < 0.5)
            nextGrid[row][col] = Cell.Infect;
    }
    if (row - 1 >= 0 && col + 1 < cols) {
        if (grid[row - 1][col + 1] == Cell.Live && Math.random() < 0.5)
            nextGrid[row][col] = Cell.Infect;
    }
    if (col - 1 >= 0) {
        if (grid[row][col - 1] == Cell.Live && Math.random() < 0.5)
            nextGrid[row][col] = Cell.Infect;
    }
    if (col + 1 < cols) {
        if (grid[row][col + 1] == Cell.Live && Math.random() < 0.5)
            nextGrid[row][col] = Cell.Infect;
    }
    if (row + 1 < rows) {
        if (grid[row + 1][col] == Cell.Live && Math.random() < 0.5)
            nextGrid[row][col] = Cell.Infect;
    }
    if (row + 1 < rows && col - 1 >= 0) {
        if (grid[row + 1][col - 1] == Cell.Live && Math.random() < 0.5)
            nextGrid[row][col] = Cell.Infect;
    }
    if (row + 1 < rows && col + 1 < cols) {
        if (grid[row + 1][col + 1] == Cell.Live && Math.random() < 0.5)
            nextGrid[row][col] = Cell.Infect;
    }
}

function resizeButtonHandler() {
    n = parseInt(nInput.value);
    playing = false;
    startButton.innerText = "Старт";
    clearTimeout(timer);
    initializeGrids();
    createTable();
    resetGrid();
}
// Start everything
window.onload = initialize;
