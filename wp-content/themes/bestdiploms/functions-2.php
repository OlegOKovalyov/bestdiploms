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
 * Load Custom Post Types File.
 */
 require get_template_directory() . '/inc/custom-post-types.php';

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
 * Load Theme bestdiploms Admin Panel Settings file.
 */
include('functions/settings.php');

/**
 * Load Dimox Breadcrumbs Function file.
 */
include('functions/d-breadcrumbs.php');

/**
 * Load Front Page Carousel file.
 */
include('functions/fp-carousel.php');



// Дополнительные функции (нужно будет перенести в отдельный файл плагина)

/****** Не используется *******
 * Шорткод. Координаты фирмы, представленной на сайте (телефон и e-mail). Использование:
 * - в админке WordPress (или/или):
 * [details]
 * [details tel="+7-926-631-81-76" email="bestdiplomy@gmail.com"][/details]
 * - в шаблоне WordPress (или/или):
 * <?php echo do_shortcode('[details tel="+7-926-631-81-76" email="bestdiplomy@gmail.com"][/details]'); ?>
 * <?php echo do_shortcode('[details]'); ?>
 */
add_shortcode( 'details', 'show_details');
function show_details( $atts, $content, $tag ) {
	$d_tel = empty( $atts['tel'] ) ? '+7-926-631-81-76' : esc_html( $atts['tel'] );
	$d_email = empty( $atts['email'] ) ? 'bestdiplomy@gmail.com' : esc_html( $atts['email'] );	

	ob_start();
	?>

		<p class="details-tel m-0 pt-1"><a href="tel:<?php echo $d_tel; ?>"><i class="fa fa-phone" aria-hidden="true"></i><?php echo $d_tel; ?></a></p>
        <p class="details-mail m-0 pt-1"><a href="mailto:<?php echo $d_email; ?>"><i class="fa fa-envelope" aria-hidden="true"></i><?php echo $d_email; ?></a></p>

	<?php 
	return ob_get_clean();
}


/**
 * Шорткод. Форма обратной связи Заказать диплом (Главная страница). Использование:
 * - в админке WordPress:
 * [orderform]
 * <?php echo do_shortcode('[orderform]'); ?>
 */
add_shortcode( 'orderform', 'show_orderform');
function show_orderform( $atts, $content, $tag ) {

	ob_start();
	?>

		<div class="wrap-form-order row flex-column">
			<h4>Заказать диплом</h4>

			<div class="form-oder d-flex flex-column align-self-center">
				<input type="text" class="form-control" placeholder="Ваше имя">
				<input type="text" class="form-control" placeholder="Телефон или e-mail">
				<select id="inputState" class="form-control">
					<option selected>Тип документа</option>
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
				</select>

				<a class="btn btn-danger" href="#" role="button"><i class="fa fa-angle-right" aria-hidden="true"></i>
 Заказать <i class="fa fa-angle-left" aria-hidden="true"></i></a>

			</div><!-- .form-bar -->
		</div><!-- .row -->

	<?php 
	return ob_get_clean();
}


/**
 * Шорткод. Форма обратной связи Задать вопрос (Вопросы и ответы, Статьи). Использование:
 * - в админке WordPress:
 * [faqorderform]
 * <?php echo do_shortcode('[faqorderform]'); ?>
 */
add_shortcode( 'faqorderform', 'show_faqorderform');
function show_faqorderform( $atts, $content, $tag ) {

	ob_start();
	?>

		<div class="wrap-faq-form-order row flex-column">
			<h4>Задать вопрос</h4>

			<div class="form-oder d-flex flex-column align-self-center">
				<input type="text" class="form-control" placeholder="Ваше имя">
				<input type="text" class="form-control" placeholder="Телефон или e-mail">
			    <textarea type="textarea" class="form-control" placeholder="Текст вопроса" id="FormControlTextarea1" rows="3"></textarea>

				<a class="btn btn-danger" href="#" role="button"><i class="fa fa-angle-right" aria-hidden="true"></i>
 Отправить <i class="fa fa-angle-left" aria-hidden="true"></i></a>

			</div><!-- .form-bar -->
		</div><!-- .row -->

	<?php 
	return ob_get_clean();
}

/**
 * Шорткод. Форма обратной связи Написать отзыв (Отзывы страница). Использование:
 * - в админке WordPress:
 * [revorderform]
 * <?php echo do_shortcode('[revorderform]'); ?>
 */
add_shortcode( 'revorderform', 'show_revorderform');
function show_revorderform( $atts, $content, $tag ) {

	ob_start();
	?>

		<div class="wrap-rev-form-order row flex-column">
			<h4>Написать отзыв</h4>

			<div class="form-oder d-flex flex-column align-self-center">
				<input type="text" class="form-control" placeholder="Ваше имя">
				<input type="text" class="form-control" placeholder="Телефон или e-mail">
			    <textarea type="textarea" class="form-control" placeholder="Текст вопроса" id="FormControlTextarea1" rows="3"></textarea>

				<a class="btn btn-danger" href="#" role="button"><i class="fa fa-angle-right" aria-hidden="true"></i>
 Отправить <i class="fa fa-angle-left" aria-hidden="true"></i></a>

			</div><!-- .form-bar -->
		</div><!-- .row -->

	<?php 
	return ob_get_clean();
}


/****** Не используется (рвбочий код ) *******
 * Шорткод. Вывод карусели Owl Carousel на главной странице сайта WordPress
 * (Front Page Carousel). На данный момент используется функция fp-carousel();
 * Использование:
 * - в админке WordPress:
 * [fpcarousel]
 * - в шаблоне WordPress:
 * <?php echo do_shortcode('[fpcarousel]'); ?>
 */
