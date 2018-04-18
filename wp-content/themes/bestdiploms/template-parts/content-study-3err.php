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

	<!-- Вывод документов (CPT 'study') на странице одного документа (по ссылке из левого primary сайдбара) -->
	<div class="row">
		<div class="entry-content col-lg-12">
			<?php if ( function_exists( 'four_essences' ) ) four_essences(); ?>
			<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
			<h1><?php the_title() ?></h1>
																																																																																																																																																																																																											
			<?php // Display CPT study content
				 $post_id = $post->ID;
				 $curstudycntnt = get_the_content();
			?>

			<div class="price-block">

				<?php 
					$i_loop = 0;				
					$in_args = array(
			        	'order'			 => 'ASC',
			        	'post_parent'	 => $post_id,
			        	'orderby'		 => 'parent',
			            'post_type' 	 => 'study',
			            'posts_per_page' => -1,
			            'category_name'  => 'education-cat',
			            //'category_name'  => 'education-kind', // рабочий вариант
			            //'category_name'  => 'education-doc',
				        ); 		
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
							<div class="price-props">
						        <a href="<?php echo get_the_post_thumbnail_url( $post->ID, array(580,408) ); ?>"  data-fancybox="images" data-caption="<?php the_title() ?>">
						            <?php if ( has_post_thumbnail() ) {
						                //the_post_thumbnail( array( 280, 128 ) );
						                the_post_thumbnail( array( 215, 128 ) );
						            } ?>
						        </a>

								<?php 
								// Высвечиваем image-вложения - study-галереи с помощью fancybox 3 (слайдер)
								$args = array(
								'post_type' => 'attachment',
								'post_mime_type' => 'image',
								'numberposts' => -1,
								'post_status' => 'inherit',
								'post_parent' => $post->ID,
								'order'       => 'ASC',
								);

								$attachments = get_posts( $args );
								if ( $attachments ) { ?>
								<?php 	$cnt = 1; $echo_html = '';
								    foreach ( $attachments as $attachment ) {
								    	//$echo_html = '<a data-fancybox="images" data-caption="' . get_the_title() . '-' . $cnt . '"';
								    	//$echo_html = '<a data-fancybox="images" data-caption="' . wp_get_attachment_caption( $attachment->ID ) . '-' . $cnt . '"';
										if ( $cnt > 1) {    	
									    	$echo_html = '<a data-fancybox="images" data-caption="' . wp_get_attachment_caption( $attachment->ID ) . '" ';
									    	$echo_html .= 'href="';
									        $echo_html .=  wp_get_attachment_image_url( $attachment->ID, 'full' ) . '">';
									        $echo_html .= '</a>';
									        $echo_html .= '</a>';
									        echo $echo_html; 
								    	}
								        $cnt++; 
								      }
								 }
								?>

						        <?php					            
					                echo '<p class="page-price-gznk">' . $value2 . '</p>';
					                echo '<p class="page-price-tpgrf">' . $value . '</p>';
				        		?>

					            <a class="btn btn-danger" href="<?php echo home_url() . '/zakazat-diplom/' ?>" role="button">Заказать</a>
						    </div><!-- .price-props -->
							<div class="video-iframe" id="video-<?php echo $post_doc_id[$i_loop] ?>">
								<?php					            
							        echo '<p class="page-price-gznk">' . $value3 . '</p>';
								?>
							</div>
					    	
			    		</section>

					<?php  } else {
						echo '<p>empty</p>';
					} ?>							    	

				</div><!-- .price-item -->            	
	        
				<?php $i_loop++; endwhile; endif; wp_reset_postdata(); ?>

			</div><!-- .price-block -->

				<?php echo $curstudycntnt; // Выводим содержимое записи CPT study (Документы) - контент из админ-панели. ?>
	
				<?php
					wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
						'after'  => '</div>',
					) );
				?>

		</div><!-- .entry-content . col-lg-9 -->

    </div><!-- .row -->  
		
	<h2>Другие дипломы</h2>

	<?php
		// Вывод карусели с другими дипломами.
		/*$categories = get_categories(array(
			'order'			 	=> 'ASC',
			'post_type' 		=> 'study',
			'category_name'		=> 'education-doc',
			'post_status'		=> 'publish',
		));*/
		//$cat_id = get_cat_ID( 'education-cat' ); print_r($cat_id);
		//$cat_post_id = get_ancestors( $post_id, 'education-kind' ); print_r($cat_post_id);
		//$cat_name = 'education-cat'; echo "$post_doc_id[0]";
		//$cat_post_id = get_ancestors( $post_doc_id[0], $cat_name ); echo '$cat_post_id= '; print_r($cat_post_id);

		$cat_post_id = truemisha_post_id_by_cat_tag( 19 ); echo '$cat_post_id= '; print_r($cat_post_id);
		if( function_exists( 'other_study_carousel' ) ) echo other_study_carousel($post_doc_id, $cat_post_id); echo '$post_doc_id= '; print_r($post_doc_id);

		//if( function_exists( 'other_study_carousel' ) ) echo other_study_carousel($post_doc_id, ''); echo '$post_doc_id= '; print_r($post_doc_id);
		//if( function_exists( 'other_study_carousel' ) ) echo other_study_carousel($post_doc_id, $categories); print_r($post_doc_id);
		//if( function_exists( 'other_study_carousel' ) ) echo other_study_carousel($categories); print_r($categories);
		//if( function_exists( 'other_study_carousel' ) ) echo other_study_carousel( array('473', '456', '640', '606', '608', '621', '651', '806', '557') ); 
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
<script type="text/javascript">
jQuery(document).ready(function() {
  jQuery('a[rel="fancybox"]').fancybox();
});
</script>