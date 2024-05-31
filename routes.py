"""
Routes and views for the bottle application.
"""

from bottle import route, view
from datetime import datetime

@route('/')
@route('/home')
@view('index')
def home():
    """Renders the home page."""
    return dict(
        year=datetime.now().year
    )

@route('/about')
@view('about')
def about():
    """Renders the about page."""
    return dict(
        title='О нас',
        message='',
        year=datetime.now().year
    )

@route('/game_of_life')
@view('game_of_life')
def game_of_life():
    """Renders the game of life page."""
    return dict(
        title='Игра жизнь',
        year=datetime.now().year
    )


@route('/infect')
@view('infect')
def infect():
    """Renders the game of life page."""
    return dict(
        title='infect',
        year=datetime.now().year
    )

@route('/underwater_world')
@view('underwater_world')
def underwater():
    """Renders the game of life page."""
    return dict(
        title='underwater world',
        year=datetime.now().year
    )