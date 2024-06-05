var Cell;
(function (Cell) {
    Cell[Cell["Died"] = 0] = "Died";
    Cell[Cell["Alive"] = 1] = "Alive";
    Cell[Cell["Empty"] = 2] = "Empty";
    Cell[Cell["Food"] = 3] = "Food";
    Cell[Cell["Poison"] = 4] = "Poison";
})(Cell || (Cell = {}));

var heightInput = document.getElementById('heightW');
var widthInput = document.getElementById('widthW');
var startButton = document.getElementById("startW");
var randomButton = document.getElementById("randomW");
var clearButton = document.getElementById("clearW");
var gridContainer = document.getElementById("gridContainer");
var cellCount = document.getElementById("cellCountW");
var foodCount = document.getElementById("foodCountW");
var poisonCount = document.getElementById("poisonCountW");
var rows = 25;
var cols = 100;
var sizeHeight = rows * 10;
var sizeWidth = cols * 10;
var playing = false;
var grid;
var timer;
var reproductionTime = 100;

var cellEnergy = {}; // To store energy of each cell
var maxAge = 100; // Maximum age of cells
var initialEnergy = 50; // Initial energy of cells
var energyDecrement = 1; // Energy decrement per tick

function getCell(x, y) {
    return document.getElementById(x + "_" + y);
}

function createGrid() {
    var newGrid = new Array(rows);
    for (var i = 0; i < rows; i++) {
        newGrid[i] = new Array(cols);
        for (var j = 0; j < cols; j++) {
            newGrid[i][j] = Cell.Empty;
        }
    }
    return newGrid;
}

function initializeGrids() {
    grid = createGrid();
    cellEnergy = {};
}

function resetGrid() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = Cell.Empty;
        }
    }
    cellEnergy = {};
}

function initialize() {
    createTable();
    initializeGrids();
    resetGrid();
    setupControlButtons();
}

function createTable() {
    if (!gridContainer) {
        console.error("Problem: No div for the grid table!");
    }
    gridContainer.replaceChildren();
    var table = document.createElement("table");
    var width = sizeWidth / cols;
    var height = sizeHeight / rows;
    for (var i = 0; i < rows; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < cols; j++) {
            var cell = document.createElement("td");
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "empty");
            cell.style.width = width.toString() + "px";
            cell.style.height = height.toString() + "px";
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gridContainer.appendChild(table);
}

function cellClickHandler() {
    var rowcol = this.id.split("_");
    var row = parseInt(rowcol[0]);
    var col = parseInt(rowcol[1]);
    var classes = this.getAttribute("class");

    if (classes.indexOf("alive") > -1) {
        this.setAttribute("class", "died");
        grid[row][col] = Cell.Died;
    } else {
        this.setAttribute("class", "alive");
        grid[row][col] = Cell.Alive;
        cellEnergy[row + "_" + col] = initialEnergy; // Initialize energy for new cell
    }
}

function updateView() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var cell = getCell(i, j);
            if (cell === null) {
                console.log("No cell with this coordinates");
                return;
            }
            switch (grid[i][j]) {
                case Cell.Died:
                    cell.setAttribute("class", "died");
                    break;
                case Cell.Alive:
                    cell.setAttribute("class", "alive");
                    break;
                case Cell.Food:
                    cell.setAttribute("class", "food");
                    break;
                case Cell.Poison:
                    cell.setAttribute("class", "poison");
                    break;
                case Cell.Empty:
                default:
                    cell.setAttribute("class", "empty");
                    break;
            }
        }
    }
}

function setupControlButtons() {
    startButton.onclick = startButtonHandler;
    clearButton.onclick = clearButtonHandler;
    randomButton.onclick = randomButtonHandler;
    widthInput.onchange = resizeButtonHandler;
    heightInput.onchange = resizeButtonHandler;
    cellCount.onchange = validateInput;
    foodCount.onchange = validateInput;
    poisonCount.onchange = validateInput;
}

function randomButtonHandler() {
    if (playing) return;
    clearButtonHandler();

    let cellCountValue = parseInt(cellCount.value) || 0;
    let foodCountValue = parseInt(foodCount.value) || 0;
    let poisonCountValue = parseInt(poisonCount.value) || 0;

    if (cellCountValue + foodCountValue + poisonCountValue > rows * cols) {
        alert("Слишком много объектов для текущего размера поля!");
        return;
    }

    for (let i = 0; i < cellCountValue; i++) {
        placeRandom(Cell.Alive);
    }
    for (let i = 0; i < foodCountValue; i++) {
        placeRandom(Cell.Food);
    }
    for (let i = 0; i < poisonCountValue; i++) {
        placeRandom(Cell.Poison);
    }
    updateView();
}

