<?php
/**
 * Вывод карусели Owl Carousel на Главной странице сайта WordPress (Front Page Carousel)
 * Автор: Олег Ковалев
 * URL: https://github.com/OlegOKovalyov
 * Версия: 2018.01.06
 * Лицензия: MIT
 */

function fp_carousel() {
	ob_start(); ?>	
		<div class="row">
			<div class="carousel-block col-lg-12"><!-- Здесь будет карусель -->

				<!-- Owl-Carousel -->
				<div class="owl-carousel owl-theme">

				    <?php 
				    // Displaying the Custom Post 'etalage' in Owl Carousel (can display anywhere). 
				        $args = array(
				        	'order'			 	=> 'ASC',
				            'post_type' 		=> 'etalage',
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