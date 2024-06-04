var Cell;
(function (Cell) {
    Cell[Cell["Common"] = 0] = "Common";
    Cell[Cell["Infect"] = 1] = "Infect";
    Cell[Cell["Intractable"] = 2] = "Intractable";
})(Cell || (Cell = {}));
var heightInput = document.getElementById('n');
var widthInput = document.getElementById('n');
var gridContainer = document.getElementById('gridContainer');
var startButton = document.getElementById('start');
var clearButton = document.getElementById('clear');
var rows = 39;
var cols = 39;
// cell size = 10x10
var sizeHeight = rows * 10;
var sizeWidth = cols * 10;
var playing = false;
var grid;
var timer;
var reproductionTime = 100;
var cellStates = {};

function getCell(x, y) {
    return document.getElementById(x + "_" + y);
}
function createGrid() {
    var newGrid = new Array(rows);
    for (var i = 0; i < rows; i++) {
        newGrid[i] = new Array(cols);
        for (var j = 0; j < cols; j++) {
            var c = getCell(i, j);
            console.log(cellStates.length-4);
            if (cellStates.length-4 == "infect"){
                newGrid[i][j] = Cell.Infect;
            } else if(cellStates.length-4 == "intractable"){
                newGrid[i][j] = Cell.Intractable;
            }
            newGrid[i][j] = Cell.Common;
        }
    }
    console.log("create grid");
    return newGrid;
}
function initializeGrids() {
    grid = createGrid();
    console.log("init grid");
}
function resetGrid() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if(i === Math.floor(rows / 2) && j === Math.floor(cols / 2)){
                grid[i][j] = Cell.Infect;
                console.log("reset grid infect");
            }else{
                grid[i][j] = Cell.Common;
                console.log("reset grid common");
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
            if(i === Math.floor(rows / 2) && j === Math.floor(cols / 2)){
                console.log("central cell");
                var cell = document.createElement("td");
                cell.setAttribute("id", i + "_" + j);
                cell.setAttribute("class", "infect");
                cell.style.width = width.toString() + "px";
                cell.style.height = height.toString() + "px";
                tr.appendChild(cell);
            } else{
                console.log("cell");
                var cell = document.createElement("td");
                cell.setAttribute("id", i + "_" + j);
                cell.setAttribute("class", "common");
                cell.style.width = width.toString() + "px";
                cell.style.height = height.toString() + "px";
                tr.appendChild(cell);
            }
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
                console.log("No cell with this coordinates");
                return;
            }
            if (grid[i][j] == Cell.Common) {
                cell.setAttribute("class", "common");
            }
            else if(grid[i][j] == Cell.Infect){
                cell.setAttribute("class", "infect");
            } else{
                cell.setAttribute("class", "intractable");
            }
        }
    }
}
function setupControlButtons() {
    startButton.onclick = startButtonHandler;
    clearButton.onclick = clearButtonHandler;
    widthInput.onchange = resizeButtonHandler;
    heightInput.onchange = resizeButtonHandler;
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
function applyRules(nextGrid, row, col) {
    if (row - 1 >= 0) {
        if (grid[row - 1][col] == Cell.Infect && Math.random() < 0.5)
            nextGrid[row][col] = Cell.Infect;
            var c = getCell(row, col);
            updateCellState(c, "infect");
    }
    if (row - 1 >= 0 && col - 1 >= 0) {
        if (grid[row - 1][col - 1] == Cell.Infect && Math.random() < 0.5)
            nextGrid[row][col] = Cell.Infect;
            var c = getCell(row, col);
            updateCellState(c, "infect");
    }
    if (row - 1 >= 0 && col + 1 < cols) {
        if (grid[row - 1][col + 1] == Cell.Infect && Math.random() < 0.5)
            nextGrid[row][col] = Cell.Infect;
            var c = getCell(row, col);
            updateCellState(c, "infect");
    }
    if (col - 1 >= 0) {
        if (grid[row][col - 1] == Cell.Infect && Math.random() < 0.5)
            nextGrid[row][col] = Cell.Infect;
            var c = getCell(row, col);
            updateCellState(c, "infect");
    }
    if (col + 1 < cols) {
        if (grid[row][col + 1] == Cell.Infect && Math.random() < 0.5)
            nextGrid[row][col] = Cell.Infect;
            var c = getCell(row, col);
            updateCellState(c, "infect");
    }
    if (row + 1 < rows) {
        if (grid[row + 1][col] == Cell.Infect && Math.random() < 0.5)
            nextGrid[row][col] = Cell.Infect;
            var c = getCell(row, col);
            updateCellState(c, "infect");
    }
    if (row + 1 < rows && col - 1 >= 0) {
        if (grid[row + 1][col - 1] == Cell.Infect && Math.random() < 0.5)
            nextGrid[row][col] = Cell.Infect;
            var c = getCell(row, col);
            updateCellState(c, "infect");
    }
    if (row + 1 < rows && col + 1 < cols) {
        if (grid[row + 1][col + 1] == Cell.Infect && Math.random() < 0.5)
            nextGrid[row][col] = Cell.Infect;
            var c = getCell(row, col);
            updateCellState(c, "infect");
    }
}

function updateCellState(cellId, newState) {
    if (!cellStates[cellId]) {
      cellStates[cellId] = []; // Создаем массив состояний для новой клетки, если его еще нет
    }
    
    cellStates[cellId].push(newState);
    
    if (cellStates[cellId].length > 10) {
      cellStates[cellId].shift(); // Удаляем первый элемент, если количество состояний превышает 10
    }
  
    if (checkIntractable(cellStates[cellId])) {
      // Если последние 6 состояний клетки были "infected", заменяем статус на "Intractable" на ближайшие 4 состояния
      console.log("Cell", cellId, "has become Intractable for the next 4 states");
      
      // Заменяем статус клетки на "Intractable" для следующих 4 состояний
      for (let i = 0; i < 4; i++) {
        cellStates[cellId][6 + i] = "intractable";
      }
    }
  }
  
  function checkIntractable(states) {
    for (let i = 0; i < states.length - 4; i++) {
      let isInfected = true;
      for (let j = i; j < i + 6; j++) {
        if (states[i + "_" + j] !== "infected") {
          isInfected = false;
          break;
        }
      }
      if (isInfected) {
        return true;
      }
    }
    return false;
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
// Start everything
window.onload = initialize;
