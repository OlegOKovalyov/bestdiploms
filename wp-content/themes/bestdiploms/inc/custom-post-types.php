<?php

/**
 * Таксономия и пользовательский тип записи Документы (study).
 */
// 1. Регистрация новой таксономии (отсутствует).
// 2. Регистрация пользовательского типа записи Документы (study).
// At the top of functions.php you need to register your post type first.
add_action( 'init', function() {
    $type = 'study';
    $labels = xcompile_post_type_labels('Документ', 'Документы');
    
    // Declare what the post type supports
    $supports = ['title', 'editor', 'revisions', 'page-attributes', 'thumbnail', 'post-formats', 'excerpt'/*, 'custom-fields'*/];

    $arguments = [
        'taxonomies' => ['post_tag', 'category', 'study'], // Add post tags and post categories
        'register_meta_box_cb' => 'study_meta_box', // Register a meta box
        //'register_meta_box_cb' => 'custom_meta_box_markup', // Register a meta box        
        'rewrite' => [ 'slug' => 'study' ], // Change the archive page URL
        'has_archive' => true, // Enable archive page
        'rest_base' => 'study',
        'show_in_rest' => true,
        'hierarchical' => true,
        'supports' => $supports,
        'public' => true,
        'description' => 'СPT для отдельных документов, представленных на сайте (например, дипломы, аттестаты, справки, свидетельства).',
        'menu_icon' => 'dashicons-media-document',
        'labels'  => $labels,
    ];
    register_post_type( $type, $arguments);
});

// Labeling.
// Customize our post type labels within the admin. By default, WordPress will 
// label our new post type as "Post" almost everywhere. We need the labels to be 
// primarily marked as "Study", not "Post".
function xcompile_post_type_labels($singular = 'Post', $plural = 'Posts') {
    //$p_lower = strtolower($plural);
    $p_lower = mb_convert_case($plural, MB_CASE_LOWER, "UTF-8");    
    //$s_lower = strtolower($singular);
    $s_lower = mb_convert_case($singular, MB_CASE_LOWER, "UTF-8");

    return [
        'name' => $plural,
        'singular_name' => $singular,
        'add_new_item' => "Новый $s_lower",
        'edit_item' => "Редактировать $s_lower",
        'view_item' => "Смотреть $s_lower",
        'view_items' => "Смотреть $p_lower",
        'search_items' => "Искать $p_lower",
        'not_found' => "$plural не найдены",
        'not_found_in_trash' => "$plural не найдены в корзине",
        'parent_item_colon' => "Родительский $s_lower",
        'all_items' => "Все $p_lower",
        'archives' => "Архивный $s_lower",
        'attributes' => "Атрибуты $s_lower" . "а",
        'insert_into_item' => "Вставить в $s_lower",
        'uploaded_to_this_item' => "Загружено в этот $s_lower",
    ];
}

