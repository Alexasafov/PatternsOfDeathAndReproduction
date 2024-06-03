var Cell;
(function (Cell) {
    Cell[Cell["Died"] = 0] = "Died";
    Cell[Cell["Live"] = 1] = "Live";
})(Cell || (Cell = {}));
// получение компонетов со страницы html
var heightInput = document.getElementById('height');
var widthInput = document.getElementById('width');
var gridContainer = document.getElementById('gridContainer');
var startButton = document.getElementById('start');
var clearButton = document.getElementById('clear');
var randomButton = document.getElementById("random");
var snapshotNameInput = document.getElementById('snapshot');
var selectSnapshot = document.getElementById('getSnapshot');
var rows = 38;
var cols = 100;
// размер поля в пикселях
var sizeHeight = rows * 10;
var sizeWidth = cols * 10;
var playing = false;
var grid;
var timer;
var reproductionTime = 100;
// получение клетки по координатам
function getCell(x, y) {
    return document.getElementById(x + "_" + y);
}
// создание поля, где все клетки мертвые
function createGrid() {
    var newGrid = new Array(rows);
    for (var i = 0; i < rows; i++) {
        newGrid[i] = new Array(cols);
        for (var j = 0; j < cols; j++) {
            newGrid[i][j] = Cell.Died;
        }
    }
    return newGrid;
}
// инициализация поля
function initializeGrids() {
    grid = createGrid();
}
// установка всех клеток в начально состояние
function resetGrid() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = Cell.Died;
        }
    }
}
function initialize() {
    createTable();
    initializeGrids();
    resetGrid();
    setupControlButtons();
}
// Создние таблицы html, в которой отображется поле
function createTable() {
    if (!gridContainer) {
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
// обработчик нажатия на клетку
function cellClickHandler() {
    var rowcol = this.id.split("_");
    var row = rowcol[0];
    var col = rowcol[1];
    var classes = this.getAttribute("class");
    if (classes.indexOf("live") > -1) {
        this.setAttribute("class", "dead");
        grid[row][col] = Cell.Died;
    }
    else {
        this.setAttribute("class", "live");
        grid[row][col] = Cell.Live;
    }
}
// обновление состояния таблицы
function updateView() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var cell = getCell(i, j);
            if (cell === null) {
                console.log("No cell with this coordinates");
                return;
            }
            if (grid[i][j] == Cell.Died) {
                cell.setAttribute("class", "dead");
            }
            else {
                cell.setAttribute("class", "live");
            }
        }
    }
}
// назанчение обработчиков для желемнтов на странице
function setupControlButtons() {
    startButton.onclick = startButtonHandler;
    clearButton.onclick = clearButtonHandler;
    randomButton.onclick = randomButtonHandler;
    widthInput.onchange = resizeButtonHandler;
    heightInput.onchange = resizeButtonHandler;
    snapshotNameInput.onkeyup = sendSnapshotHandler;
    selectSnapshot.onchange = getSnapshotHandler;
}
// создание поля с случайными состояиниями клеток
function randomButtonHandler() {
    if (playing)
        return;
    clearButtonHandler();
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var isLive = Math.round(Math.random());
            if (isLive == 1) {
                var cell = getCell(i, j);
                if (cell === null) {
                    console.log("No cell with this coordinates");
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
// очистка html страницы
function clearButtonHandler() {
    console.log("Clear the game: stop playing, clear the grid");
    playing = false;
    startButton.innerHTML = "Старт";
    clearTimeout(timer);
    var cellsList = document.getElementsByClassName("live");
    var cell;
    while (cell = cellsList.item(0)) {
        cell.setAttribute("class", "dead");
    }
    resetGrid();
}
// Старт, пауза или продолжение в зависимости от текущего состояния
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
// начать эмуляцию
function play() {
    computeNextGen();
    if (playing) {
        timer = setTimeout(play, reproductionTime);
    }
}
// рассчет нового состояния поля
function computeNextGen() {
    var nextGrid = createGrid();
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            applyRules(nextGrid, i, j);
        }
    }
    grid = nextGrid;
    updateView();
}
// Правила
// Если живая клетка имеет меньше 2 или более 3 соседей, то в следующем поколении она умирает,
// в противном случае она выживает;
// В пустой клетке появляется живая клетка, если у исходной клетки ровно 3 соседа.
function applyRules(nextGrid, row, col) {
    var numNeighbors = countNeighbors(row, col);
    if (grid[row][col] == Cell.Live) {
        if (numNeighbors < 2) {
            nextGrid[row][col] = Cell.Died;
        }
        else if (numNeighbors == 2 || numNeighbors == 3) {
            nextGrid[row][col] = Cell.Live;
        }
        else if (numNeighbors > 3) {
            nextGrid[row][col] = Cell.Died;
        }
    }
    else if (grid[row][col] == Cell.Died) {
        if (numNeighbors == 3) {
            nextGrid[row][col] = Cell.Live;
        }
    }
}
// подсчет живых соседей клетки по данным координатам
function countNeighbors(row, col) {
    var count = 0;
    var directions = [
        [-1, 0], [-1, -1], [-1, 1],
        [0, -1], [0, 1],
        [1, 0], [1, -1], [1, 1]
    ];
    for (var i = 0; i < directions.length; i++) {
        var newRow = row + directions[i][0];
        var newCol = col + directions[i][1];
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            if (grid[newRow][newCol] === Cell.Live) {
                count++;
            }
        }
    }
    return count;
}
// измененние размера поля
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
// отправка снимка на сервер
function sendSnapshotHandler(event) {
    if (event.keyCode == 13) { // Нажатие на кнопку Enter
        var name = snapshotNameInput.value;
        if (!name) {
            alert("Не заполнено поле с названием снимка");
            return;
        }
        var snapshot = grid.map(function (row) { return row.slice(); });
        console.log("Sending snapshot to server:", snapshot);
        fetch('/snapshot/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, snapshot: snapshot })
        }).then(function (response) {
            if (response.ok) {
                console.log("Snapshot saved successfully.");
                snapshotNameInput.value = "";
                var newOption = document.createElement("option");
                newOption.textContent = name;
                selectSnapshot.prepend(newOption);
            }
            else {
                console.error("Error saving snapshot.");
            }
        })["catch"](function (error) {
            console.error("Network error:", error);
        });
    }
}
// получение снимка с сервера
function getSnapshotHandler() {
    var name = selectSnapshot.value;
    fetch('/snapshots/' + name, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (json) {
                console.log(json.data);
                rows = json.data.length;
                cols = json.data[0].length;
                heightInput.value = rows.toString();
                widthInput.value = cols.toString();
                initializeGrids();
                createTable();
                resetGrid();
                grid = json.data;
                updateView();
            });
        }
        else {
            console.error("Error gettin snapshot.");
        }
    })["catch"](function (error) {
        console.error("Network error:", error);
    });
}
window.onload = initialize;
