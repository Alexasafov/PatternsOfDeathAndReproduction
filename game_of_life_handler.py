from enum import Enum
from bottle import response
import json
from snapshot_repo import Snapshot, SnapshotRepository

class Cell(Enum):
    DEATH = 0
    LIVE = 1

# Проверка валидности снимка: он не должен быть пустым
# и иметь отличающиеся по длине строки
def snapshot_is_valid(snapshot):
    if snapshot is not None and snapshot != []:
        first_row_len = len(snapshot[0])
        for row in snapshot:
            if len(row) != first_row_len:
                return False
        return True
    else: return False

# Сохранение снимка
def snapshot(data: dict, repo: SnapshotRepository):
    try:
        snapshot: Snapshot = data['snapshot']
        name: str = data['name']
        if snapshot_is_valid(snapshot) and name: # проверка того, что имя не пустое
            repo.add(name, snapshot)
            response.content_type = 'application/json'
            response.status = 200
            return json.dumps({"message": "Snapshot saved successfully."})
        else:
            response.status = 400
            return json.dumps({"message": "Invalid snapshot or name."})
    except Exception as e:
        response.status = 500
        return json.dumps({"message": "Server error: " + str(e)})

# отправка снапшота по имени
def get_snapshot(name: str, repo: SnapshotRepository):
    try:
        snapshot = repo.get(name)
        if snapshot is None:
            response.status = 400
            return json.dumps({"message": "No snapshot with this name."})
        response.content_type = 'application/json'
        return dict(data=snapshot)
    except Exception as e:
        response.status = 500
        return json.dumps({"message": "Server error: " + str(e)})