add_shortcode( 'fpcarousel', 'show_fpcarousel');
function show_fpcarousel( $atts, $content, $tag ) {
	ob_start(); ?>	
		<div class="row">
			<div class="carousel-block col-lg-12"><!-- Здесь будет карусель -->

				<!-- Owl-Carousel -->
				<div class="owl-carousel owl-theme">

				    <?php 
				    // Displaying the Custom Post 'study' in Owl Carousel (can display anywhere). 
				        $args = array(
				        	'order'			 	=> 'ASC',
				            'post_type' 		=> 'study',
				            //'category_name' 	=> 'education-all', // Все виды образования
				            //'category_name' 	=> 'education1',
				            //'category_name' 	=> 'education2',
				            'category_name' 	=> 'documents-pop', // Самые популярные документы
				        );  
				        $your_loop = new WP_Query( $args ); 

				        if ( $your_loop->have_posts() ) : while ( $your_loop->have_posts() ) : $your_loop->the_post(); 
				        $meta = get_post_meta( $post->ID, '', true ); ?>

				        <?php $value1 = get_post_field( "make" );
				        	  $value2 = get_post_field( "gznk-price" );
				        	  $value = get_post_field( "price" );
				        ?>

				        <?php
							// если мы на странице категории
							if( is_category() )
								echo get_queried_object()->name;
				        ?>

						<div class="doc-item">
					    	<!-- contents of Your Post -->
					        <h4 class="doc-item-title"><?php the_title(); ?></h4>
					        <p class="doc-item-year"><?php echo $value1; ?></p>
					        <a href="#" target="_blank" rel="noopener">
					            <?php if ( has_post_thumbnail() ) {
					                the_post_thumbnail();
					            } ?>
					        </a>
					        <?php
					            if( $value || $value2 ) {
					                echo '<p class="doc-price-gznk">' . $value2 . '</p>';
					                echo '<p class="doc-price-tpgrf">' . $value . '</p>';
					            } else {
					                echo '<p>empty</p>';
					        } ?>
					        <span class="doc-item-content"><?php the_content(); ?></span>
					        <a class="btn btn-danger" href="#" role="button">Заказать</a>
						</div><!-- .doc-item -->

				    <?php endwhile; endif; wp_reset_postdata(); ?>  

				</div><!-- .owl-carousel .owl-theme -->
				<!-- /Owl-Carousel -->

			</div><!-- .carousel-block -->
		</div><!-- .row -->
	<?php 
	return ob_get_clean();
}

//Creating a Function to Display Reviews in Sidebars
function reviews_in_sidebars() {
     
    $args = array(
        'post_type' => 'reviews'
    ); ?>
     
	<p class="widget-title">Отзывы наших клиентов</p>

    <?php 
    $query = new WP_query ( $args );
    if ( $query->have_posts() ) { ?>
 
        <?php while ( $query->have_posts() ) : $query->the_post(); /* start the loop */ ?>
      
					<?php	$value1 = get_post_field( "rev-name" ); // Meta-box for Review Author Name
						$value2 = get_post_field( "rev-email" ); // Meta-box for Review Author Email
						$value = get_post_field( "rev-date" );	// Meta-box for Review Date
					    if( $value || $value2 ) { 
					?>

					<section>
					    <div class="rev-props">
					        <h5 class="rev-item-name"><?php echo $value1; ?>
					        	<span class="rev-item-date"> <?php echo $value; ?></span>
					        </h5>

					        <?php the_content() ?>			            


					        <!-- <a class="btn btn-danger" href="#" role="button">Заказать</a> -->
					        <?php  }  ?>
							

					    </div><!-- .rev-props -->
					</section>

					    <?php endwhile; /*endif;*/ wp_reset_postdata();   
    }
}


// This custom function should help removing all links in the header and footer.
function remove_json_api () {

    // Remove the REST API lines from the HTML Header
    remove_action( 'wp_head', 'rest_output_link_wp_head', 10 );
    remove_action( 'wp_head', 'wp_oembed_add_discovery_links', 10 );

    // Remove the REST API endpoint.
    remove_action( 'rest_api_init', 'wp_oembed_register_route' );

    // Turn off oEmbed auto discovery.
    add_filter( 'embed_oembed_discover', '__return_false' );

    // Don't filter oEmbed results.
    remove_filter( 'oembed_dataparse', 'wp_filter_oembed_result', 10 );

    // Remove oEmbed discovery links.
    remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );

    // Remove oEmbed-specific JavaScript from the front-end and back-end.
    remove_action( 'wp_head', 'wp_oembed_add_host_js' );

   // Remove all embeds rewrite rules.
   add_filter( 'rewrite_rules_array', 'disable_embeds_rewrites' );

}
add_action( 'after_setup_theme', 'remove_json_api' );

// And this snippet completely disable the REST API and shows {"code":"rest_disabled","message":"The REST API is disabled on this site."} when visiting http://yoursite.com/wp-json/
function disable_json_api () {

  // Filters for WP-API version 1.x
  add_filter('json_enabled', '__return_false');
  add_filter('json_jsonp_enabled', '__return_false');

  // Filters for WP-API version 2.x
  add_filter('rest_enabled', '__return_false');
  add_filter('rest_jsonp_enabled', '__return_false');

}
add_action( 'after_setup_theme', 'disable_json_api' );