// 3. Создание метабоксов для пользовательского типа записей Документы (study) в админпанели.
// Метабоксы:
// 1) Год выпуска
// 2) Бланк ГОЗНАК цена Р
// 3) Типографский цена Р
// The function for register_meta_box_cb
// Add form and basic text field
function study_meta_box(WP_Post $post) {
    add_meta_box('study_meta', 'Характеристики документа', function() use ($post) {
        $field_name1 = 'make';
        $field_name2 = 'gznk-price';
        $field_name = 'price';
        $field_name3 = 'iframe-html';
        $field_value1 = get_post_meta($post->ID, $field_name1, true);
        $field_value2 = get_post_meta($post->ID, $field_name2, true);
        $field_value = get_post_meta($post->ID, $field_name, true);
        $field_value3 = get_post_meta($post->ID, $field_name3, true);
        wp_nonce_field('study_nonce', 'study_nonce');
        ?>
        
        <p><label for="<?php echo $field_name1; ?>">Год выпуска (пример: "2014 - 2017 года выпуска"):</label></p>
        <p>
            <input id="<?php echo $field_name1; ?>"
                   name="<?php echo $field_name1; ?>"
                   type="text"
                   value="<?php echo esc_attr($field_value1); ?>"
            />
        </p>   

        <p><label for="<?php echo $field_name2; ?>">ГОЗНАК (пример: "Бланк ГОЗНАК 22 000 Р"):</label></p>
        <p>
            <input id="<?php echo $field_name2; ?>"
                   name="<?php echo $field_name2; ?>"
                   type="text"
                   value="<?php echo esc_attr($field_value2); ?>"
            />
        </p>             

        <p><label for="<?php echo $field_name; ?>">Типографский (пример: "Типографский 15 000 Р":</label></p>
        <p>
            <input id="<?php echo $field_name; ?>"
                   name="<?php echo $field_name; ?>"
                   type="text"
                   value="<?php echo esc_attr($field_value); ?>"
            />
        </p>

        <p><label for="<?php echo $field_name3; ?>">Поле для ввода внешнего видео-контента (iframe)</label></p>
        <p>
            <input id="<?php echo $field_name3; ?>"
                   name="<?php echo $field_name3; ?>"
                   type="textarea" style="width:100%;min-height:2rem;"
                   value="<?php echo esc_attr($field_value3); ?>"
            />
        </p>        
       
        <?php
    });
}

// Check for empty string allowing for a value of `0` -> Working!
function empty_str( $str ) {
    return ! isset( $str ) || $str === "";
}

// Save and delete meta but not when restoring a revision
add_action('save_post', function($post_id){
    $post = get_post($post_id);
    $is_revision = wp_is_post_revision($post_id);
    $field_name1 = 'make';
    $field_name2 = 'gznk-price';
    $field_name = 'price';
    $field_name3 = 'iframe-html';

    // Do not save meta for a revision or on autosave
    if ( $post->post_type != 'study' || $is_revision )
        return;

    // Do not save meta if fields are not present,
    // like during a restore.
    if( !isset($_POST[$field_name1]) )
        return;
    if( !isset($_POST[$field_name2]) )
        return;
    if( !isset($_POST[$field_name]) )
        return;
    if( !isset($_POST[$field_name3]) )
        return;               

    // Secure with nonce field check
    if( ! check_admin_referer('study_nonce', 'study_nonce') )
        return;

    // Clean up data
    $field_value1 = trim($_POST[$field_name1]);
    $field_value2 = trim($_POST[$field_name2]);
    $field_value = trim($_POST[$field_name]);    
    $field_value3 = trim($_POST[$field_name3]);    

    // Do the saving and deleting
    if( ! empty_str( $field_value1 ) ) {
        update_post_meta($post_id, $field_name1, $field_value1);
    } elseif( empty_str( $field_value1 ) ) {
        delete_post_meta($post_id, $field_name1);
    }

    if( ! empty_str( $field_value2 ) ) {
        update_post_meta($post_id, $field_name2, $field_value2);
    } elseif( empty_str( $field_value2 ) ) {
        delete_post_meta($post_id, $field_name2);
    }    
    
    if( ! empty_str( $field_value ) ) {
        update_post_meta($post_id, $field_name, $field_value);
    } elseif( empty_str( $field_value ) ) {
        delete_post_meta($post_id, $field_name);
    }

    if( ! empty_str( $field_value3 ) ) {
        update_post_meta($post_id, $field_name3, $field_value3);
    } elseif( empty_str( $field_value3 ) ) {
        delete_post_meta($post_id, $field_name3);
    }      

} , 10, 4);

// 4. Регистрируем функцию подключения шаблона для вывода CPT 'study'. 
add_filter( 'template_include', 'include_template_function', 1 );
function include_template_function( $template_path ) {
    if ( get_post_type() == 'study' ) {
        if ( is_single() ) {
            // checks if the file exists in the theme first,
            // otherwise serve the file from the plugin
            if ( $theme_file = locate_template( array ( 'single-study.php' ) ) ) {
                $template_path = $theme_file;
            } else {
                $template_path = plugin_dir_path( __FILE__ ) . '/single-study.php';
            }
        }
    }
    return $template_path;
}

/**
 * Таксономия и пользовательский тип записи Статьи (article).
 */
// 1. Регистрация новой таксономии (отсутствует).

// 2. Регистрация пользовательского типа записи Статьи (article).
// At the top of functions.php you need to register your post type first.
add_action( 'init', function() {
    $type = 'article';
    $labels = xcompile_articles_post_type_labels('Статья', 'Статьи');
    
    // Declare what the post type supports
    $supports = ['title', 'editor', 'revisions', 'page-attributes', 'thumbnail', 'post-formats'/*, 'custom-fields'*/];

    $arguments = [
        'taxonomies' => ['post_tag', 'category', 'article'], // Add post tags and post categories
        //'register_meta_box_cb' => 'article_meta_box', // Register a meta box
        //'register_meta_box_cb' => 'custom_meta_box_markup', // Register a meta box        
        'rewrite' => [ 'slug' => 'article' ], // Change the archive page URL
        'has_archive' => true, // Enable archive page
        'rest_base' => 'article',
        'show_in_rest' => true,
        'hierarchical' => true,
        'supports' => $supports,
        'public' => true,
        'description' => 'СPT для отдельных статей, представленных на сайте (например, Купить диплом в Перми, Купить диплом в Уфе).',
        'menu_icon' => 'dashicons-media-text',
        'labels'  => $labels,
    ];
    register_post_type( $type, $arguments);
});

// Labeling.
// Customize our post type labels within the admin. By default, WordPress will 
// label our new post type as "Post" almost everywhere. We need the labels to be 
// primarily marked as "Study", not "Post".
function xcompile_articles_post_type_labels($singular = 'Post', $plural = 'Posts') {
    //$p_lower = strtolower($plural);
    $p_lower = mb_convert_case($plural, MB_CASE_LOWER, "UTF-8");    
    //$s_lower = strtolower($singular);
    $s_lower = mb_convert_case($singular, MB_CASE_LOWER, "UTF-8");

    return [
        'name' => $plural,
        'singular_name' => $singular,
        'add_new_item' => "Новая $s_lower",
        'edit_item' => "Редактировать",
        'view_item' => "Смотреть",
        'view_items' => "Смотреть $p_lower",
        'search_items' => "Искать $p_lower",
        'not_found' => "$plural не найдены",
        'not_found_in_trash' => "$plural не найдены в корзине",
        'parent_item_colon' => "Родительская $s_lower",
        'all_items' => "Все $p_lower",
        'archives' => "Архивная $s_lower",
        'attributes' => "Атрибуты $p_lower",
        'insert_into_item' => "Вставить",
        'uploaded_to_this_item' => "Загружено",
    ];
}

/**
 * Таксономия и пользовательский тип записи ЧаВо (faqposts).
 */
// 1. Регистрация новой таксономии (отсутствует).

// 2. Регистрация пользовательского типа записи ЧаВо (faqposts).
// At the top of functions.php you need to register your post type first.
add_action( 'init', function() {
    $type = 'faqposts';
    $labels = xcompile_faq_post_type_labels('ЧаВо', 'ЧаВо');
    
    // Declare what the post type supports
    $supports = ['title', 'editor', 'revisions', 'page-attributes', 'thumbnail', /*'post-formats',*/  'excerpt', 'revisions'/*, 'custom-fields'*/];

    $arguments = [
        'taxonomies' => ['post_tag', 'category'], // Add post tags and post categories
        //'register_meta_box_cb' => 'article_meta_box', // Register a meta box
        //'register_meta_box_cb' => 'custom_meta_box_markup', // Register a meta box        
        'rewrite' => [ 'slug' => 'faqposts' ], // Change the archive page URL
        'has_archive' => true, // Enable archive page
        /*'rest_base' => 'docs',*/
        'show_in_rest' => true,
        'hierarchical' => false,
        'supports' => $supports,
        'public' => true,
        'description' => 'СPT для Вопросов и ответов, представленных на сайте.',
        'menu_icon' => 'dashicons-format-chat',
        'labels'  => $labels,
    ];
    register_post_type( $type, $arguments);
});

// Labeling.
// Customize our post type labels within the admin. By default, WordPress will 
// label our new post type as "Post" almost everywhere. We need the labels to be 
// primarily marked as "Study", not "Post".
function xcompile_faq_post_type_labels($singular = 'Post', $plural = 'Posts') {
    //$p_lower = strtolower($plural);
    $p_lower = mb_convert_case($plural, MB_CASE_LOWER, "UTF-8");    
    //$s_lower = strtolower($singular);
    $s_lower = mb_convert_case($singular, MB_CASE_LOWER, "UTF-8");

    return [
        'name' => $plural,
        'singular_name' => $singular,
        'add_new_item' => "Новая $s_lower",
        'edit_item' => "Редактировать",
        'view_item' => "Смотреть",
        'view_items' => "Смотреть $p_lower",
        'search_items' => "Искать $p_lower",
        'not_found' => "$plural не найдены",
        'not_found_in_trash' => "$plural не найдены в корзине",
        'parent_item_colon' => "Родительская $s_lower",
        'all_items' => "Все $p_lower",
        'archives' => "Архивная $s_lower",
        'attributes' => "Атрибуты $p_lower",
        'insert_into_item' => "Вставить",
        'uploaded_to_this_item' => "Загружено",
    ];
}

/**
 * Таксономия и пользовательский тип записи Отзывы (reviews). - Можно удалить (будем использовать Комментарии)
 * Можно превратить в Города.
 */
// 1. Регистрация новой таксономии (отсутствует).

// 2. Регистрация пользовательского типа записи Отзывы (reviews).
// At the top of functions.php you need to register your post type first.
add_action( 'init', function() {
    $type = 'reviews';
    $labels = xcompile_reviews_post_type_labels('Отзыв', 'Отзывы');
    
    // Declare what the post type supports
    $supports = ['title', 'editor', 'revisions', 'page-attributes', 'thumbnail', 'post-formats'/*, 'custom-fields'*/];

    $arguments = [
        'taxonomies' => ['post_tag', 'category'], // Add post tags and post categories
        'register_meta_box_cb' => 'reviews_meta_box', // Register a meta box
        //'register_meta_box_cb' => 'custom_meta_box_markup', // Register a meta box        
        'rewrite' => [ 'slug' => 'reviews' ], // Change the archive page URL
        'has_archive' => true, // Enable archive page
        /*'rest_base' => 'docs',*/
        'show_in_rest' => true,
        'hierarchical' => true,
        'supports' => $supports,
        'public' => true,
        'description' => 'СPT для отзывов на сайте.',
        'menu_icon' => 'dashicons-testimonial',
        'labels'  => $labels,
    ];
    register_post_type( $type, $arguments);
});

// Labeling.
// Customize our post type labels within the admin. By default, WordPress will 
// label our new post type as "Post" almost everywhere. We need the labels to be 
// primarily marked as "Study", not "Post".
function xcompile_reviews_post_type_labels($singular = 'Post', $plural = 'Posts') {
    //$p_lower = strtolower($plural);
    $p_lower = mb_convert_case($plural, MB_CASE_LOWER, "UTF-8");    
    //$s_lower = strtolower($singular);
    $s_lower = mb_convert_case($singular, MB_CASE_LOWER, "UTF-8");

    return [
        'name' => $plural,
        'singular_name' => $singular,
        'add_new_item' => "Новый $s_lower",
        'edit_item' => "Редактировать",
        'view_item' => "Смотреть",
        'view_items' => "Смотреть $p_lower",
        'search_items' => "Искать $p_lower",
        'not_found' => "$plural не найдены",
        'not_found_in_trash' => "$plural не найдены в корзине",
        'parent_item_colon' => "Родительский $s_lower",
        'all_items' => "Все $p_lower",
        'archives' => "Архивный $s_lower",
        'attributes' => "Атрибуты $p_lower"."а",
        'insert_into_item' => "Вставить",
        'uploaded_to_this_item' => "Загружено",
    ];
}

// 3. Создание метабоксов для пользовательского типа записей Эталаж (etalage) в админпанели.
// Метабоксы:
// 1) Год выпуска
// 2) Бланк ГОЗНАК цена Р
// 3) Типографский цена Р
// The function for register_meta_box_cb
// Add form and basic text field
function reviews_meta_box(WP_Post $post) {
    add_meta_box('study_meta', 'Данные отзыва', function() use ($post) {
        $field_name1 = 'rev-name'; // Meta-box for Review Author Name
        $field_name2 = 'rev-email'; // Meta-box for Review Author Email
        $field_name = 'rev-date'; // Meta-box for Review Date
        $field_value1 = get_post_meta($post->ID, $field_name1, true);
        $field_value2 = get_post_meta($post->ID, $field_name2, true);
        $field_value = get_post_meta($post->ID, $field_name, true);
        wp_nonce_field('reviews_nonce', 'reviews_nonce');
        ?>
        
        <p><label for="<?php echo $field_name1; ?>">Имя автора отзыва (пример: "Элеонора Владимировна"):</label></p>
        <p>
            <input id="<?php echo $field_name1; ?>"
                   name="<?php echo $field_name1; ?>"
                   type="text"
                   value="<?php echo esc_attr($field_value1); ?>"
            />
        </p>   

        <p><label for="<?php echo $field_name2; ?>">E-mail автора отзыва (пример: "eleonora@mail.ru"):</label></p>
        <p>
            <input id="<?php echo $field_name2; ?>"
                   name="<?php echo $field_name2; ?>"
                   type="text"
                   value="<?php echo esc_attr($field_value2); ?>"
            />
        </p>             

        <p><label for="<?php echo $field_name; ?>">Дата отзыва (пример: "15.11.2017":</label></p>
        <p>
            <input id="<?php echo $field_name; ?>"
                   name="<?php echo $field_name; ?>"
                   type="text"
                   value="<?php echo esc_attr($field_value); ?>"
            />
        </p>
       
        <?php
    });
}

// Check for empty string allowing for a value of `0` -> Working!
function empty_str_reviews( $str ) {
    return ! isset( $str ) || $str === "";
}

// Save and delete meta but not when restoring a revision
add_action('save_post', function($post_id){
    $post = get_post($post_id);
    $is_revision = wp_is_post_revision($post_id);
    $field_name1 = 'rev-name';
    $field_name2 = 'rev-email';
    $field_name = 'rev-date';

    // Do not save meta for a revision or on autosave
    if ( $post->post_type != 'reviews' || $is_revision )
        return;

    // Do not save meta if fields are not present,
    // like during a restore.
    if( !isset($_POST[$field_name1]) )
        return;
    if( !isset($_POST[$field_name2]) )
        return;
    if( !isset($_POST[$field_name]) )
        return;        

    // Secure with nonce field check
    if( ! check_admin_referer('reviews_nonce', 'reviews_nonce') )
        return;

    // Clean up data
    $field_value1 = trim($_POST[$field_name1]);
    $field_value2 = trim($_POST[$field_name2]);
    $field_value = trim($_POST[$field_name]);    

    // Do the saving and deleting
    if( ! empty_str_reviews( $field_value1 ) ) {
        update_post_meta($post_id, $field_name1, $field_value1);
    } elseif( empty_str_reviews( $field_value1 ) ) {
        delete_post_meta($post_id, $field_name1);
    }

    if( ! empty_str_reviews( $field_value2 ) ) {
        update_post_meta($post_id, $field_name2, $field_value2);
    } elseif( empty_str_reviews( $field_value2 ) ) {
        delete_post_meta($post_id, $field_name2);
    }    
    
    if( ! empty_str_reviews( $field_value ) ) {
        update_post_meta($post_id, $field_name, $field_value);
    } elseif( empty_str_reviews( $field_value ) ) {
        delete_post_meta($post_id, $field_name);
    }    
} , 10, 3);

/**
 * Таксономия и пользовательский тип записи Города (cities).
 */
// 1. Регистрация новой таксономии (отсутствует).

// 2. Регистрация пользовательского типа записи Города (cities).
// At the top of functions.php you need to register your post type first.
add_action( 'init', function() {
    $type = 'cities';
    $labels = xcompile_cities_post_type_labels('Город', 'Города');
    
    // Declare what the post type supports
    $supports = ['title', 'editor', 'revisions', 'page-attributes', 'thumbnail', 'post-formats'/*, 'custom-fields'*/];

    $arguments = [
        'taxonomies' => ['post_tag', 'category'], // Add post tags and post categories
        //'register_meta_box_cb' => 'article_meta_box', // Register a meta box
        //'register_meta_box_cb' => 'custom_meta_box_markup', // Register a meta box        
        'rewrite' => [ 'slug' => 'cities' ], // Change the archive page URL
        'has_archive' => true, // Enable archive page
        /*'rest_base' => 'docs',*/
        //'show_in_rest' => true,
        'hierarchical' => true,
        'supports' => $supports,
        'public' => true,
        'description' => 'СPT для ссылок на города',
        'menu_icon' => 'dashicons-location-alt',
        'labels'  => $labels,
    ];
    register_post_type( $type, $arguments);
});

// Labeling.
// Customize our post type labels within the admin. By default, WordPress will 
// label our new post type as "Post" almost everywhere. We need the labels to be 
// primarily marked as "Study", not "Post".
function xcompile_cities_post_type_labels($singular = 'Post', $plural = 'Posts') {
    //$p_lower = strtolower($plural);
    $p_lower = mb_convert_case($plural, MB_CASE_LOWER, "UTF-8");    
    //$s_lower = strtolower($singular);
    $s_lower = mb_convert_case($singular, MB_CASE_LOWER, "UTF-8");

    return [
        'name' => $plural,
        'singular_name' => $singular,
        'add_new_item' => "Новый $s_lower",
        'edit_item' => "Редактировать",
        'view_item' => "Смотреть",
        'view_items' => "Смотреть $p_lower",
        'search_items' => "Искать $p_lower",
        'not_found' => "$plural не найдены",
        'not_found_in_trash' => "$plural не найдены в корзине",
        'parent_item_colon' => "Родительский $s_lower",
        'all_items' => "Все $p_lower",
        'archives' => "Архивный $s_lower",
        'attributes' => "Атрибуты $p_lower",
        'insert_into_item' => "Вставить",
        'uploaded_to_this_item' => "Загружено",
    ];
}