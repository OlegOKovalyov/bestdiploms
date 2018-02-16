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
		/*if ( function_exists( 'add_theme_support' ) ) {
			add_theme_support( 'post-thumbnails' );
			set_post_thumbnail_size( 128, 128 );
		}*/
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location. I added more menus.
		register_nav_menus( array(
			'primary' => esc_html__( 'Primary', 'bestdiploms' ),
			/*'lsb-1'	  => esc_html__( 'Первое меню левого сайдбара', 'bestdiploms' ),
			'lsb-2'	  => esc_html__( 'Второе меню левого сайдбара', 'bestdiploms' ),
			'lsb-3'	  => esc_html__( 'Третье меню левого сайдбара', 'bestdiploms' ),
			'lsb-4'	  => esc_html__( 'Четвертое меню левого сайдбара', 'bestdiploms' ),
			'lsb-bottom'	  => esc_html__( 'Нижнее меню левого сайдбара', 'bestdiploms' ),*/
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

	wp_enqueue_style( 'bestdiploms-fancybox3', get_template_directory_uri() . '/bower_components/fancybox/dist/jquery.fancybox.min.css' );	
	
	wp_enqueue_script( 'jquery' );

	wp_enqueue_script( 'bestdiploms-fancybox3', get_template_directory_uri() . '/bower_components/fancybox/dist/jquery.fancybox.min.js', array(), '20151215', true );	

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
include('functions/site-carousels.php');

/**
 * Load Site Shortcodes file.
 */
include('functions/site-shortcodes.php');


/**
 * Создаем метаблок для всех страниц сайта (использоваться будет только на странице Отзывы)
 */
// подключаем функцию активации мета блока (my_extra_fields)
add_action('add_meta_boxes', 'my_extra_fields', 1);

function my_extra_fields() {
	add_meta_box( 'extra_fields', 'Дополнительное поле', 'extra_fields_box_func', 'page', 'normal', 'high'  );
}


// код блока
function extra_fields_box_func( $post ){
	?>

	<p>Дополнительный текст внизу страницы Отзывы (description):
		<textarea type="text" name="extra[description]" style="width:100%;height:50px;"><?php echo get_post_meta($post->ID, 'description', 1); ?></textarea>
	</p>
	<!-- Сохранение данных произвольных полей в таблице wp_postmeta БД WordPress -->
	<input type="hidden" name="extra_fields_nonce" value="<?php echo wp_create_nonce(__FILE__); ?>" />
	<?php
}

// включаем обновление полей при сохранении
add_action('save_post', 'my_extra_fields_update', 0);

/* Сохраняем данные, при сохранении поста */
function my_extra_fields_update( $post_id ){
	if ( ! wp_verify_nonce($_POST['extra_fields_nonce'], __FILE__) ) return false; // проверка
	if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE  ) return false; // выходим если это автосохранение
	if ( !current_user_can('edit_post', $post_id) ) return false; // выходим если юзер не имеет право редактировать запись

	if( !isset($_POST['extra']) ) return false; // выходим если данных нет

	// Все ОК! Теперь, нужно сохранить/удалить данные
	$_POST['extra'] = array_map('trim', $_POST['extra']); // чистим все данные от пробелов по краям
	foreach( $_POST['extra'] as $key=>$value ){
		if( empty($value) ){
			delete_post_meta($post_id, $key); // удаляем поле если значение пустое
			continue;
		}

		update_post_meta($post_id, $key, $value); // add_post_meta() работает автоматически
	}
	return $post_id;
}


/**
 *  Функции для вывода виджетов в левом (primary) сайдбаре сайта
 *
 */

// Creating a Function to Display otherdoc (Другие документы) in Sidebars
function otherdoc_in_sidebars() { ?>
	    <div class="study-cats">	    
	     
		    <?php $extra_args = array(
		    	'order'			 => 'ASC',
		        'post_parent'	 => 524,
		        'post_type' => 'otherdoc',
		        'posts_per_page' => -1,
		        //'category_name' => 'education-cat', // Если убрать выводятся все дочерние категории к категории 141:Все документы об образовании 
		    ); ?>

		    <?php 
		    $extra_loop = new WP_query ( $extra_args );
			if ( $extra_loop->have_posts() ) : while ( $extra_loop->have_posts() ) : $extra_loop->the_post(); ?>
					<div class="study-cats-item col">
						<p class="widget-title"><?php the_title() ?></p>
						<?php $extra_studyid = get_the_ID(); /*echo '$extra_studyid = ' . $extra_studyid;*/ ?>

					    <?php $intro_args = array(
					    	'order'			 => 'ASC',
					        'post_parent'	 => $extra_studyid,
					        //'orderby'		 => 'parent',		    	
					        'post_type' => 'otherdoc',
					        'posts_per_page' => -1,
					        //'category_name' => 'education-all',
					        //'category_name' => 'education-kind',
					    ); ?>

						<div class="study-cat-link">
							<ul class="study-ul-menu">
							    <?php $in_loop = new WP_query ( $intro_args );
								if ( $in_loop->have_posts() ) : while ( $in_loop->have_posts() ) : $in_loop->the_post(); ?>					
								        <li class="study-link-title">
								        	<a class="a-study-link" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
								    	</li>

								<?php endwhile; endif; ?>
							</ul>
						</div><!-- .study-cat-link -->
					</div><!-- .study-cats-item -->

			<?php endwhile; endif; wp_reset_postdata(); ?>

		</div><!-- .study-cats -->

<?php }

// Creating a Function to Display Articles (Статьи) in Sidebars (Окончательный рабочий код!)
function articles_in_sidebars() { ?>
	    <div class="articles-cats">	    
	     
		    <?php $articles_args = array(
		    	'order'			 => 'ASC',
		        //'post_parent'	 => $extra_studyid,
		        //'orderby'		 => 'parent',		    	
		        'post_type' => 'article',
		        'posts_per_page' => -1,
		        //'category_name' => 'education-all'
		    ); ?>

			<div class="articles-cat-link">
				<ul>
				    <?php $articles_loop = new WP_query ( $articles_args );
					if ( $articles_loop->have_posts() ) : while ( $articles_loop->have_posts() ) : $articles_loop->the_post(); ?>					
					        <li class="articles-link-title">
					        	<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
					    	</li>

					<?php endwhile; endif; wp_reset_postdata(); ?>
				</ul>
			</div><!-- .articles-cat-link -->

			<?php /*wp_reset_postdata();*/ ?>

		</div><!-- .articles-cats -->

<?php }


// Creating a Function to Display Studies (Документы) in Sidebars (Окончательный рабочий код!)
function studies_in_sidebars() { ?>
	    <div class="study-cats">	    
	     
		    <?php $extra_args = array(
		    	'order'			 => 'ASC',
		        'post_parent'	 => 141,
		        //'orderby'		 => 'parent',		    	
		        'post_type' => 'study',
		        'posts_per_page' => -1,
		        //'category_name' => 'education-cat', // Если убрать выводятся все дочерние категории к категории 141:Все документы об образовании 
		    ); ?>

		    <?php 
		    $extra_loop = new WP_query ( $extra_args );
			if ( $extra_loop->have_posts() ) : while ( $extra_loop->have_posts() ) : $extra_loop->the_post(); ?>
					<div class="study-cats-item col">
						<p class="widget-title"><span class="widget-title-span"><?php the_title() ?></span></p>
						<?php $extra_studyid = get_the_ID(); /*echo '$extra_studyid = ' . $extra_studyid;*/ ?>

					    <?php $intro_args = array(
					    	'order'			 => 'ASC',
					        'post_parent'	 => $extra_studyid,
					        'orderby'		 => 'parent',		    	
					        'post_type' => 'study',
					        'posts_per_page' => -1,
					        //'category_name' => 'education-all',
					        //'category_name' => 'education-kind',
					    ); ?>

						<div class="study-cat-link">
							<ul class="study-ul-menu">
							    <?php $in_loop = new WP_query ( $intro_args );
								if ( $in_loop->have_posts() ) : while ( $in_loop->have_posts() ) : $in_loop->the_post(); ?>					
								        <li class="study-link-title">
								        	<a class="a-study-link" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
								    	</li>

								<?php endwhile; endif; ?>
							</ul>
						</div><!-- .study-cat-link -->
					</div><!-- .study-cats-item -->

			<?php endwhile; endif; wp_reset_postdata(); ?>

		</div><!-- .study-cats -->

<?php }

// Creating a Function to Display Studies (Документы) in Sidebars - Можно удалить (не работает)
function study_in_sidebars() {

	// Displaying the Custom Post 'study' on Front Page (can display anywhere). 
    $study_args = array(
    	'order'			 => 'DESC',
    	'post_parent'	 => 143, // ID документа Образование (дочерняя документ документа Документы)
    	'orderby'		 => 'parent',
        'post_type' 	 => 'study',
        'posts_per_page' => -1,
        'category_name'  => 'education-all', // Все виды образования
        //'category_name' => 'education1',
        //'category_name' => 'education2',
        //'category_name' => 'documents-pop', // Самые популярные документы
    );  
    $extra_loop = new WP_Query( $study_args ); ?> <pre><?php /*print_r ($extra_loop);*/ ?></pre>  <?php
    if ( $extra_loop->have_posts() ) : while ( $extra_loop->have_posts() ) : $extra_loop->the_post();

	    $study_id = $post->ID;  // Current CPT
	    $wp_study_parent_id = wp_get_post_parent_id( $study_id ); // Parent CPT 
	    echo $study_id; echo $wp_study_parent_id; ?>
<pre><?php print_r($study_args) ?></pre>
		<!-- <aside> -->
	    <div class="study-item">	    
<?php if ( $post->ID == wp_get_post_parent_id($study_id) ) : ?>
		<?php /*while(  $post->ID  == $study_id ) {*/ ?>
			<h3 class="doc-item-title"><?php the_title(); ?></h3>
	     
		    <?php $intro_args = array(
		    	'order'			 => 'ASC',
		        'post_parent'	 => $study_id,
		        'orderby'		 => 'parent',		    	
		        'post_type' => 'study',
		        'posts_per_page' => -1,
		        'category_name' => 'education-all'
		    ); ?>
<pre><?php print_r($intro_args) ?></pre>
			<p class="widget-title"><?php the_title() ?></p>

		    <?php 
		    $in_loop = new WP_query ( $intro_args );
			if ( $in_loop->have_posts() ) : while ( $in_loop->have_posts() ) : $in_loop->the_post(); /* start the loop */ ?>


			        <h5 class="study-item-title">
			        	<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
			        	<!-- <span class="rev-item-date"> <?php /*echo $value;*/ ?></span> -->
			    	</h5>
		    	
			<?php endwhile; endif;  wp_reset_postdata(); /*rewind_posts();*/ ?>
		<?php 	/*}*/ ?>
<?php endif; ?>			

		</div><!-- .study-item -->
		<!-- </aside> -->
	<?php  endwhile; endif;  wp_reset_postdata(); 
}

// Creating a Function to Display Studies (Документы) in Sidebars - Можно удалить (не работает)
function study1_in_sidebars() {
     
    $study1_args = array(
        'post_type' => 'study',
        'post_parent'	 => 149, // $post_id,
        'posts_per_page' => -1,
        'category_name' => 'education1'
    ); ?>
     
	<p class="widget-title">Документы Обр1</p>

    <?php 
    $query1 = new WP_query ( $study1_args );

    if ( $query1->have_posts() ) { ?>
 
        <?php while ( $query1->have_posts() ) : $query1->the_post(); /* start the loop */ ?>

					<?php	$value1 = get_post_field( "rev-name" ); // Meta-box for Review Author Name
						$value2 = get_post_field( "rev-email" ); // Meta-box for Review Author Email
						$value = get_post_field( "rev-date" );	// Meta-box for Review Date
					    if( 1 ) { 
					?>

					<!-- <aside> -->
					    <div class="study-item">
					        <h5 class="study-item-title">
					        	<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
					        	<!-- <span class="rev-item-date"> <?php /*echo $value;*/ ?></span> -->
					        </h5>

					        <?php /*the_excerpt()*/ ?>			            

							<p>
								<?php $content = get_the_content();
									$trimmed_content = wp_trim_words( $content, 7, '...' );
									echo '<a href="'. get_permalink() .'">' . $trimmed_content . '</a>'; 
								?>
							</p>

					        <!-- <a class="btn btn-danger" href="#" role="button">Заказать</a> -->
					        <?php  }  ?>

					    </div><!-- .study-item -->
					<!-- </aside> -->

					    <?php endwhile; /*endif;*/   
    } wp_reset_postdata();
}

// Creating a Function to Display Reviews (Отзывы) in Sidebars
function reviews_in_sidebars() {
     
    $args = array(
        'post_type' => 'reviews',
        'posts_per_page' => 3,
    ); ?>
	<div class="widget widget_recent_comments">
		<p class="widget-title"><span class="widget-title-span">Отзывы наших клиентов</span></p>

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
				    	<div class="rev-props-in">
					        <h6 class="rev-item-name"><?php echo $value1; ?>
					        	<!-- <span class="rev-item-date"> <?php /*echo $value;*/ ?></span> -->
					        </h6>

					        <?php /*the_excerpt()*/ ?>			            

							<p class="rev-item-text">
								<?php $content = get_the_content();
									$trimmed_content = wp_trim_words( $content, 7, ' ...' );
									echo '<a href="'. get_permalink() .'">' . $trimmed_content . '</a>'; 
								?>
							</p>
						</div><!-- .rev-props-in -->

				    </div><!-- .rev-props -->
				</section>

				    <?php  }  ?>					

			<?php endwhile;   
	    } wp_reset_postdata(); ?>

		<a class="btn btn-primary" href="/otzyvy/" role="button">Все отзывы</a>
	</div><!-- .widget .widget_recent_comments -->	

