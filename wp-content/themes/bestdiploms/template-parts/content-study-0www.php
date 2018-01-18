<?php
/**
 * Template part for displaying CPT study content in single.php
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

		<!--<p class="site-title"><a href="<?php /*echo esc_url( home_url( '/' ) );*/ ?>" rel="home"><?php /*bloginfo( 'name' );*/ ?></a></p>-->

		<!-- Вывод документов (CPT 'study') на странице одного документа -->
		<div class="row">
			<div class="entry-content col-lg-9">
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
				<h1><?php the_title() ?></h1>
				<!-- Display CPT study content -->
				<?php the_post_thumbnail( array( 580, 408 ) ); ?>
            	<div class="entry-content"><?php $curstudycntnt = get_the_content(); ?></div>
						<div class="price-item">
								<?php
								$value1 = get_post_field( "make" ); // Meta-box for Document Creation Date
								$value2 = get_post_field( "gznk-price" ); // Meta-box for GOZNAK Price
								$value = get_post_field( "price" );	// Meta-box for Typography Price
						            if( $value || $value2 ) { ?>

										<section>
									        <a href="#" target="_blank" rel="noopener">
									            <?php if ( has_post_thumbnail() ) {
									                the_post_thumbnail( array( 280, 128 ) );
									            } ?>
									        </a>
										    <div class="price-props">
										        <h4 class="price-item-title"><?php the_title(); ?> <span class="price-item-year"> <?php echo $value1; ?></span></h4>

										        <?php					            
									                echo '<p class="page-price-gznk">' . $value2 . '</p>';
									                echo '<p class="page-price-tpgrf">' . $value . '</p>';
								        		?>

								                <a class="btn btn-danger" href="#" role="button">Заказать</a>

									<?php  } else {
										/* echo '<p>empty</p>';*/
									} ?>

									    </div><!-- .price-props -->
							    	</section>
				        
							<?php /*endwhile; 
							endif; }*/ ?>

						</div><!-- .price-item -->            	


    <?php
    $mypost = array( 'post_type' => 'study', );
    $loop = new WP_Query( $mypost );
    ?>
    <?php while ( $loop->have_posts() ) : $loop->the_post();?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <!-- Display CPT study content -->
            <div class="entry-content"><?php /*the_content();*/ ?></div>
        </article>
    <?php endwhile; ?>







		
					<?php the_content();
				
					/*wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
						'after'  => '</div>',
					) );*/ 

					?>
				<?php echo $curstudycntnt; ?>
			</div><!-- .entry-content -->

			<div class="col-lg-3 sb-secondry">
		        <?php get_sidebar( 'right' ); ?>
		    </div>
	    </div><!-- .row -->  
		
		<h2>Другие дипломы</h2>
		<?php if( function_exists( 'fp_carousel' ) ) echo fp_carousel(); ?>	    

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
