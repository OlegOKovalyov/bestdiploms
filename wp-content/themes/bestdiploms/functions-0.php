<?php
/**
 * Best Diploms functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Best_Diploms
 */

if ( ! function_exists( 'bestdiploms_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function bestdiploms_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Best Diploms, use a find and replace
		 * to change 'bestdiploms' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'bestdiploms', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location. I added more menus.
		register_nav_menus( array(
			'primary' => esc_html__( 'Primary', 'bestdiploms' ),
			'lsb-1'	  => esc_html__( 'Первое меню левого сайдбара', 'bestdiploms' ),
			'lsb-2'	  => esc_html__( 'Второе меню левого сайдбара', 'bestdiploms' ),
			'lsb-3'	  => esc_html__( 'Третье меню левого сайдбара', 'bestdiploms' ),
			'lsb-4'	  => esc_html__( 'Четвертое меню левого сайдбара', 'bestdiploms' ),
			'lsb-bottom'	  => esc_html__( 'Нижнее меню левого сайдбара', 'bestdiploms' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'bestdiploms_custom_background_args', array(
			'default-color' => 'ffffff',
			/*'default-image' => get_template_directory_uri() . '/images/bg_site.png',*/
			'default-image' => '%s/images/bg_site.png',
			'default-position-x' => 'center',
			'default-size' => 'contain',
            'default-repeat' => 'no-repeat',
            /*'flex-width' => true,*/
            'width' => 1352
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 259, //250,
			'width'       => 173, //250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
	}
endif;
add_action( 'after_setup_theme', 'bestdiploms_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function bestdiploms_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'bestdiploms_content_width', 1140 );
}
add_action( 'after_setup_theme', 'bestdiploms_content_width', 0 );

/**
 * Enqueue scripts and styles.
 */
function bestdiploms_scripts() {
	wp_enqueue_style( 'bestdiploms-style', get_stylesheet_uri() );
	
	/*wp_enqueue_style( 'bestdiploms-roboto', get_template_directory_uri() . '/fonts/roboto/font-awesome.min.css' );*/
	
	wp_enqueue_style( 'roboto', 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&amp;subset=cyrillic', false, false, 'all');
	
	wp_enqueue_style( 'bestdiploms-fontawesome', get_template_directory_uri() . '/fonts/font-awesome/css/font-awesome.min.css' );
	
	wp_enqueue_script( 'jquery' );

	wp_enqueue_script( 'bestdiploms-app', get_template_directory_uri() . '/js/app.js', array(), '20151215', true );

	wp_enqueue_script( 'bestdiploms-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true );

	wp_enqueue_script( 'bestdiploms-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'bestdiploms_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/*
 * Load Widgets File.
 */
 require get_template_directory() . '/inc/widgets.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

/**
 * Шорткод. Координаты фирмы, представленной на сайте (телефон и e-mail). Использование:
 * - в админке WordPress (или/или):
 * [details]
 * [details tel="+7-926-631-81-76" email="bestdiplomy@gmail.com"][/details]
 * - в шаблоне WordPress:
 * <?php echo do_shortcode('[details tel="+7-926-631-81-76" email="bestdiplomy@gmail.com"][/details]'); ?>
 * <?php echo do_shortcode('[details]'); ?>
 */
add_shortcode( 'details', 'show_details');
function show_details( $atts, $content, $tag ) {
	$d_tel = empty( $atts['tel'] ) ? '+7-926-631-81-76' : esc_html( $atts['tel'] );
	$d_email = empty( $atts['email'] ) ? 'bestdiplomy@gmail.com' : esc_html( $atts['email'] );	

	ob_start();
	?>

		<p class="details-tel m-0 pt-1"><a href="tel:<?php echo esc_html( $atts['tel'] ); ?>"><i class="fa fa-phone" aria-hidden="true"></i><?php echo esc_html( $atts['tel'] ); ?></a></p>
        <p class="details-mail m-0 pt-1"><a href="mailto:<?php echo esc_html( $atts['email'] ); ?>"><i class="fa fa-envelope" aria-hidden="true"></i><?php echo esc_html( $atts['email'] ); ?></a></p>

	<?php 
	return ob_get_clean();
}