<?php
/**
 * Template part for displaying CPT cities content in single-cities.php - not working for CPT cities
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Best_Diploms
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<!-- Вывод документов (CPT 'article') на странице одного документа (по ссылке из левого primary сайдбара) -->
	<div class="row">
		<div class="entry-content col-lg-9">
			<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
			<h1><?php the_title() ?></h1>

			<?php // Display CPT article content
				the_content();
			?>

			<?php
				wp_link_pages( array(
					'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
					'after'  => '</div>',
				) );
			?>

		</div><!-- .entry-content . col-lg-9 -->

		<div class="col-lg-3 sb-secondry">
			<?php get_sidebar( 'right-plus' ); ?>
	    </div>
    </div><!-- .row -->  
		
	<?php if ( get_edit_post_link() ) : ?>
		<footer class="entry-footer">
			<?php
				edit_post_link(
					sprintf(
						wp_kses(
							/* translators: %s: Name of current post. Only visible to screen readers */
							__( 'Edit <span class="screen-reader-text">%s</span>', 'bestdiploms' ),
							array(
								'span' => array(
									'class' => array(),
								),
							)
						),
						get_the_title()
					),
					'<span class="edit-link">',
					'</span>'
				);
			?>
		</footer><!-- .entry-footer -->
	<?php endif; ?>
</article><!-- #post-<?php the_ID(); ?> -->

<script>
	// Делаем текущую ссылку на страницу CPT article (Документы) активной (добавляем класс active для нее)	
	jQuery(function () { 
	    jQuery('.articles-link-title a').each(function () {
	        var location = window.location.href;
	        var link = this.href; 
	        if(location == link) {
	            jQuery(this).addClass('active');
	        }
	    });
	});
</script>