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
	<?php if( function_exists( 'fp_carousel' ) ) echo fp_carousel(); ?>
	<?php /*echo do_shortcode('[fpcarousel]');*/ ?><!-- Шорткод тоже рабочий -->

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

			<div class="col-lg-3 sb-secondry">
		        <?php get_sidebar( 'right' ); ?>
		    </div>
	    </div><!-- .row -->  



	<?php elseif ( 126 == get_the_ID() ) : ?>
		<!--<p class="site-title"><a href="<?php /*echo esc_url( home_url( '/' ) );*/ ?>" rel="home"><?php /*bloginfo( 'name' );*/ ?></a></p>-->

		<div class="row">
			<div class="entry-content col-lg-9">
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
				<h1><?php the_title() ?></h1>

				    <?php 
				    	// Displaying the Custom Post 'etalage' on Price Page (can display anywhere). 
				        $args = array(
				        	'order'			 => 'DESC',
				        	'post_parent'	 => 173,
				        	'orderby'		 => 'parent',
				            'post_type' 	 => 'etalage',
				            'posts_per_page' => -1,
				            'category_name'  => 'education-all', // Все виды образования
				            //'category_name' => 'education1',
				            //'category_name' => 'education2',
				            //'category_name' => 'documents-pop', // Самые популярные документы
				        );  
				        $your_loop = new WP_Query( $args ); /*print_r ($your_loop);*/
				        if ( $your_loop->have_posts() ) : while ( $your_loop->have_posts() ) : $your_loop->the_post(); 
				        $post_id = $post->ID; // Current CPT
				        $wp_post_parent_id = wp_get_post_parent_id( $post_id ); // Parent CPT 

			        ?>

					<div class="price-item">

				    	<?php 
				    		//$wp_post_parent_cat_id = wp_get_post_parent_id( $post->ID );
				    		//$post_cat_id = $post->ID;
				            while(  $post->ID  == $post_id ) { ?>
				                <h3 class="doc-item-title"><?php the_title(); ?></h3>
						
								<?php $in_args = array(
						        	'order'			 => 'ASC',
						        	'post_parent'	 => $post_id,
						        	//'orderby'		 => 'parent',
						            'post_type' 	 => 'etalage',
						            'posts_per_page' => -1,
						            'category_name'  => 'education-all', // Все виды образования
						            //'category_name' => 'education1',
						            //'category_name' => 'education2',
						            //'category_name' => 'documents-pop', // Самые популярные документы
							        ); 		

									$your_in_loop = new WP_Query( $in_args );
					        		if ( $your_in_loop->have_posts() ) : while ( $your_in_loop->have_posts() ) : $your_in_loop->the_post(); 		
					        		//$meta = get_post_meta( $post->ID, 'your_fields', true ); 
									$value1 = get_post_field( "make" ); // Meta-box for Document Creation Date
									$value2 = get_post_field( "gznk-price" ); // Meta-box for GOZNAK Price
									$value = get_post_field( "price" );	// Meta-box for Typography Price
						            if( $value || $value2 ) { 
					            ?>

								<section>
							        <a href="#" target="_blank" rel="noopener">
							            <?php if ( has_post_thumbnail() ) {
							                the_post_thumbnail();
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
										
										<!-- Возможно понадобится the_content() для отображения содержимого CPT 'etalage' -->
										<!-- <span class="price-item-content"><?php /*the_content();*/ ?></span> -->

								    </div><!-- .price-props -->
						    	</section>
				        
							<?php endwhile; 
						endif; } ?>

					</div><!-- .price-item -->

	<?php endwhile; endif; wp_reset_postdata(); ?>  
		
				<?php the_content();
				
					wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
						'after'  => '</div>',
					) );
				?>

			</div><!-- .entry-content -->

			<div class="col-lg-3 sb-secondry">
		        <?php get_sidebar( 'right' ); ?>
		    </div>
	    </div><!-- .row -->  

	<?php elseif ( 205 == get_the_ID() ) : ?>

		<div class="row">
			<div class="entry-content col-lg-9">
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
				<h1><?php the_title() ?></h1>		

				<?php the_content();
				
					wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
						'after'  => '</div>',
					) );
				?>

			</div><!-- .entry-content -->

			<div class="col-lg-3 sb-secondry">
		        <?php get_sidebar( 'right-plus' ); ?>
		    </div>
	    </div><!-- .row -->  

	<?php elseif ( 212 == get_the_ID() ) : ?>

		<div class="row">
			<div class="entry-content col-lg-9">
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
				<h1><?php the_title() ?></h1>		
				<?php the_content(); ?>
				<div id="accordion" class="divaccordion" role="tablist">




    <?php 
    // Displaying the Custom Post 'faqposts' in Owl Carousel (can display anywhere). 
        $args = array(
        	'order'			 	=> 'ASC',
            'post_type' 		=> 'faqposts',
            //'category_name' 	=> 'faq', 
        );  
        $your_loop = new WP_Query( $args ); 
        $i_loop = 0;
        if ( $your_loop->have_posts() ) : while ( $your_loop->have_posts() ) : $your_loop->the_post(); 
        /*$meta = get_post_meta( $post->ID, '', true );*/ 
        $i_loop = $i_loop + 1; ?>
		 

        <?php
			// если мы на странице категории
			/*if( is_category() )
				echo get_queried_object()->name;*/
        ?>

  <div class="card">
    <div class="card-header" role="tab" id="heading-<?php echo $i_loop; ?>">
      <h5 class="">
        <a class="collapsed" data-toggle="collapse" href="#collapse-<?php echo $i_loop; ?>" role="button" aria-expanded="false" aria-controls="collapse-<?php echo $i_loop; ?>">
          <?php the_excerpt() ?>
        </a>
      </h5>
    </div><!-- .card-header -->

    <div id="collapse-<?php echo $i_loop; ?>" class="collapse" role="tabpanel" aria-labelledby="heading-<?php echo $i_loop; ?>" data-parent="#accordion">
      <div class="card-body">
        <?php the_content() ?>
      </div>
    </div>
  </div><!-- .card -->

  	<?php  	$page_args = array(
				'' => '', 
			);
	 		echo paginate_links( $page_args ); ?> 

    <?php endwhile; endif; wp_reset_postdata(); ?>  


<script>document.getElementById('collapse-1').classList.add('show');</script>

</div><!-- #accordion -->

<?php echo "hello"; ?>

<?php
	$page_args = array(
		'' => '', 
	);

	echo paginate_links( $page_args ); 

?>

				<?php
					wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
						'after'  => '</div>',
					) );
				?>

			</div><!-- .entry-content -->

			<div class="col-lg-3 sb-secondry">
		        <?php get_sidebar( 'right-plus' ); ?>
		    </div>
	    </div><!-- .row -->  	    


    <?php 
	endif; ?>


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
