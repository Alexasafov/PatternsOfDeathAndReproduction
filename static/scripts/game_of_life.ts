enum Cell {
    Died = 0,
    Live = 1
  }

var heightInput = document.getElementById('height')! as HTMLInputElement;
var widthInput = document.getElementById('width')! as HTMLInputElement;
var gridContainer = document.getElementById('gridContainer')!;
var startButton = document.getElementById('start')!;
var clearButton = document.getElementById('clear')!;
var randomButton = document.getElementById("random")!;
var snapshotNameInput = document.getElementById('snapshot')! as HTMLInputElement;
var selectSnapshot = document.getElementById('getSnapshot')! as HTMLSelectElement;

var rows = 38;
var cols = 100;

// cell size = 10x10
var sizeHeight = rows * 10;
var sizeWidth = cols * 10;

var playing = false;

var grid: Cell[][];

var timer;
var reproductionTime = 100;

function getCell(x, y) {
    return document.getElementById(x + "_" + y);
}

function createGrid(): Cell[][] {
    var newGrid = new Array(rows);
    for (var i = 0; i < rows; i++) {
        newGrid[i] = new Array(cols);
        for (var j = 0; j < cols; j++) {
            newGrid[i][j] = Cell.Died;
        }
    }
    return newGrid;
}

function initializeGrids() {
    grid = createGrid()
}

function resetGrid() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = Cell.Died;
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
        for (var j = 0; j < cols; j++) {//
            var cell = document.createElement("td");
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "dead");
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
    var row = rowcol[0];
    var col = rowcol[1];
    
    var classes = this.getAttribute("class");
    if(classes.indexOf("live") > -1) {
        this.setAttribute("class", "dead");
        grid[row][col] = Cell.Died;
    } else {
        this.setAttribute("class", "live");
        grid[row][col] = Cell.Live;
    }
    
}

function updateView() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var cell = getCell(i, j);
            if (cell === null) {
                console.log("No cell with this coordinates")
                return;
            }
            if (grid[i][j] == Cell.Died) {
                cell.setAttribute("class", "dead");
            } else {
                cell.setAttribute("class", "live");
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

    snapshotNameInput.onkeyup = sendSnapshotHandler;
    selectSnapshot.onchange = getSnapshotHandler;
}

function randomButtonHandler() {
    if (playing) return;
    clearButtonHandler();
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var isLive = Math.round(Math.random());
            if (isLive == 1) {
                var cell = getCell(i, j);
                if (cell === null) {
                    console.log("No cell with this coordinates")
                    return;
                }
                cell.setAttribute("class", "live");
                grid[i][j] = Cell.Live;
            }
            else {
                grid[i][j] = Cell.Died;
            }
        }
    }
}

// clear the grid
function clearButtonHandler() {
    console.log("Clear the game: stop playing, clear the grid");
    
    playing = false;
    startButton.innerHTML = "Старт";    
    clearTimeout(timer);
    
    var cellsList = document.getElementsByClassName("live");
    var cell: Element | null;
    while (cell = cellsList.item(0)) {
        cell.setAttribute("class", "dead");
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
    } else {
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
    var nextGrid = createGrid()
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

function applyRules(nextGrid: Cell[][], row, col) {
    var numNeighbors = countNeighbors(row, col);
    if (grid[row][col] == Cell.Live) {
        if (numNeighbors < 2) {
            nextGrid[row][col] = Cell.Died;
        } else if (numNeighbors == 2 || numNeighbors == 3) {
            nextGrid[row][col] = Cell.Live;
        } else if (numNeighbors > 3) {
            nextGrid[row][col] = Cell.Died;
        }
    } else if (grid[row][col] == Cell.Died) {
        if (numNeighbors == 3) {
            nextGrid[row][col] = Cell.Live;
        }
    }
}

function countNeighbors(row, col) {
    var count = 0;
    if (row-1 >= 0) {
        if (grid[row-1][col] == Cell.Live) count++;
    }
    if (row-1 >= 0 && col-1 >= 0) {
        if (grid[row-1][col-1] == Cell.Live) count++;
    }
    if (row-1 >= 0 && col+1 < cols) {
        if (grid[row-1][col+1] == Cell.Live) count++;
    }
    if (col-1 >= 0) {
        if (grid[row][col-1] == Cell.Live) count++;
    }
    if (col+1 < cols) {
        if (grid[row][col+1] == Cell.Live) count++;
    }
    if (row+1 < rows) {
        if (grid[row+1][col] == Cell.Live) count++;
    }
    if (row+1 < rows && col-1 >= 0) {
        if (grid[row+1][col-1] == Cell.Live) count++;
    }
    if (row+1 < rows && col+1 < cols) {
        if (grid[row+1][col+1] == Cell.Live) count++;
    }
    return count;
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

function sendSnapshotHandler(event) {
    //var gridContainer = document.getElementsByTagName('table')[0];
    //console.log(gridContainer);
    if(event.keyCode == 13) { //enter
        var snapshot = grid.map(row => row.slice());
        var name = snapshotNameInput.value;
        console.log("Sending snapshot to server:", snapshot);
        fetch('/snapshot/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, snapshot: snapshot })
        }).then(response => {
            if (response.ok) {
                console.log("Snapshot saved successfully.");
                snapshotNameInput.value = "";
                var newOption = document.createElement("option");
                newOption.textContent = name;
                selectSnapshot.prepend(newOption);
            } else {
                console.error("Error saving snapshot.");
            }
        }).catch(error => {
            console.error("Network error:", error);
        });
    }
}

function getSnapshotHandler() {
    var name = selectSnapshot.value;
    fetch('/snapshots/' + name, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            response.json().then(json => {
                console.log(json.data);
                rows = json.data.length
                cols = json.data[0].length
                heightInput.value = rows.toString();
                widthInput.value = cols.toString();
                initializeGrids();
                createTable();
                resetGrid();
                grid = json.data;
                updateView();
            });
        } else {
            console.error("Error gettin snapshot.");
        }
    }).catch(error => {
        console.error("Network error:", error);
    });
}

// Start everything
window.onload = initialize;