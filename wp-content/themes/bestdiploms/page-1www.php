<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Best_Diploms
 */

get_header(); ?>

	<div id="primary" class="content-area col-lg-9 order-2">
		<main id="main" class="site-main">

			<?php
			while ( have_posts() ) : the_post();

				get_template_part( 'template-parts/content', 'page' );

				// If comments are open or we have at least one comment, load up the comment template.
				if ( comments_open() || get_comments_number() ) :
					comments_template();
				endif;

			endwhile; // End of the loop.
			?>

		</main><!-- #main -->
	</div><!-- #primary -->

	<!-- 376: Оплата и доставка; 212: Вопросы и ответы; 259: Статьи  -->
	<?php if ( 376 == get_the_ID() || 212 == get_the_ID() || 259 == get_the_ID() ) : ?>

	    <div class="col-lg-3 col-sidebar-primary">
	        <?php get_sidebar( 'minus' ); ?>
	    </div>

	<!-- 282: Отзывы; 328: Города; 357: Контакты; 485: Заказать диплом; 487: Видео документов -->
	<?php elseif ( 282 == get_the_ID() || 328 == get_the_ID() || 357 == get_the_ID() || 485 == get_the_ID() || 487 == get_the_ID() ) : ?>

	    <div class="col-lg-3 col-sidebar-primary">
	        <?php get_sidebar( 'minmin' ); ?>
	    </div>		

	<!-- 328: Города; 357: Контакты  -->
	<!-- <?php /*elseif ( 328 == get_the_ID() || 357 == get_the_ID() ) :*/ ?>
				    
        <div class="col-lg-3 col-sidebar-primary">
            <?php /*get_sidebar( 'minmin' );*/ ?>
        </div> -->			    

	<?php else : ?>

	    <div class="col-lg-3 col-sidebar-primary">
	        <?php get_sidebar(); ?>
	    </div>		    

	<?php endif; ?>
  
<?php get_footer();
