1. Описание

1.1 Наименование программы
    Веб-сайт "Модели гибели и размножения".

1.2 Краткое описание
    "Модели гибели и размножения" - это веб-приложение, предоставляющее информацию о различных экосистемах и игровых моделях, связанных с биологией и экологией.

2. Установка и запуск

2.1 Требования
    - Python 3.x
    - Node.js

2.2 Установка зависимостей
    1. Установите Python 3.x, если он еще не установлен.
    2. Установите Node.js, если он еще не установлен.
    3. Склонируйте репозиторий с помощью команды:
        ```
        git clone <URL репозитория>
        ```
    4. Установите зависимости Python, выполнив команду:
        ```
        pip install bottle
        ```
    5. Установите зависимости JavaScript, выполнив команду:
        ```
        npm install
        ```

2.3 Запуск
    1. Перейдите в каталог проекта:
        ```
        cd <название_каталога_проекта>
        ```
    2. Запустите сервер Bottle:
        ```
        python app.py
        ```
    3. Откройте браузер и перейдите по адресу:
        ```
        http://localhost:8080
        ```

3. Структура проекта

3.1 Основные каталоги и файлы
    ```
    <название_каталога_проекта>/
    ├── app.py            # Основной файл приложения Bottle
    ├── templates/        # Шаблоны страниц HTML
    │   ├── index.tpl
    │   ├── about.tpl
    │   ├── wolf_island.tpl
    │   ├── game_of_life.tpl
    │   ├── underwater_world.tpl
    │   └── skin_infection.tpl
    ├── static/           # Статические файлы (CSS, JS)
    │   ├── css/
    │   │   └── styles.css
    │   └── js/
    │       ├── game_of_life.js
    │       └── underwater_world.js
    └── README.txt        # Настоящий файл
    ```

4. Описание страниц

4.1 Главная страница
    - URL: `/`
    - Описание: Стартовая страница с навигацией по основным разделам сайта.

4.2 Страница "О нас"
    - URL: `/about`
    - Описание: Информационная страница с описанием компании, команды и миссии проекта.

4.3 Страница "Волчий остров"
    - URL: `/wolf-island`
    - Описание: Интерактивная страница, посвященная экосистеме Волчьего острова.

4.4 Страница "Игра жизнь"
    - URL: `/game-of-life`
    - Описание: Страница с реализацией классической игры "Жизнь" Джона Конвея.

4.5 Страница "Игра подводный мир"
    - URL: `/underwater-world`
    - Описание: Интерактивная страница с реализацией модели "Подводный мир".

4.6 Страница "Инфекция на коже"
    - URL: `/skin-infection`
    - Описание: Страница с информацией о различных инфекциях на коже и их моделирование.

5. Контактная информация

5.1 Разработчики
    - Имя: Асафов Александр
    - Email: 
    - Имя: Миронов Фёдор
    - Email: 
    - Имя: Булавин Артур 
    - Email: 
    - Имя: Ошарин Владимир
    - Email:

5.2 Поддержка
    Для вопросов и поддержки обращайтесь по указанному выше email.

6. Лицензия

6.1 Тип лицензии
    MIT License

6.2 Текст лицензии
Лицензия MIT

    Авторское право (с) 2024 г. 

    Разрешение настоящим предоставляется бесплатно любому лицу, получившему копию.
    данного программного обеспечения и связанных с ним файлов документации («Программное обеспечение») для решения
    в Программном обеспечении без ограничений, включая, помимо прочего, права
    использовать, копировать, изменять, объединять, публиковать, распространять, сублицензировать и/или продавать
    копий Программного обеспечения и разрешать лицам, которым Программное обеспечение
    предоставлено для этого при соблюдении следующих условий:

    Вышеупомянутое уведомление об авторских правах и настоящее уведомление о разрешении должны быть включены во все
    копии или существенные части Программного обеспечения.

    ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ ПРЕДОСТАВЛЯЕТСЯ «КАК ЕСТЬ», БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ, ЯВНЫХ ИЛИ
    ПОДРАЗУМЕВАЕМЫЕ, ВКЛЮЧАЯ, НО НЕ ОГРАНИЧИВАЯСЬ, ГАРАНТИИ ТОВАРНОЙ ПРИГОДНОСТИ,
    ПРИГОДНОСТЬ ДЛЯ ОПРЕДЕЛЕННОЙ ЦЕЛИ И НЕНАРУШЕНИЕ ПРАВ. НИ В КОЕМ СЛУЧАЕ НЕ ДОЛЖНО
    АВТОРЫ ИЛИ ОБЛАДАТЕЛИ АВТОРСКИХ ПРАВ НЕСУТ ОТВЕТСТВЕННОСТЬ ЗА ЛЮБЫЕ ПРЕТЕНЗИИ, УБЫТКИ ИЛИ ДРУГИЕ
    ОТВЕТСТВЕННОСТЬ ПО ДОГОВОРУ, ПРАВИЛАМ ИЛИ ДРУГИМ ОБРАЗУ, ВЫТЕКАЮЩАЯ ИЗ:
    ВНЕ ИЛИ В СВЯЗИ С ПРОГРАММНЫМ ОБЕСПЕЧЕНИЕМ ИЛИ ИСПОЛЬЗОВАНИЕМ ИЛИ ДРУГИМИ ДЕЛАМИ В
    ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ.