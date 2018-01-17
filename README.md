ПОРЯДОК ДЕЙСТВИЙ ПО РАЗРАБОТКЕ НОВОГО САЙТА
Опубликовано: 20.12.2017

-----
1. Подбираем название сайта:

Best Diploms
bestdiploms
bestdiploms.loc


-----
2. Настраиваем локальный сервер XAMPP.

2a. В конец  файла /opt/lampp/etc/extra/httpd-vhosts.conf добавляем:

<VirtualHost 127.0.0.1:80>
    ServerAdmin admin@wpbestdiploms.loc
    DocumentRoot "/home/smartinet/web/wpbestdiploms.loc"
    ServerName wpbestdiploms.loc
    ServerAlias www.wpbestdiploms.loc
    ErrorLog "/opt/lampp/logs/wpbestdiploms.loc-error_log"
    CustomLog "logs/wpbestdiploms.loc-access_log" common
    <Directory />
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

2b. В конец файла /etc/hosts добавляем:

127.0.0.1 wpbestdiploms.loc
127.0.0.1 www.wpbestdiploms.loc


-----
3. Проверяем, работает ли настроенная конфигурация. В директорию, где будет наш
сайт /home/smartinet/web/wpbestdiploms.loc загружаем файл index.html. Запускаем
локальный сервер XAMPP и в строке браузера вводим: http://wpbestdiploms.loc/ или 
http://www.wpbestdiploms.loc/. В обоих случаях должны увидеть работу нашего 
файла index.html.


-----
4. Устанавливаем WordPress на локальный сервер XAMPP.

4.1. С сайта https://ru.wordpress.org/releases/ скачиваем архив с последней 
версией WordPress (в данном случае 4.9.1 от 16.12.2017). Распаковываем его и 
полученные структуру файлов выгружаем на наш сайт /home/smartinet/web/wpbestdiploms.loc.

4.2. Создаем новую базу данных в WordPress: bestdiplomsbd (зіставлення utf8_general_ci).
Примечание. Если проект исключительно русскоязычный и скорость поиска и сравнения 
критична — можно остановится на utf8_general_ci. Если же есть планы по поддержке 
большего количества языков — лучше использовать utf8_unicode_ci.

4.3. Создаем файл wp-config.php из wp-config-sample.php. Вносим в полученный
файл:

/** Имя базы данных для WordPress */
define('DB_NAME', 'bestdiplomsbd');

/** Имя пользователя MySQL */
define('DB_USER', 'root');

/** Пароль к базе данных MySQL */
define('DB_PASSWORD', '');

4.4. Переходим по ссылке http://wpbestdiploms.loc/wp-admin/install.php и попадаем
в знаменитую 5-минутную установку WordPress. Заполненяем поля формы:

Название сайта: Best Diploms

Имя пользователя: adminbest

Пароль: best

Ваш e-mail: smartkoa2003@gmail.com

Видимость для поисковых систем: + Попросить поисковые системы не индексировать сайт
(на чекбоксе ставим птичку)

Жмем кнопку 'Установить WordPress'.

После непродолжительного времени появляется сообщение 'WordPress установлен успешно!'
и предлагается войти под только что созданным именем администратора.

4.5. В админпанели WordPress Настройки -> Постоянные ссылки -> Общие настройки 
отмечаем 'Название записи' и сохраняем изменения.

4.6. Добавляем новый плагин WP Translitera, устанавливаем и активируем.


-----
5. Заходим на сайт Underscores (_s) http://underscores.me/ и генерируем нашу новую
тему:

Theme Name /название темы/:                     Best Diploms
Theme Slug /название папки темы на английском/: bestdiploms
Author /имя автора/:                            Oleg Kovalyov
Author URI /сайт автора/:                       https://github.com/OlegOKovalyov/
Description /описание/:                         Best Diplomas WordPress Site
На чекбоксе _sassify! ставим птичку.

Жмек кнопку 'GENERATE'. Получаем приглашение зберегти файл bestdiploms.zip, що і робимо.

Копируем архив из директории Завантаження в директорию /home/smartinet/web/wpbestdiploms.loc/wp-content/themes
и распаковываем его. Получаем новую директорию bestdiploms с нашей новой темой.


