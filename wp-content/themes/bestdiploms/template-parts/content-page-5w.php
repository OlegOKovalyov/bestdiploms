<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Best_Diploms
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php /*the_title( '<h1 class="entry-title">', '</h1>' );*/ ?>
	</header><!-- .entry-header -->

	<?php
	if ( is_front_page() /*&& is_home()*/ ) : ?>
		<div class="row">
			<div class="carousel-block col-lg-12"><!--Здесь будет карусель-->

				<!-- Owl-Carousel -->
				<div class="owl-carousel owl-theme">

					<!-- <div class="doc-item">
						<h4 class="doc-item-title">Диплом института</h4>
						<p class="doc-item-year">2014 - 2017 года выпуска</p>
						<a href="#" target="_blank" rel="noopener">
							<img src="<?php bloginfo('template_directory'); ?>/images/dipl_bklvra.png" alt="Диплом бакалавра 2014-2017г.в.">
						</a>
						<p class="doc-price-gznk">Бланк ГОЗНАК 22 000 Р</p>
						<p class="doc-price-tpgrf">Типографский 15 000 Р</p>
						<a class="btn btn-danger" href="#" role="button">Заказать</a>
					</div> --><!-- .doc-item -->

				    <?php 
				    // Displaying the Custom Post 'study' (can display anywhere). 
				        $args = array(
				            'post_type' => 'study',
				            'category_name' => 'education-all', // Все виды образования
				            //'category_name' => 'education1',
				            //'category_name' => 'education2',
				            'category_name' => 'documents-pop', // Самые популярные документы
				        );  
				        $your_loop = new WP_Query( $args ); 

				        if ( $your_loop->have_posts() ) : while ( $your_loop->have_posts() ) : $your_loop->the_post(); 
				        $meta = get_post_meta( $post->ID, 'your_fields', true ); ?>

				        <?php $value1 = get_post_field( "make" );
				        	  $value2 = get_post_field( "gznk-price" );
				        	  $value = get_post_field( "price" );
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
	<?php else : ?>
		<!--<p class="site-title"><a href="<?php /*echo esc_url( home_url( '/' ) );*/ ?>" rel="home"><?php /*bloginfo( 'name' );*/ ?></a></p>-->


	<div class="row">
		<div class="entry-content col-lg-9">
			<?php if (function_exists('dimox_breadcrumbs')) dimox_breadcrumbs(); ?>
			<h1><?php the_title() ?></h1>




			
			<?php the_content();

				wp_link_pages( array(
					'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
					'after'  => '</div>',
				) );
			?>
		</div><!-- .entry-content -->

		<div class="col-lg-3">
	        <?php get_sidebar( 'right' ); ?>
	    </div>
    </div><!-- .row -->  


	<?php
	endif; ?>

	<?php bestdiploms_post_thumbnail(); ?>

	<div class="row">
		<div class="entry-content col-lg-9">
			<?php
				the_content();

				wp_link_pages( array(
					'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
					'after'  => '</div>',
				) );
			?>
		</div><!-- .entry-content -->

		<div class="col-lg-3">
	        <?php get_sidebar( 'right' ); ?>
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
