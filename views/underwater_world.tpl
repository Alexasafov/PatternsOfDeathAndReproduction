% rebase('layout.tpl', title=title, year=year)

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
    <style>
        #gridContainer {
            display: grid;
            grid-template-columns: repeat(20, 20px);
            grid-template-rows: repeat(20, 20px);
            gap: 1px;
        }
        .cell {
            width: 20px;
            height: 20px;
        }
        .alive {
            background-color: red;
        }
        .dead {
            background-color: green;
        }
        .poison {
            background-color: purple;
        }
        .food {
            background-color: yellow;
        }
        ul {
            font-size: 18px;
        }
    </style>
</head>
<body>

<div id="gridContainer">
</div>

<div class="controls">
    <button id="start"><span>Старт</span></button>
    <button id="clear"><span>Очистить</span></button>
    <button id="random"><span>Рандом</span></button>
</div>

<h1>Теория игры "Подводный мир"</h1>

<h2>Введение</h2>
<p>
    В игре "Подводный мир" создается экосистема с различными организмами-клетками, которые взаимодействуют между собой и окружающей средой. 
</p>
<h2>Правила игры "Подводный мир"</h2>
<p>Игра происходит на двумерной сетке, на которой находятся следующие объекты:</p>
<ul>
    <li><strong>Живая клетка</strong> (обычно обозначается красным цветом).</li>
    <li><strong>Мёртвая клетка</strong> (обычно обозначается зеленым).</li>
    <li><strong>Яд</strong> (обычно отображается фиолетовым).</li>
    <li><strong>Еда</strong> (обычно отображается жёлтым).</li>
</ul>
<p>
    Эволюция сетки происходит в дискретные временные шаги, и состояние каждой клетки обновляется одновременно в соответствии с фиксированным набором правил, которые зависят от состояния соседних клеток.
</p>
<p>Правила игры следующие:</p>
<h3>Клетки организмы</h3>
<ul>
    <li><strong>Живая клетка</strong>: Живая клетка, перемещающаяся по игровому полю в одном из четырёх направлений.</li>
    <li><strong>Энергия клетки</strong>: Каждая клетка имеет уровень энергии, максимальный возраст и позицию в игровом мире.</li>
    <li><strong>Перемещение</strong>: Клетки могут перемещаться в четырех направлениях (вверх, вниз, влево, вправо).</li>
    <li><strong>Цель клетки</strong>: Клетка должна выжить, собирать энергию и размножаться.</li>
</ul>
<h3>Объекты взаимодействия</h3>
<ul>
    <li><strong>Еда</strong>: увеличивает уровень энергии клетки.</li>
    <li><strong>Яд</strong>: уменьшает уровень энергии клетки.</li>
    <li><strong>Пустое пространство</strong>: клетка может переместиться в пустую ячейку без изменений в энергии.</li>
    <li><strong>Другая клетка</strong>: клетка не может переместиться на занятую другим организмом клетку. Если обе клетки имеют энергию выше 50%, и рядом есть свободное место, происходит размножение.</li>
</ul>
<h3>Изменение условий обитания</h3>
<ul>
    <li><strong>Брюс Всемогущий</strong>: Пользователь может изменять плотность объектов (еды, яда) и общие условия обитания, что влияет на поведение и выживаемость клеток.</li>
</ul>
<h3>Единица времени</h3>
<ul>
    <li><strong>Тики</strong>: Вселенная игры имеет свою единицу времени — тик. С каждым тиком происходит обновление состояния системы.</li>
</ul>
<h3>Энергия и возраст</h3>
<ul>
    <li><strong>Уровень энергии</strong>: Уровень энергии клетки уменьшается с каждым тиком.</li>
    <li><strong>Смерть</strong>: Если энергия клетки падает до нуля, она погибает.</li>
    <li><strong>Старость - не радость</strong>: У каждой клетки есть максимальный возраст, после которого она погибает.</li>
</ul>

<script src="/static/scripts/underwater_world_game.js"></script>

</body>
</html>
