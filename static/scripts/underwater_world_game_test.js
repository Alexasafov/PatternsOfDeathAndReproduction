// Импорт необходимых библиотек для проведения тестирования
const assert = require('assert');
const { createGrid, initializeGrids, resetGrid, cellClickHandler, validateInput, computeNextGen } = require('./your-code-file.js');

// Тестирование создания сетки
describe('Grid Creation', function() {
    it('should create a grid with correct dimensions and empty cells', function() {
        const rows = 25;
        const cols = 100;
        const grid = createGrid(rows, cols);
        assert.strictEqual(grid.length, rows);
        assert.strictEqual(grid[0].length, cols);
        assert.deepStrictEqual(grid, Array.from({ length: rows }, () => Array.from({ length: cols }, () => 2))); // 2 represents Cell.Empty
    });
});

// Тестирование обработчика клика на клетке
describe('Cell Click Handler', function() {
    it('should toggle cell state between Alive and Died', function() {
        const grid = createGrid(5, 5);
        const cell = { id: '2_2', getAttribute: function() { return 'alive'; }, setAttribute: function(state) { this.state = state; } };
        cellClickHandler.call(cell); // Simulate a click on a live cell
        assert.strictEqual(cell.state, 'died'); // Expecting the cell to die
        cellClickHandler.call(cell); // Simulate another click on the same cell
        assert.strictEqual(cell.state, 'alive'); // Expecting the cell to revive
    });
});

// Тестирование валидации ввода
describe('Input Validation', function() {
    it('should reject invalid input and reset the input value', function() {
        const input = { value: '101', min: '10', max: '100', alert: function() {} };
        validateInput.call(input);
        assert.strictEqual(input.value, ''); // Expecting the input value to be reset
    });

    it('should accept valid input', function() {
        const input = { value: '50', min: '10', max: '100', alert: function() {} };
        validateInput.call(input);
        assert.strictEqual(input.value, '50'); // Expecting the input value to remain unchanged
    });
});

// Тестирование вычисления следующего поколения клеток
describe('Compute Next Generation', function() {
    it('should compute the next generation of cells correctly', function() {
        const initialGrid = [
            [2, 2, 2],
            [2, 1, 2],
            [2, 2, 2]
        ];
        const expectedNextGen = [
            [2, 2, 2],
            [2, 2, 2],
            [2, 2, 2]
        ];
        const actualNextGen = computeNextGen(initialGrid);
        assert.deepStrictEqual(actualNextGen, expectedNextGen);
    });
});
