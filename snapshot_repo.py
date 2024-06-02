from enum import Enum
import json
import os
from typing import TypeAlias, Protocol

WRITEPATH = 'snapshots.json'

class Cell(Enum):
    DEATH = 0
    LIVE = 1

Snapshot: TypeAlias = list[list[Cell]]

class SnapshotRepository(Protocol):
    def add(self, name: str, snapshot: Snapshot) -> None:
        ...
    
    def get(self, name: str) -> Snapshot | None:
        ...
    
    def all_snapshot_names(self) -> list[str]:
        ...

class InMemorySnapshotRepository:
    def __init__(self):
        self.snapshots: dict[str, list[list[Cell]]] = {}

    def add(self, name: str, snapshot: Snapshot) -> None:
        self.snapshots[name] = snapshot
    
    def get(self, name: str) -> Snapshot | None:
        return self.snapshots.get(name)
    
    def all_snapshot_names(self) -> list[str]:
        return list(self.snapshots.keys())

class JsonSnapshotRepository:    
    def __init__(self):
        if not os.path.exists(WRITEPATH):
            with open(WRITEPATH, 'a+') as json_file:
                json.dump({}, json_file)
                self.snapshots: dict[str, list[list[Cell]]] = {}
        else:
            with open(WRITEPATH, 'r+') as json_file:
                self.snapshots: dict[str, list[list[Cell]]] = json.load(json_file)

    def add(self, name: str, snapshot: Snapshot) -> None:
        self.snapshots[name] = snapshot
        with open(WRITEPATH, 'r+') as json_file:
            json.dump(self.snapshots, json_file)
    
    def get(self, name: str) -> Snapshot | None:
        return self.snapshots.get(name)
    
    def all_snapshot_names(self) -> list[str]:
        return list(self.snapshots.keys())