-----
6. Удаляем наш проверочный файл index.html. В админпанели WordPress Внешний вид -> 
Темы -> Активируем нашу новую тему Best Diploms. Можем ее увидеть в браузере по 
адресу: http://wpbestdiploms.loc/.


-----
7. Создаем файл screenshot.png размером 880х660 для новой темы.


-----
8. Помещаем файл package.json из предыдущего проекта в папку темы
/home/smartinet/web/wpbestdiploms.loc/wp-content/themes/bestdiploms и меняем в нем

{
"name": "bestdiploms",

"description": "Best Diplomas WordPress Site",

"repository": {
    "type": "git",
    "url": "https://github.com/OlegOKovalyov/bestdiploms"
  },
}

После этого выполняем команду:

$ npm install

Программа npm должна посмотреть зависимости, которые есть в файле package.json
и загрузить их самые последние версии.

После установки зависимостей получим:

added 1073 packages in 92.074s

При этом тесты после загрузок компонентов passed successfully с зеленой "птичкой".
Кроме того в папке темы появляется директория node_modules с большим количеством
плагинов (зависимостей), в том числе и все перечисленныё в загруженном нами файле
package.json. 

Команда 

$ npm -v

дала ответ 5.5.1 и предложила:

Update available 5.5.1 → 5.6.0
Run npm i -g npm to update 

Пришлось запустить:

$ sudo npm i -g npm

Получили:

+ npm@5.6.0
added 27 packages, removed 11 packages and updated 38 packages in 12.177s


-----
9. Помещаем файл gulpfile.js из предыдущего проекта в папку темы. Теперь наша 
новая тема готова к выполнению задач (тасков). Проверяем модуль sass, написав
в style.scss и удалив файл style.css, например:

body {
    background-color: coral;
}

В терминале:

$ gulp sass

Получаем:

[12:28:15] Using gulpfile ~/web/wpbestdiploms.loc/wp-content/themes/bestdiploms/gulpfile.js
[12:28:15] Starting 'sass'...
[12:28:15] Finished 'sass' after 305 ms

Видим, что style.css снова появился и фон нашего сайта изменился.

Проверяем таск watch:

$ gulp watch

Выполняется запуск браузера и отслеживание изменений в файлах:

[Browsersync] Proxying: http://wpbestdiploms.loc
[Browsersync] Access URLs:
 --------------------------------------
       Local: http://localhost:3000
    External: http://192.168.0.114:3000
 --------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.0.114:3001
 --------------------------------------
[Browsersync] Watching files...


-----
10. Устанавливаем в нашу тему Bootstrap 4 beta:

$ npm install bootstrap@4.0.0-beta.2

В ответ получаем:

+ bootstrap@4.0.0-beta.2
added 1 package in 18.658s

В результате в папке /bestdiploms/node_modules/ появляется новая папка bootstrap.

Устанавливаем jQuery:

$ npm install jquery

Ответ:

+ jquery@3.2.1
added 1 package in 18.649s

Устанавливаем Popper.js:

$ npm install popper

Получаем:

+ popper@1.0.1
added 293 packages in 84.348s


-----
11. Создаем папки для картинок:

├── images
│   └── src


-----
12. Добавляем новую папку src, в которой создаем файлы common.js (пустой) и main.js:

├── js
│   └── src ── common.js
│        └──── main.js

Содержимое main.js примерно следующее:

/*! add jquery.js */
//= ../../node_modules/jquery/dist/jquery.js
/*! add popper.js */
//= ../../node_modules/popper.js/dist/umd/popper.js
/*! add util.js */
//= ../../node_modules/bootstrap/js/dist/util.js
/*! add tab.js */
//= ../../node_modules/bootstrap/js/dist/tab.js
/*! add button.js */
//= ../../node_modules/bootstrap/js/dist/button.js
/*! add collapse.js */
//= ../../node_modules/bootstrap/js/dist/collapse.js
/*! add owl.carousel.js */
/*//= ../../owlcarousel/dist/owl.carousel.js*/
/*! add common.js */
//= common.js

Устанавливаем плагины для конкатенации, валидации и минимизации js-файлов:

$ npm install gulp-concat --save-dev
+ gulp-concat@2.6.1
updated 1 package in 27.578s

$ npm install gulp-jshint --save-dev
+ gulp-jshint@2.0.4
updated 1 package in 25.884s

$ npm install gulp-uglify --save-dev
+ gulp-uglify@3.0.0
updated 1 package in 25.41s


