
% rebase('layout.tpl', title=title, year=year)
<div class="underwaterpage-background">
<h1 id="title">Игра Подводный мир</h1>

<div id="gridContainer">
</div>

<div class="controls">
    <button class = "styled-button" id="startW"><span>Старт</span></button>
    <button class = "styled-button"id="clearW"><span>Очистить</span></button>
    <button class = "styled-button"id="randomW"><span>Добавить объекты</span></button>
    <input class = "styled-input" id="widthW" type="number" min="10" max="100" value="100" required="true" placeholder="Ширина">
    <input class = "styled-input" id="heightW" type="number" min="10" max="25" value="25" required="true" placeholder="Высота">
    <input class = "styled-input" id="cellCountW" type="number" min="2" max="100" value=" " required="true" placeholder="Клетки">
    <input class = "styled-input" id="poisonCountW" type="number" min="0" max="500" value=" " required="true" placeholder="Яд">
    <input class = "styled-input" id="foodCountW" type="number" min="0" max="500" value=" " required="true" placeholder="Еда">
</div>

<h1>Теория игры "Подводный мир"</h1>

<h2>Введение</h2>
<p>
    В игре "Подводный мир" создается экосистема с различными организмами-клетками, которые взаимодействуют между собой и окружающей средой. 
</p>
<h2>Правила игры "Подводный мир"</h2>
<p>Игра происходит на двумерной сетке, на которой находятся следующие объекты:</p>
<ul>
    <li><strong>Живая клетка</strong> (обычно обозначается зелёным цветом).</li>
    <li><strong>Мёртвая клетка</strong> (обычно обозначается красным цветом).</li>
    <li><strong>Яд</strong> (обычно отображается фиолетовым цветом).</li>
    <li><strong>Еда</strong> (обычно отображается оранжевым цветом).</li>
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
</div>