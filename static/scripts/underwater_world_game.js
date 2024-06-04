// Определение констант для типов клеток
const CELL_TYPES = {
    EMPTY: 0,
    CELL: 1,
    FOOD: 2,
    POISON: 3
};

// Определение класса для клеток
class Cell {
    constructor(x, y, energy = 100, maxAge = 50) {
        this.x = x;
        this.y = y;
        this.energy = energy;
        this.maxAge = maxAge;
        this.age = 0;
    }

    // Функция для перемещения клетки на новую позицию
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    // Функция для уменьшения энергии клетки с каждым тиком
    decreaseEnergy() {
        this.energy -= 1;
        this.age += 1;
    }

    // Функция для проверки, достигла ли клетка максимального возраста
    isMaxAge() {
        return this.age >= this.maxAge;
    }
}

// Определение класса для игрового мира
class UnderwaterWorld {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = [];
        this.initializeGrid();
    }

    // Функция для инициализации игровой сетки
    initializeGrid() {
        for (let y = 0; y < this.height; y++) {
            let row = [];
            for (let x = 0; x < this.width; x++) {
                row.push(CELL_TYPES.EMPTY);
            }
            this.grid.push(row);
        }
    }

    // Функция для добавления клетки в игровой мир
    addCell(cell) {
        this.grid[cell.y][cell.x] = CELL_TYPES.CELL;
    }

    // Функция для добавления еды в игровой мир
    addFood(x, y) {
        this.grid[y][x] = CELL_TYPES.FOOD;
    }

    // Функция для добавления яда в игровой мир
    addPoison(x, y) {
        this.grid[y][x] = CELL_TYPES.POISON;
    }

    // Функция для проверки пустоты клетки
    isEmpty(x, y) {
        return this.grid[y][x] === CELL_TYPES.EMPTY;
    }

    // Функция для перемещения клетки на новую позицию
    moveCell(cell, dx, dy) {
        let newX = cell.x + dx;
        let newY = cell.y + dy;

        // Проверяем, находится ли новая позиция в пределах игрового поля
        if (newX >= 0 && newX < this.width && newY >= 0 && newY < this.height) {
            // Если новая позиция пустая, перемещаем клетку
            if (this.isEmpty(newX, newY)) {
                this.grid[cell.y][cell.x] = CELL_TYPES.EMPTY;
                cell.move(dx, dy);
                this.grid[cell.y][cell.x] = CELL_TYPES.CELL;
            }
            // Если на новой позиции еда или яд, обновляем энергию клетки
            else if (this.grid[newY][newX] === CELL_TYPES.FOOD) {
                cell.energy += 10;
                this.grid[newY][newX] = CELL_TYPES.EMPTY;
                cell.move(dx, dy);
                this.grid[cell.y][cell.x] = CELL_TYPES.CELL;
            } else if (this.grid[newY][newX] === CELL_TYPES.POISON) {
                cell.energy -= 10;
                this.grid[newY][newX] = CELL_TYPES.EMPTY;
                cell.move(dx, dy);
                this.grid[cell.y][cell.x] = CELL_TYPES.CELL;
            }
            // Если на новой позиции другая клетка, проверяем возможность размножения
            else if (this.grid[newY][newX] === CELL_TYPES.CELL) {
                let otherCell = this.findCellAt(newX, newY);
                if (cell.energy > 50 && otherCell.energy > 50) {
                    let emptyNeighbor = this.findEmptyNeighbor(newX, newY);
                    if (emptyNeighbor) {
                        let newCell = new Cell(emptyNeighbor.x, emptyNeighbor.y);
                        this.addCell(newCell);
                    }
                }
            }
        }
    }

    // Функция для поиска клетки по координатам
    findCellAt(x, y) {
        for (let row of this.grid) {
            for (let cell of row) {
                if (cell instanceof Cell && cell.x === x && cell.y === y) {
                    return cell;
                }
            }
        }
        return null;
    }

    // Функция для поиска пустой соседней клетки
    findEmptyNeighbor(x, y) {
        let neighbors = [
            { dx: 0, dy: -1 }, // Вверх
            { dx: 0, dy: 1 },  // Вниз
            { dx: -1, dy: 0 }, // Влево
            { dx: 1, dy: 0 }   // Вправо
        ];
        for (let neighbor of neighbors) {
            let newX = x + neighbor.dx;
            let newY = y + neighbor.dy;
            if (newX >= 0 && newX < this.width && newY >= 0 && newY < this.height && this.isEmpty(newX, newY)) {
                return { x: newX, y: newY };
            }
        }
        return null;
    }
}

// Создание экземпляра игрового мира
const world = new UnderwaterWorld(20, 20);

// Функция для запуска игры
function startGame() {
    setInterval(() => {
        // Для каждой клетки на игровом поле
        for (let y = 0; y < world.height; y++) {
            for (let x = 0; x < world.width; x++) {
                let cell = world.grid[y][x];
                if (cell instanceof Cell) {
                    // Уменьшаем энергию клетки
                    cell.decreaseEnergy();
                    // Если клетка достигла максимального возраста или энергия у нее падает до нуля, удаляем клетку
                    if (cell.isMaxAge() || cell.energy <= 0) {
                        world.grid[y][x] = CELL_TYPES.EMPTY;
                    } else {
                        // Выбираем случайное направление для перемещения клетки
                        let directions = [
                            { dx: 0, dy: -1 }, // Вверх
                            { dx: 0, dy: 1 },  // Вниз
                            { dx: -1, dy: 0 }, // Влево
                            { dx: 1, dy: 0 }   // Вправо
                        ];
                        let randomDirection = directions[Math.floor(Math.random() * directions.length)];
                        // Перемещаем клетку
                        world.moveCell(cell, randomDirection.dx, randomDirection.dy);
                    }
                }
            }
        }
    }, 1000); // Задаем интервал в одну секунду (можно настроить)
}

// Функция для очистки игрового поля
function clearGrid() {
    // Проходимся по всем клеткам на игровом поле и устанавливаем тип клетки как пустую
    for (let y = 0; y < world.height; y++) {
        for (let x = 0; x < world.width; x++) {
            world.grid[y][x] = CELL_TYPES.EMPTY;
        }
    }
}

// Функция для добавления случайных объектов в игровой мир
function addRandomObjects() {
    // Добавляем случайные клетки, еду и яд на игровое поле
    for (let i = 0; i < 10; i++) { // Пример: добавляем 10 случайных клеток
        let x = Math.floor(Math.random() * world.width);
        let y = Math.floor(Math.random() * world.height);
        world.addCell(new Cell(x, y));
    }
    for (let i = 0; i < 5; i++) { // Пример: добавляем 5 случайных объектов еды
        let x = Math.floor(Math.random() * world.width);
        let y = Math.floor(Math.random() * world.height);
        world.addFood(x, y);
    }
    for (let i = 0; i < 5; i++) { // Пример: добавляем 5 случайных объектов яда
        let x = Math.floor(Math.random() * world.width);
        let y = Math.floor(Math.random() * world.height);
        world.addPoison(x, y);
    }
}

var rows = 38;
var cols = 100;
// размер поля в пикселях
var sizeHeight = rows * 10;
var sizeWidth = cols * 10;
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
            cell.setAttribute("class", "alive", "dead", "food", "posion");
            cell.style.width = width.toString() + "px";
            cell.style.height = height.toString() + "px";
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gridContainer.appendChild(table);
}


// Привязка функций к кнопкам
document.getElementById('start').addEventListener('click', startGame);
document.getElementById('clear').addEventListener('click', clearGrid);
document.getElementById('random').addEventListener('click', addRandomObjects);