Проверяем таск js:

$ gulp js

Получаем:

[15:26:28] Using gulpfile ~/web/wpbestdiploms.loc/wp-content/themes/bestdiploms/gulpfile.js
[15:26:28] Starting 'js'...
[15:26:28] Finished 'js' after 101 ms

НЕ РАБОТАЕТ!!!


-----
13. Устанавливаем Bower глобально:

$ npm install -g bower

+ bower@1.8.2
updated 1 package in 5.689s

 Инициализируем установленный глобально Bower и определяем зависимости.
Определяем папку, в которую Bower будет загружать пакеты. Для этого создаем 
файл .bowerrc:

{
  "directory" : "bower_components/"
}

$ bower init

? name bestdiploms
? description Best Diplomas WordPress Site
? main file index.js
? keywords Keywords
? authors Oleg Kovalyov
? license ISC
? homepage 
? set currently installed components as dependencies? Yes
? add commonly ignored files to ignore list? Yes
? would you like to mark this package as private which prevents it from being accidentally published to the registry? Yes

Получаем файл:

{
  name: 'bestdiploms',
  description: 'Best Diplomas WordPress Site',
  main: 'index.js',
  authors: [
    'Oleg Kovalyov'
  ],
  license: 'ISC',
  keywords: [
    'Keywords'
  ],
  homepage: '',
  private: true,
  ignore: [
    '**/.*',
    'node_modules',
    'bower_components',
    'test',
    'tests'
  ]
}

? Looks good? (Y/n) Yes

$ bower install bootstrap#v4.0.0-beta --save

В результате:

bower cached        https://github.com/twbs/bootstrap.git#4.0.0-beta
bower validate      4.0.0-beta against https://github.com/twbs/bootstrap.git#v4.0.0-beta
bower cached        https://github.com/jquery/jquery-dist.git#3.2.1
bower validate      3.2.1 against https://github.com/jquery/jquery-dist.git#>=1.9.1
bower cached        https://github.com/FezVrasta/popper.js.git#1.12.6
bower validate      1.12.6 against https://github.com/FezVrasta/popper.js.git#^1.11.0
bower new           version for https://github.com/FezVrasta/popper.js.git#^1.11.0
bower resolve       https://github.com/FezVrasta/popper.js.git#^1.11.0
bower download      https://github.com/FezVrasta/popper.js/archive/v1.12.9.tar.gz
bower extract       popper.js#^1.11.0 archive.tar.gz
bower resolved      https://github.com/FezVrasta/popper.js.git#1.12.9
bower install       bootstrap#4.0.0-beta
bower install       jquery#3.2.1
bower install       popper.js#1.12.9

bootstrap#4.0.0-beta bower_components/bootstrap
├── jquery#3.2.1
└── popper.js#1.12.9

jquery#3.2.1 bower_components/jquery

popper.js#1.12.9 bower_components/popper.js

Запускаем:

$ gulp js

[16:56:31] Using gulpfile ~/web/wpbestdiploms.loc/wp-content/themes/bestdiploms/gulpfile.js
[16:56:31] Starting 'js'...
[16:56:31] Finished 'js' after 21 ms

Наблюдаем появление фалов app.js и app.min.js в папке /bestdiploms/js.

ВСЕ РАБОТАЕТ с Bower.


-----
14. Настраиваем цвета для нового сайта в /bestdiploms/sass/variables-site/_colors.scss.



Автор видеоурока https://www.youtube.com/watch?v=pEJ2IzYOx5c&t=529s

13:05 Предлагает сначала править function.php. Строчки:

    // This theme uses wp_nav_menu() in one location.
    register_nav_menus( array(
      'menu-1' => esc_html__( 'Primary', 'bestdiploms' ),
    ) );

    Корректируем таким образом:

// This theme uses wp_nav_menu() in one location.
    register_nav_menus( array(
      'primary' => esc_html__( 'Primary', 'bestdiploms' ),
    ) );

14:16 Далее можно заменить фон темы (сайта):

    // Set up the WordPress core custom background feature.
    add_theme_support( 'custom-background', apply_filters( 'bestdiploms_custom_background_args', array(
      'default-color' => 'ffffff',
      'default-image' => '',
    ) ) );

    Для bestdiploms.loc делаем так:

    // Set up the WordPress core custom background feature.
    add_theme_support( 'custom-background', apply_filters( 'bestdiploms_custom_background_args', array(
      'default-color' => 'ffffff',
      'default-image' => get_template_directory_uri() . '/images/bg_bodyimg.jpg',
    ) ) );    - все работает, фоновая картинка выводится

