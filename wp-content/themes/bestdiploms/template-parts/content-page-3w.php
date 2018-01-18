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

	<div class="doc-item">
		<h4 class="doc-item-title">Диплом института</h4>
		<p class="doc-item-year">2014 - 2017 года выпуска</p>
		<a href="#" target="_blank" rel="noopener">
			<img src="<?php bloginfo('template_directory'); ?>/images/dipl_bklvra.png" alt="Диплом бакалавра 2014-2017г.в.">
		</a>
		<p class="doc-price-gznk">Бланк ГОЗНАК 22 000 Р</p>
		<p class="doc-price-tpgrf">Типографский 15 000 Р</p>
		<a class="btn btn-danger" href="#" role="button">Заказать</a>
	</div><!-- .doc-item -->

	<div class="doc-item">
		<h4 class="doc-item-title">Диплом института</h4>
		<p class="doc-item-year">2014 - 2017 года выпуска</p>
		<a href="#" target="_blank" rel="noopener">
			<img src="<?php bloginfo('template_directory'); ?>/images/dipl_bklvra.png" alt="Диплом бакалавра 2014-2017г.в.">
		</a>
		<p class="doc-price-gznk">Бланк ГОЗНАК 22 000 Р</p>
		<p class="doc-price-tpgrf">Типографский 15 000 Р</p>
		<a class="btn btn-danger" href="#" role="button">Заказать</a>
	</div><!-- .doc-item -->	

	<div class="doc-item">
		<h4 class="doc-item-title">Диплом института</h4>
		<p class="doc-item-year">2014 - 2017 года выпуска</p>
		<a href="#" target="_blank" rel="noopener">
			<img src="<?php bloginfo('template_directory'); ?>/images/dipl_bklvra.png" alt="Диплом бакалавра 2014-2017г.в.">
		</a>
		<p class="doc-price-gznk">Бланк ГОЗНАК 22 000 Р</p>
		<p class="doc-price-tpgrf">Типографский 15 000 Р</p>
		<a class="btn btn-danger" href="#" role="button">Заказать</a>
	</div><!-- .doc-item -->

	<div class="doc-item">
		<h4 class="doc-item-title">Диплом института</h4>
		<p class="doc-item-year">2014 - 2017 года выпуска</p>
		<a href="#" target="_blank" rel="noopener">
			<img src="<?php bloginfo('template_directory'); ?>/images/dipl_bklvra.png" alt="Диплом бакалавра 2014-2017г.в.">
		</a>
		<p class="doc-price-gznk">Бланк ГОЗНАК 22 000 Р</p>
		<p class="doc-price-tpgrf">Типографский 15 000 Р</p>
		<a class="btn btn-danger" href="#" role="button">Заказать</a>
	</div><!-- .doc-item -->

	<div class="doc-item">
		<h4 class="doc-item-title">Диплом института</h4>
		<p class="doc-item-year">2014 - 2017 года выпуска</p>
		<a href="#" target="_blank" rel="noopener">
			<img src="<?php bloginfo('template_directory'); ?>/images/dipl_bklvra.png" alt="Диплом бакалавра 2014-2017г.в.">
		</a>
		<p class="doc-price-gznk">Бланк ГОЗНАК 22 000 Р</p>
		<p class="doc-price-tpgrf">Типографский 15 000 Р</p>
		<a class="btn btn-danger" href="#" role="button">Заказать</a>
	</div><!-- .doc-item -->

	<div class="doc-item">
		<h4 class="doc-item-title">Диплом института</h4>
		<p class="doc-item-year">2014 - 2017 года выпуска</p>
		<a href="#" target="_blank" rel="noopener">
			<img src="<?php bloginfo('template_directory'); ?>/images/dipl_bklvra.png" alt="Диплом бакалавра 2014-2017г.в.">
		</a>
		<p class="doc-price-gznk">Бланк ГОЗНАК 22 000 Р</p>
		<p class="doc-price-tpgrf">Типографский 15 000 Р</p>
		<a class="btn btn-danger" href="#" role="button">Заказать</a>
	</div><!-- .doc-item -->

	<div class="doc-item">
	    <?php 
	    // Displaying the Custom Post 'study' (can display anywhere). 
	        $args = array(
	            'post_type' => 'study',
	            //'category_name' => 'all_education', // Все виды образования
	            'category_name' => 'education1',
	            //'category_name' => 'education2',
	        );  
	        $your_loop = new WP_Query( $args ); 

	        if ( $your_loop->have_posts() ) : while ( $your_loop->have_posts() ) : $your_loop->the_post(); 
	        $meta = get_post_meta( $post->ID, 'your_fields', true ); ?>

	        <!-- contents of Your Post -->
	            <h4 class="doc-item-title"><?php the_title(); ?></h4>
	            <p class="doc-item-year">2014 - 2017 года выпуска</p>
	            <a href="#" target="_blank" rel="noopener">
		            <?php if ( has_post_thumbnail() ) {
		                the_post_thumbnail();
		            } ?>
	            </a>
	            <p class="doc-price-gznk"><?php the_content(); ?></p>
	            <p class="doc-price-tpgrf"><?php $value1 = get_post_field( "make" );
	                $value = get_post_field( "price" );
	                if( $value ) {
	                    echo $value1 . '<br>';
	                    echo ' от <span>' . $value . '</span> руб.';
	                } else {
	                    echo 'empty';
	                } ?>
	            </p>
	            <a class="btn btn-danger" href="#" role="button">Заказать</a>

	    <?php endwhile; endif; wp_reset_postdata(); ?>  

	</div><!-- .doc-item -->

</div><!-- .owl-carousel .owl-theme -->
<!-- /Owl-Carousel -->





			</div>
		</div>
	<?php else : ?>
		<!--<p class="site-title"><a href="<?php /*echo esc_url( home_url( '/' ) );*/ ?>" rel="home"><?php /*bloginfo( 'name' );*/ ?></a></p>-->
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
