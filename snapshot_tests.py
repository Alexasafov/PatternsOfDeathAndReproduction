import unittest
from game_of_life_handler import get_snapshot, snapshot
from snapshot_repo import InMemorySnapshotRepository
from bottle import response

class TestSnapshotFunctions(unittest.TestCase):
    
    def test_get_snapshot(self):
        isError = isinstance(get_snapshot("", InMemorySnapshotRepository()), str)
        self.assertTrue(isError)
    
    def test_save_snapshot(self):
        name = "name"
        repo = InMemorySnapshotRepository()
        result = snapshot(dict(snapshot = [[]], name = name), repo)
        self.assertIsNotNone(repo.get(name))
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