16:22 Меняем ширину контента с 640 на 1140:

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function bestdiploms_content_width() {
  $GLOBALS['content_width'] = apply_filters( 'bestdiploms_content_width', 640 ); // Здесь ставим 1140
}
add_action( 'after_setup_theme', 'bestdiploms_content_width', 0 );


17:25 Предлагает перенести функцию регистрации виджетов в отдельный файл
/bestdiploms/inc/widgets.php:

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function bestdiploms_widgets_init() {
  register_sidebar( array(
    'name'          => esc_html__( 'Sidebar', 'bestdiploms' ),
    'id'            => 'sidebar-1',
    'description'   => esc_html__( 'Add widgets here.', 'bestdiploms' ),
    'before_widget' => '<section id="%1$s" class="widget %2$s">',
    'after_widget'  => '</section>',
    'before_title'  => '<h2 class="widget-title">',
    'after_title'   => '</h2>',
  ) );
}
add_action( 'widgets_init', 'bestdiploms_widgets_init' );


Далее предлагает откорректировать эту функцию таким образом:

function bestdiploms_widgets_init() {
  register_sidebar( array(
    'name'          => esc_html__( 'Right Sidebar', 'bestdiploms' ),
    'id'            => 'right-sidebar',
    'description'   => esc_html__( 'Add widgets here.', 'bestdiploms' ),
    'before_widget' => '<section id="%1$s" class="widget %2$s">',
    'after_widget'  => '</section>',
    'before_title'  => '<h2 class="widget-title">',
    'after_title'   => '</h2>',
  ) );
}
add_action( 'widgets_init', 'bestdiploms_widgets_init' );

18:25 Переходим к разделу подключения стилей и скриптов:

/**
 * Enqueue scripts and styles.
 */
function bestdiploms_scripts() {
  wp_enqueue_style( 'bestdiploms-style', get_stylesheet_uri() );

  wp_enqueue_script( 'bestdiploms-app', get_template_directory_uri() . '/js/app.js', array(), '20151215', true );

  wp_enqueue_script( 'bestdiploms-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true );

  wp_enqueue_script( 'bestdiploms-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );

  if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
    wp_enqueue_script( 'comment-reply' );
  }
}
add_action( 'wp_enqueue_scripts', 'bestdiploms_scripts' );

Перед строкой: wp_enqueue_style( 'bestdiploms-style', get_stylesheet_uri() ); пишем в его случае:

wp_enqueue_style( 'bestdiploms-bs-css', get_template_directory_uri() . '/dist/css/bootstrap.min.css' );

Следующей строкой подключаем шрифт FontAwesome:

wp_enqueue_style( 'bestdiploms-fontawesome', get_template_directory_uri() . '/fonts/font-awesome/scc/font-awesome.min.css' );

Далее после строки wp_enqueue_style( 'bestdiploms-style', get_stylesheet_uri() ); через CDN регистрируем скрипт popper.js:

wp_register_script( 'popper', https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.5/umd/popper.min.js', false, '', true );

И на следующей строке подключаем этот скрипт:

wp_enqueue_script( 'popper' );

22:29 Далее он удаляет скрипт navigation.js, а вместо нее ставит следующие строки:

wp_enqueue_script( 'bestdiploms-tether', get_template_directory_uri() . '/src/js/tether.min.js', array(), 20170115, true );

 wp_enqueue_script( 'bestdiploms-bootstrap', get_template_directory_uri() . '/src/js/bootstrap.min.js', array(jquery), 20170915, true ); 

 wp_enqueue_script( 'bestdiploms-bootstrap-hover', get_template_directory_uri() . '/src/js/bootstrap-hover.min.js', array(jquery), 20170115, true );

 wp_enqueue_script( 'bestdiploms-nav-scroll', get_template_directory_uri() . '/src/js/nav-scroll.js', array(jquery), 20170115, true );

После этого он удалил файл navigation.js.

26:10 Подключает созданный файл widgets.php под конец файла function.php: 

/**
 * Widgets File.
 */
require get_template_directory() . '/inc/widgets.php';
