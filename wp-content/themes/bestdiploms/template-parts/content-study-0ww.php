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



		<!-- Вывод эталажей (CPT 'etalage') на странице Цены -->
		<div class="row">
			<div class="entry-content col-lg-9">
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
				<h1><?php the_title() ?></h1>
				<!-- Display CPT study content -->
				<?php the_post_thumbnail(/* array( 100, 100 ) */); ?>
            	<div class="entry-content"><?php the_content(); ?></div>
						<div class="price-item">
								<?php
								$value1 = get_post_field( "make" ); // Meta-box for Document Creation Date
								$value2 = get_post_field( "gznk-price" ); // Meta-box for GOZNAK Price
								$value = get_post_field( "price" );	// Meta-box for Typography Price
					            if( $value || $value2 ) { ?>

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
								    	</div><!-- .price-props -->
						    		</section>							                

								<?php  } ?>

						</div><!-- .price-item -->            	


    <?php
    $mypost = array( 'post_type' => 'study', );
    $loop = new WP_Query( $mypost );
    ?>
    <?php while ( $loop->have_posts() ) : $loop->the_post();?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <!-- Display CPT study content -->
            <div class="entry-content"><?php the_content(); ?></div>
        </article>
    <?php endwhile; ?>






				    <!-- Displaying the Custom Post 'etalage' on Price Page (can display anywhere). --> 
				    <?php $args = array(
			        	'order'			 => 'DESC',
			        	'post_parent'	 => 173, // ID эталажа Образование (дочерняя запись к записи Документы)
			        	'orderby'		 => 'parent',
			            'post_type' 	 => 'etalage',
			            'posts_per_page' => -1,
			            'category_name'  => 'education-all', // Все виды образования
			            //'category_name' => 'education1',
			            //'category_name' => 'education2',
			            //'category_name' => 'documents-pop', // Самые популярные документы
			        );  
			        $extra_loop = new WP_Query( $args ); /*print_r ($extra_loop);*/
			        if ( $extra_loop->have_posts() ) : while ( $extra_loop->have_posts() ) : $extra_loop->the_post();

				        $post_id = $post->ID; // Current CPT
				        $wp_post_parent_id = wp_get_post_parent_id( $post_id ); // Parent CPT ?>

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

								$in_loop = new WP_Query( $in_args );
				        		if ( $in_loop->have_posts() ) : while ( $in_loop->have_posts() ) : $in_loop->the_post(); 		
				        		//$meta = get_post_meta( $post->ID, 'your_fields', true ); 
								$value1 = get_post_field( "make" ); // Meta-box for Document Creation Date
								$value2 = get_post_field( "gznk-price" ); // Meta-box for GOZNAK Price
								$value = get_post_field( "price" );	// Meta-box for Typography Price
						            if( $value || $value2 ) { ?>

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

									    </div><!-- .price-props -->
							    	</section>
				        
							<?php endwhile; 
							endif; } ?>

						</div><!-- .price-item -->

					<?php endwhile; endif; wp_reset_postdata(); ?>  
		
					<?php the_content();
				
					/*wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
						'after'  => '</div>',
					) );*/ 

					?>

			</div><!-- .entry-content -->

			<div class="col-lg-3 sb-secondry">
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