function placeRandom(type) {
    let placed = false;
    while (!placed) {
        let i = Math.floor(Math.random() * rows);
        let j = Math.floor(Math.random() * cols);
        if (grid[i][j] === Cell.Empty) {
            grid[i][j] = type;
            if (type === Cell.Alive) {
                cellEnergy[i + "_" + j] = initialEnergy;
            }
            placed = true;
        }
    }
}

function clearButtonHandler() {
    console.log("Clear the game: stop playing, clear the grid");
    playing = false;
    startButton.innerHTML = "Старт";
    clearTimeout(timer);
    var cellsList = document.getElementsByClassName("alive");
    var cell;
    while (cell = cellsList.item(0)) {
        cell.setAttribute("class", "empty");
    }
    resetGrid();
    updateView();
}

function startButtonHandler() {
    if (playing) {
        console.log("Pause the game");
        playing = false;
        this.innerHTML = "Продолжить";
        clearTimeout(timer);
    } else {
        console.log("Continue the game");
        playing = true;
        this.innerHTML = "Пауза";
        play();
    }
}

function play() {
    computeNextGen();
    if (playing) {
        timer = setTimeout(play, reproductionTime);
    }
}

function computeNextGen() {
    var nextGrid = createGrid();
    var cellsToReproduce = [];

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (grid[i][j] === Cell.Alive) {
                let newI = i, newJ = j;
                switch (Math.floor(Math.random() * 4)) {
                    case 0: newI = (i > 0) ? i - 1 : i; break; // Up
                    case 1: newJ = (j < cols - 1) ? j + 1 : j; break; // Right
                    case 2: newI = (i < rows - 1) ? i + 1 : i; break; // Down
                    case 3: newJ = (j > 0) ? j - 1 : j; break; // Left
                }

                if (grid[newI][newJ] === Cell.Empty) {
                    nextGrid[newI][newJ] = Cell.Alive;
                    cellEnergy[newI + "_" + newJ] = cellEnergy[i + "_" + j] - energyDecrement;
                } else if (grid[newI][newJ] === Cell.Food) {
                    nextGrid[newI][newJ] = Cell.Alive;
                    cellEnergy[newI + "_" + newJ] = cellEnergy[i + "_" + j] + 10 - energyDecrement;
                } else if (grid[newI][newJ] === Cell.Poison) {
                    nextGrid[newI][newJ] = Cell.Alive;
                    cellEnergy[newI + "_" + newJ] = cellEnergy[i + "_" + j] - 10 - energyDecrement;
                } else {
                    nextGrid[i][j] = Cell.Alive;
                    cellEnergy[i + "_" + j] -= energyDecrement;

                    if (cellEnergy[i + "_" + j] > 50 && cellEnergy[newI + "_" + newJ] > 50) {
                        cellsToReproduce.push([i, j, newI, newJ]);
                    }
                }

                if (cellEnergy[i + "_" + j] <= 0 || cellEnergy[i + "_" + j] > maxAge) {
                    nextGrid[i][j] = Cell.Died;
                }
            } else if (grid[i][j] === Cell.Food) {
                nextGrid[i][j] = Cell.Food;
            } else if (grid[i][j] === Cell.Poison) {
                nextGrid[i][j] = Cell.Poison;
            }
        }
    }

    // Handle reproduction
    for (let coords of cellsToReproduce) {
        let [i, j, newI, newJ] = coords;
        let neighbors = getEmptyNeighbors(i, j, newI, newJ);
        if (neighbors.length > 0) {
            let [ni, nj] = neighbors[Math.floor(Math.random() * neighbors.length)];
            nextGrid[ni][nj] = Cell.Alive;
            cellEnergy[ni + "_" + nj] = initialEnergy;
        }
    }

    grid = nextGrid;
    updateView();
}

function getEmptyNeighbors(i, j, newI, newJ) {
    let neighbors = [];
    let positions = [
        [i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1], // Original cell's neighbors
        [newI - 1, newJ], [newI + 1, newJ], [newI, newJ - 1], [newI, newJ + 1] // New cell's neighbors
    ];

    for (let [ni, nj] of positions) {
        if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && grid[ni][nj] === Cell.Empty) {
            neighbors.push([ni, nj]);
        }
    }

    return neighbors;
}

function validateInput() {
    let inputValue = parseInt(this.value);
    let min = parseInt(this.min);
    let max = parseInt(this.max);

    if (isNaN(inputValue) || inputValue < min || inputValue > max) {
        alert(`Пожалуйста, введите значение от ${min} до ${max}.`);
        this.value = '';
    }
}

function resizeButtonHandler() {
    rows = parseInt(heightInput.value);
    cols = parseInt(widthInput.value);
    playing = false;
    startButton.innerText = "Старт";
    clearTimeout(timer);
    initializeGrids();
    createTable();
    resetGrid();
}

window.onload = initialize;
