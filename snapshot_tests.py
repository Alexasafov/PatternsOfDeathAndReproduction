import random
import string
import unittest
from game_of_life_handler import Cell, get_snapshot, snapshot
from snapshot_repo import InMemorySnapshotRepository
from bottle import response

# функция генерирующая случайную строку
def randomword(length):
   letters = string.ascii_lowercase
   return ''.join(random.choice(letters) for i in range(length))

# функция генерирующая случайное состояние клетки
def random_cell_state():
    if random.random() < 0.5:
        return Cell.DEATH
    else:
        return Cell.LIVE

# функция генерирующая валидное поле
def generate_valid_grid(cols, rows):
    grid = []
    for i in range(rows):
        grid.append(list(random_cell_state() for i in range(cols)))
    return grid

# функция генерирующая некорректное поле
def generate_invalid_grid(cols, rows):
    grid = generate_valid_grid(cols, rows)
    row = random.choice(grid)
    grid.append(row[cols//2:])
    return grid

class TestSnapshotFunctions(unittest.TestCase):
    
    def test_get_nonexistent_snapshot(self):
        # arrange
        repo = InMemorySnapshotRepository()
        names = [randomword(random.randint(3, 10)) for i in range(5)]
    
        for name in names:
            # act
            isError = isinstance(get_snapshot(name, repo), str)
            # assert
            self.assertTrue(isError)
    
    def test_save_snapshot_valid_data(self):
        # arrange
        snapshots = [(
                      randomword(random.randint(3, 10)),
                      generate_valid_grid(random.randint(30, 100), random.randint(30, 100))
                     ) 
                     for i in range(5)]
        repo = InMemorySnapshotRepository()

        for name, grid in snapshots:
            # act
            snapshot(dict(snapshot = grid, name = name), repo)
            # assert    
            self.assertIsNotNone(repo.get(name))
            self.assertEqual(response.status_code, 200)
    
    def test_save_snapshot_invalid_data(self):
        # arrange
        snapshots = [("", None), ("valid_name", None), ("", []), ("valid_name", [])]
        snapshots += [(
                       randomword(random.randint(3, 10)),
                       generate_invalid_grid(random.randint(30, 100), random.randint(30, 100))
                      ) 
                      for i in range(5)]
        repo = InMemorySnapshotRepository()

        for name, grid in snapshots:
            # act
            result = snapshot(dict(snapshot = grid, name = name), repo)
            # assert    
            self.assertIsNone(repo.get(name))
            self.assertEqual(response.status_code, 400)
            self.assertIn("Invalid snapshot or name.", result)

if __name__ == '__main__':
    unittest.main()
