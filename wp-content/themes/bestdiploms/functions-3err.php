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
			'default-image' => '%s/images/bg_site.png',
			'default-position-x' => 'center',
			'default-size' => 'contain',
            'default-repeat' => 'no-repeat',
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

	wp_enqueue_style( 'bestdiploms-bs-datepicker', get_template_directory_uri() . '/bootstrap-datepicker/dist/css/bootstrap-datepicker3.standalone.min.css' );	

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

// Creating a Function to Display Articles (Статьи) in Sidebars (Окончательный рабочий код!)
function articles_in_sidebars() { ?>
	    <div class="articles-cats">	    
	     
		    <?php $articles_args = array(
		    	'order'			 => 'ASC',
		        //'post_parent'	 => $extra_studyid,
		        //'orderby'		 => 'parent',		    	
		        'post_type' => 'article',
		        'posts_per_page' => -1,
		        'category_name' => 'useful-articles',
		    ); 
		    ?>

			<div class="widget article-cats-item">
				<p class="widget-title"><span class="widget-title-span"><?php echo get_cat_name(22) // Категория Полезные статьи ?></span></p>   
				<div class="articles-cat-link">
					<ul>
					    <?php $articles_loop = new WP_query ( $articles_args );
						if ( $articles_loop->have_posts() ) : while ( $articles_loop->have_posts() ) : $articles_loop->the_post(); ?>					
						        <li class="articles-link-title">
						        	<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title() ?></a>
						    	</li>

						<?php endwhile; endif; wp_reset_postdata(); ?>
					</ul>
				</div><!-- .articles-cat-link -->
				<a class="btn btn-light" href="/stati/" role="button">Все статьи</a>
			</div><!-- .widget .article-cats-item .col -->			

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
					    	'order'			 => 'DESC',
					        'post_parent'	 => $extra_studyid,
					        //'orderby'		 => 'parent',		    	
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
				<a href="<?php echo home_url() . '/stepeni-zashhity-dokumentov/' ?>"><img width="150" height="150" src="/wp-content/uploads/2017/12/i_guardoc-150x150.png" class="attachment-thumbnail size-thumbnail" alt="" srcset="/wp-content/uploads/2017/12/i_guardoc-150x150.png 150w, /wp-content/uploads/2017/12/i_guardoc.png 206w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</div></figure><figure class='gallery-item'>
			<div class='gallery-icon landscape'>
				<a href="<?php echo home_url() . '/video-dokumentov/' ?>"><img width="150" height="150" src="/wp-content/uploads/2017/12/i_videodoc-150x150.png" class="attachment-thumbnail size-thumbnail" alt="" srcset="/wp-content/uploads/2017/12/i_videodoc-150x150.png 150w, /wp-content/uploads/2017/12/i_videodoc.png 206w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</div></figure><figure class='gallery-item'>
			<div class='gallery-icon landscape'>
				<a href="<?php echo home_url() . '/stati/' ?>"><img width="150" height="150" src="/wp-content/uploads/2017/12/i_useflartcl-150x150.png" class="attachment-thumbnail size-thumbnail" alt="" srcset="/wp-content/uploads/2017/12/i_useflartcl-150x150.png 150w, /wp-content/uploads/2017/12/i_useflartcl.png 206w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</div></figure><figure class='gallery-item'>
			<div class='gallery-icon landscape'>
				<a href="<?php echo home_url() . '/kupit-diplom-v-gorodah/' ?>"><img width="150" height="150" src="/wp-content/uploads/2017/12/i_salesgeo-150x150.png" class="attachment-thumbnail size-thumbnail" alt="" srcset="/wp-content/uploads/2017/12/i_salesgeo-150x150.png 150w, /wp-content/uploads/2017/12/i_salesgeo.png 206w" sizes="(max-width: 150px) 100vw, 150px" /></a>
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

/********************************************** Удалить, если на заработает */
// фотогалерея-слайдер Документов (study)
function gallery_slider($output, $attr) {
  $ids = explode(',', $attr['ids']);
  $images = get_posts(array(
    'include' => $ids,
    'post_status' => 'inherit',
    'post_type' => 'attachment',
    'post_mime_type' => 'image',
    //'orderby' => 'post__in',    
    'post_type'   => array('post','page', 'study'),
  ));
  if ($images) {
    $output = gallery_slider_template($images);
    return $output;
  }
}
add_filter('post_gallery', 'gallery_slider', 10, 2);

function gallery_slider_template($images) {
  ob_start();
  include 'gallery-slider.php';
  $output = ob_get_clean();
  return $output;
}

/* Для вывода слайдера attachments */
function diplom($id, $type)
{
    $output .= '<div>';
	extract(shortcode_atts(array(
    'id' => 'id',
    'type' => 'type'
	), $id));
	$thumb = '<a href="' . wp_get_attachment_url(get_post_thumbnail_id($id)) . '" rel="group' . $id . '">' . get_the_post_thumbnail($id, 'medium') . "</a>";
	
	$attachments = get_children(array('post_parent' => $id, 'post_type' => 'attachment', 'post_mime_type' => 'image'));
	foreach ($attachments as $attachment_id => $attachment) {
		if (get_post_thumbnail_id($id) != $attachment_id) {
			$imgurl = wp_get_attachment_image_src($attachment_id, 'large');
			$thumbs .= '<a href="' . $imgurl[0] . '" rel="group' . $id . '"></a>';
		}
		
	}
	$url = get_the_permalink('43');
	if ($type == "diplom") {
		$url = get_the_permalink('43');
	}
	$output = "<div class='col-md-6 col-xs-12 slide'><div class='slide_title' style='min-height: 0;'>" . get_the_title($id) . " </div><div class='slide_date'>" . do_shortcode('');
	if (do_shortcode('[acf field="new" post_id="' . $id . '"]') == "yes") {
		$output .= '<span class="new">НОВОГО ОБРАЗЦА</span>';
	}
	
	$output .= "</div>";
	$output .= $thumb;
	$output .= $thumbs;
	$znak1 = do_shortcode('[acf field="znak2" post_id="' . $id . '"]');
	if ($znak1) {
		$output .= '<div class="typography"><p class="price">Типографский бланк цена ';
		$output .= $znak1 . ' y.e.</p>';
		
	}
	$znak2 = do_shortcode('[acf field="znak1" post_id="' . $id . '"]');
	if ($znak2) {
		$output .= '<div class="original"><p class="slide_price">Настоящий, полный ГОЗНАК цена ';
		$output .= $znak2 . ' y.e.</p>';
	}
	
	
	$output .= '<a href="' . $url . '" class="slide_order_diploma 123">Заказать</a></div></div>';
	return $output;
	
}

add_shortcode("diplom", "diplom");
/********************************************** /Удалить, если на заработает */


/**
 * Get the Attachment ID from an Image URL in WordPress
 */
function pn_get_attachment_id_from_url( $attachment_url = '' ) {
 
	global $wpdb;
	$attachment_id = false;
 
	// If there is no url, return.
	if ( '' == $attachment_url )
		return;
 
	// Get the upload directory paths
	$upload_dir_paths = wp_upload_dir();
 
	// Make sure the upload path base directory exists in the attachment URL, to verify that we're working with a media library image
	if ( false !== strpos( $attachment_url, $upload_dir_paths['baseurl'] ) ) {
 
		// If this is the URL of an auto-generated thumbnail, get the URL of the original image
		$attachment_url = preg_replace( '/-\d+x\d+(?=\.(jpg|jpeg|png|gif)$)/i', '', $attachment_url );
 
		// Remove the upload path base directory from the attachment URL
		$attachment_url = str_replace( $upload_dir_paths['baseurl'] . '/', '', $attachment_url );
 
		// Finally, run a custom database query to get the attachment ID from the modified attachment URL
		$attachment_id = $wpdb->get_var( $wpdb->prepare( "SELECT wposts.ID FROM $wpdb->posts wposts, $wpdb->postmeta wpostmeta WHERE wposts.ID = wpostmeta.post_id AND wpostmeta.meta_key = '_wp_attached_file' AND wpostmeta.meta_value = '%s' AND wposts.post_type = 'attachment'", $attachment_url ) );
 
	}
 
	return $attachment_id;
}

/**
 * Получение всех ID постов, содержащихся в определенной рубрике или отмеченные определенным тегом 
 */
function truemisha_post_id_by_cat_tag( $cat_or_tag_id ) {
	global $wpdb;
 
	$all_posts = $wpdb->get_col( $wpdb->prepare( "SELECT object_id FROM $wpdb->term_relationships WHERE term_taxonomy_id = %d", $cat_or_tag_id ) );
 
	return $all_posts;
}

/**
 * Показывает в слайдере fancybox 3 все прикрепленные к thumbnail поста 
 * дополнительные картинки для CPT study (Документы)
 */
function study_attachments_show() {
	// Высвечиваем image-вложения - study-галереи с помощью fancybox 3 (слайдер)
	$args = array(
	'post_type' => 'attachment',
	'post_mime_type' => 'image',
	'numberposts' => -1,
	'post_status' => 'inherit',
	'post_parent' => $post->ID,
	'order'       => 'ASC',
	);

	$attachments = get_posts( $args );
	if ( $attachments ) {
	$cnt = 1; $echo_html = '';
	    foreach ( $attachments as $attachment ) {
			if ( $cnt > 1) {    	
		    	$echo_html = '<a data-fancybox="images" data-caption="' . wp_get_attachment_caption( $attachment->ID ) . '" ';
		    	$echo_html .= 'href="';
		        $echo_html .=  wp_get_attachment_image_url( $attachment->ID, 'full' ) . '">';
		        $echo_html .= '</a>';
		        $echo_html .= '</a>';
		        echo $echo_html; 
	    	}
	        $cnt++; 
	      }
	 }
}