<?php }


// Creating a Function to Display Four Image Links on top of the page content 
function four_essences() { ?>
<div id="sidebar-secondary" class="widget-area">
	<div id="media_gallery-2" class="widget widget_media_gallery">
		<div id='gallery-1' class='gallery galleryid-369 gallery-columns-1 gallery-size-thumbnail'><figure class='gallery-item'>
			<div class='gallery-icon landscape'>
				<a href='http://wpbestdiploms.loc/i_guardoc/'><img width="150" height="150" src="http://wpbestdiploms.loc/wp-content/uploads/2017/12/i_guardoc-150x150.png" class="attachment-thumbnail size-thumbnail" alt="" srcset="http://wpbestdiploms.loc/wp-content/uploads/2017/12/i_guardoc-150x150.png 150w, http://wpbestdiploms.loc/wp-content/uploads/2017/12/i_guardoc.png 206w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</div></figure><figure class='gallery-item'>
			<div class='gallery-icon landscape'>
				<a href='http://wpbestdiploms.loc/i_videodoc/'><img width="150" height="150" src="http://wpbestdiploms.loc/wp-content/uploads/2017/12/i_videodoc-150x150.png" class="attachment-thumbnail size-thumbnail" alt="" srcset="http://wpbestdiploms.loc/wp-content/uploads/2017/12/i_videodoc-150x150.png 150w, http://wpbestdiploms.loc/wp-content/uploads/2017/12/i_videodoc.png 206w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</div></figure><figure class='gallery-item'>
			<div class='gallery-icon landscape'>
				<a href='http://wpbestdiploms.loc/i_useflartcl/'><img width="150" height="150" src="http://wpbestdiploms.loc/wp-content/uploads/2017/12/i_useflartcl-150x150.png" class="attachment-thumbnail size-thumbnail" alt="" srcset="http://wpbestdiploms.loc/wp-content/uploads/2017/12/i_useflartcl-150x150.png 150w, http://wpbestdiploms.loc/wp-content/uploads/2017/12/i_useflartcl.png 206w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</div></figure><figure class='gallery-item'>
			<div class='gallery-icon landscape'>
				<a href='http://wpbestdiploms.loc/i_salesgeo/'><img width="150" height="150" src="http://wpbestdiploms.loc/wp-content/uploads/2017/12/i_salesgeo-150x150.png" class="attachment-thumbnail size-thumbnail" alt="" srcset="http://wpbestdiploms.loc/wp-content/uploads/2017/12/i_salesgeo-150x150.png 150w, http://wpbestdiploms.loc/wp-content/uploads/2017/12/i_salesgeo.png 206w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</div></figure>
		</div>
	</div>
</div><!-- #sidebar-secondary -->
<?php }	


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
   /*add_filter( 'rewrite_rules_array', 'disable_embeds_rewrites' );*/

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


