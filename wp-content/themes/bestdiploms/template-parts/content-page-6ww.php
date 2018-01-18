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

				    <?php 
				    // Displaying the Custom Post 'study' (can display anywhere). 
				        $args = array(
				            'post_type' => 'study',
				            //'category_name' => 'education-all', // Все виды образования
				            //'category_name' => 'education1',
				            //'category_name' => 'education2',
				            'category_name' => 'documents-pop', // Самые популярные документы
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
	<?php elseif ( 126 == get_the_ID() ) : ?>
		<!--<p class="site-title"><a href="<?php /*echo esc_url( home_url( '/' ) );*/ ?>" rel="home"><?php /*bloginfo( 'name' );*/ ?></a></p>-->


	<div class="row">
		<div class="entry-content col-lg-9">
			<?php if (function_exists('dimox_breadcrumbs')) dimox_breadcrumbs(); ?>
			<h1><?php the_title() ?></h1>



				    <?php 
				    // Displaying the Custom Post 'study' (can display anywhere). 
				        $args = array(
				        	'order'			 => 'DESC',
				        	'orderby'			 => 'parent',
				            'post_type' 	 => 'study',
				            'category_name'  => 'education-all', // Все виды образования
				            //'category_name' => 'education1',
				            //'category_name' => 'education2',
				            //'category_name' => 'documents-pop', // Самые популярные документы
				        );  

				        /*$parent_id = 141;*/ // Новый код
				        # получаем дочерние рубрики
						/*$sub_cats = get_categories( array(
							'type'			=> 'study',
							'child_of'  	=> $parent_id,
							'order'        => 'DESC',
							'hide_empty' 	=> 0,
							'taxonomy'     => 'study_meta',
						) );*/ // print_r($sub_cats);	// Новый код	

				        $your_loop = new WP_Query( $args ); 

				        if ( $your_loop->have_posts() ) : while ( $your_loop->have_posts() ) : $your_loop->the_post(); 

				        $meta = get_post_meta( $post->ID, 'your_fields', true ); print_r ($meta);
				        $post_id = $post->ID;
				        $wp_post_parent_id = wp_get_post_parent_id( $post_id ); echo $wp_post_parent_id;
				         ?>




<?php
if( $sub_cats ){
	foreach( $sub_cats as $cat ){

		// Данные в объекте $cat

		// $cat->term_id
		// $cat->name (Рубрика 1)
		// $cat->slug (rubrika-1)
		// $cat->term_group (0)
		// $cat->term_taxonomy_id (4)
		// $cat->taxonomy (category)
		// $cat->description ()
		// $cat->parent (0)
		// $cat->count (14)
		// $cat->object_id (2743)
		// $cat->cat_ID (4)
		// $cat->category_count (14)
		// $cat->category_description ()
		// $cat->cat_name (Рубрика 1)
		// $cat->category_nicename (rubrika-1)
		// $cat->category_parent (0)

		echo '<h3>'. /*$cat->name .*/'</h3>';

		# получаем записи из рубрики
		/*$myposts = get_posts( array(
			'numberposts' => -1,
			'category'    => $cat->cat_ID,
			'orderby'     => 'post_date',
			'order'       => 'DESC',
		) );*/
		# выводим записи
		/*global $post;
		foreach($myposts as $post){
			setup_postdata($post);
			echo '<li><a href="'. get_permalink() .'">'. get_the_title() .'</a></li>';
		}
		wp_reset_postdata();*/ // сбрасываем глобальную переменную пост

	}
}
?>




				        <?php $value1 = get_post_field( "make" );
				        	  $value2 = get_post_field( "gznk-price" );
				        	  $value = get_post_field( "price" );
				        ?>

						<div class="doc-item">
					    	<!-- contents of Your Post -->
					    	<h2 class="cat-doc"><?php /*echo get_cat_name( $post->ID ); */
					    		/*if( is_category() )  
									echo get_queried_object()->name;*/
									/*single_term_title();*/ /*the_title();*/
									/*single_cat_title('Вы находитесь в категории: ');*/
									/*the_category(); Выводит все категории CPT study (Документы)*/
									/*$cat = get_the_category();*/ 
									/* echo $cat[1]->cat_name; Выводит категорию текущего CPT*/
								?>
					    	</h2>
					    	<?php /*$cat = get_the_category(); print_r ($cat);*/ /* $term = get_terms(); print_r($term); */ //$cat = get_category( $post->ID ); print_r($cat);
					    		/*if ( $cat->category_parent == 141 ) {*/ 
					            if( $post_id == 136 ) { ?>
					                <h2 class="doc-item-title"><?php the_title(); ?></h2>
					            <?php } else { ?>
					                <h4 class="doc-item-title"><?php the_title(); ?></h4>
					        <?php } ?>
					        <!-- <h4 class="doc-item-title"><?php /*the_title();*/ ?></h4> -->
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
