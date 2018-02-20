<?php
/**
 * Template part for displaying CPT study content in single-study.php
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

	<!-- Вывод документов (CPT 'study') на странице одного документа (по ссылке из левого primary сайдбара) -->
	<div class="row">
		<div class="entry-content col-lg-12">
			<?php if ( function_exists( 'four_essences' ) ) four_essences(); ?>
			<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
			<h1><?php the_title() ?></h1>
																																																																																																																																																																																																											
			<?php // Display CPT study content
				 $post_id = $post->ID; /*echo 'content-study.php';*/
				 $curstudycntnt = get_the_content();
			?>

			<div class="price-block">

				<?php 
					$in_args = array(
			        	'order'			 => 'ASC',
			        	'post_parent'	 => $post_id,
			        	'orderby'		 => 'parent',
			            'post_type' 	 => 'study',
			            'posts_per_page' => -1,
			            'category_name'  => 'education-cat',
				        ); 		
					$i_loop = 0;
					$in_loop = new WP_Query( $in_args );
	        		if ( $in_loop->have_posts() ) : while ( $in_loop->have_posts() ) : $in_loop->the_post(); 		

						// Формируем массив документов об образовании, которые будут выводиться на странице CPT study (Документы) при клике на ссылку в левом primary сайдбаре
						$post_doc_id[$i_loop] = $post->ID;

						// Уменьшаем заголовок карты до Диплом бакалавра, Диплом магистра (без дат выпуска)
						$card_title = get_the_title();
						$array_title = explode(" ", $card_title); // Переводим строку в массив
						$array_title = array_slice($array_title, 0, 2); // Выбираем первые два слова-элемента массива
						$newtext = implode(" ", $array_title); // Массив снова переводим в строку
			 	?>

				<div class="price-item">
						<?php
						$value1 = get_post_field( "make" ); // Meta-box for Document Creation Date
						$value2 = get_post_field( "gznk-price" ); // Meta-box for GOZNAK Price
						$value = get_post_field( "price" );	// Meta-box for Typography Price
						$value3 = get_post_field( "iframe-html" );	// Meta-box for Video <iframe> HTML Block 
				            if( $value || $value2 ) { ?>

								<h4 class="price-item-title"><?php echo $newtext ?> <span class="price-item-year"> <?php echo ' ' . $value1; ?></span></h4>
								<section>
								     <!-- <div class="row"> -->
									    <div class="price-props">

							        <a href="<?php echo get_the_post_thumbnail_url( $post->ID, array(580,408) ); ?>"  data-fancybox data-caption="<?php the_title() ?>">
							            <?php if ( has_post_thumbnail() ) {
							                the_post_thumbnail( array( 280, 128 ) );
							            } ?>
							        </a>												    	

									        <?php					            
								                echo '<p class="page-price-gznk">' . $value2 . '</p>';
								                echo '<p class="page-price-tpgrf">' . $value . '</p>';
							        		?>

							                <a class="btn btn-danger" href="<?php echo home_url() . '/zakazat-diplom/' ?>" role="button">Заказать</a>
								    	</div><!-- .price-props -->
										<div class="" id="video-<?php echo $post_doc_id[$i_loop] ?>">
											<?php					            
										        echo '<p class="page-price-gznk">' . $value3 . '</p>';
											?>
										</div>
									<!-- </div> --><!-- .row -->								    	
					    		</section>

							<?php  } else {
								echo '<p>empty</p>';
							} ?>							    	

				</div><!-- .price-item -->            	
	        
				<?php $i_loop = $i_loop + 1; endwhile; endif; wp_reset_postdata(); ?>

			</div><!-- .price-block -->

				<?php echo $curstudycntnt; // Выводим содержимое записи CPT study (Документы) - контент из админ-панели. ?>
	
				<?php
					wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
						'after'  => '</div>',
					) );
				?>

		</div><!-- .entry-content . col-lg-9 -->

		<!-- <div class="col-lg-3 sb-secondry">
	        <?php //get_sidebar( 'right' ); ?>
	    </div> -->
    </div><!-- .row -->  
		
	<h2>Другие дипломы</h2>

	<?php
		// Вывод карусели с другими дипломами.
		if( function_exists( 'other_study_carousel' ) ) echo other_study_carousel($post_doc_id); 
	?>	    

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
// Делаем текущую ссылку на страницу CPT study (Документы) активной (добавляем класс active для нее)	
jQuery(function () { 
    jQuery('.study-link-title a').each(function () {
        var location = window.location.href;
        var link = this.href; 
        if(location == link) {
            jQuery(this).addClass('active');
        }
    });
});
</script>