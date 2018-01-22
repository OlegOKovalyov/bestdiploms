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
			<div class="entry-content col-lg-9">
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
				<h1><?php the_title() ?></h1>

				<!-- Display CPT study content -->
				<?php /*the_post_thumbnail( array( 580, 408 ) );*/
					$post_id = $post->ID; /*echo '$post_id = ' . $post_id;*/ // Current CPT	
					//$post_parent_id = wp_get_post_parent_id ($post->ID); echo $post_parent_id; // Parent CPT
				?>

            	<div class="entry-content"><?php $curstudycntnt = get_the_content(); ?></div>

						<div class="price-item">

					    	<?php /*$sub_cat = get_categories( array(
								'child_of' => $extra_studyid,
							) );*/
				    		//$wp_post_parent_cat_id = wp_get_post_parent_id( $post->ID );
				    		//$post_cat_id = $post->ID;
				            //while( $post_id == wp_get_post_parent_id( $post->ID ) ) { ?>
				                <!-- <h3 class="doc-item-title"><?php /*the_title();*/ ?></h3> -->
						
								<?php $in_args = array(
						        	'order'			 => 'ASC',
						        	'post_parent'	 => $post_id, // $sub_cat, //
						        	'orderby'		 => 'parent',
						            'post_type' 	 => 'study',
						            'posts_per_page' => -1,
						            //'category_name'  => 'education-all', // Все виды образования
						            'category_name'  => 'education-cat',
						            //'category_name' => 'education1',
						            //'category_name' => 'education2',
						            //'category_name' => 'documents-pop', // Самые популярные документы
							        ); 		
								$i_loop = 0;
								$in_loop = new WP_Query( $in_args );
				        		if ( $in_loop->have_posts() ) : while ( $in_loop->have_posts() ) : $in_loop->the_post(); 		
				        		//$meta = get_post_meta( $post->ID, 'your_fields', true ); 
								$value1 = get_post_field( "make" ); // Meta-box for Document Creation Date
								$value2 = get_post_field( "gznk-price" ); // Meta-box for GOZNAK Price
								$value = get_post_field( "price" );	// Meta-box for Typography Price
								$postin_id = $post->ID; /*echo $postin_id;*/
					$category = get_the_category(); ?><!-- <pre><?php /*print_r ($category)*/ ?></pre> --><?php
					$post_doc_id[$i_loop] = $post->ID; /*echo '$post_doc_id = ';*/  ?><!-- <pre><?php /*print_r ($post_doc_id)*/ ?></pre> --><?php
 					/*$cat_notin = $category[0]->slug; $cat_notin = $category[0]->category_nicename;
					echo '$cat_notin = ' . $cat_notin . '<br>'; 
					
					$cat_notin_id = $category[0]->cat_ID; echo '$cat_notin_id = ' . $cat_notin_id;*/

						            if( $value || $value2 ) { ?>

										<!--<span>
									        <a href="#" target="_blank" rel="noopener">-->
									            <?php /*if ( has_post_thumbnail() ) {
									                the_post_thumbnail();
									            }*/ ?>
									        <!-- </a> -->
										    <!-- <div class="price-props"> -->
										        <!-- <h4 class="price-item-title"><?php /*the_title();*/ ?> <span class="price-item-year"> <?php /*echo $value1;*/ ?></span></h4> -->

										        <?php					            
									                /*echo '<p class="page-price-gznk">' . $value2 . '</p>';
									                echo '<p class="page-price-tpgrf">' . $value . '</p>';*/
								        		?>

								                <!-- <a class="btn btn-danger" href="#" role="button">Заказать</a> -->

											<?php  } else {
												/* echo '<p>empty</p>';*/
											} ?>

											<!-- </div> --><!-- .price-props -->
							    		<!-- </span> -->


						<?php // Уменьшаем заголовок карты до Диплом бакалавра, Диплом магистра (без дат выпуска)
							$card_title = get_the_title();
							$array_title = explode(" ", $card_title); // Переводим строку в массив
							$array_title = array_slice($array_title, 0, 2); // Выбираем первые два слова-элемента массива
							$newtext = implode(" ", $array_title); // Массив снова переводим в строку
							/*echo $newtext;*/
						 ?>


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
										        <h4 class="price-item-title"><?php /*the_title();*/ echo $newtext ?> <span class="price-item-year"> <?php echo $value1; ?></span></h4>

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





				        
							<?php $i_loop = $i_loop + 1; endwhile; 
							endif; /*}*/ ?>

						</div><!-- .price-item -->

					<?php /*endwhile; endif;*/ wp_reset_postdata(); ?>  




						<!-- <div class="price-item"> -->
								<?php // Вывод карты товара по категории education-kind, что неправильно. Мы выводим выше по категории education-doc
								/*$value1 = get_post_field( "make" ); // Meta-box for Document Creation Date
								$value2 = get_post_field( "gznk-price" ); // Meta-box for GOZNAK Price
								$value = get_post_field( "price" );	// Meta-box for Typography Price */
						            if( $value || $value2 ) { ?>

										<!--<section>
									        <a href="#" target="_blank" rel="noopener">-->
									            <?php /*if ( has_post_thumbnail() ) {
									                the_post_thumbnail( array( 280, 128 ) );
									            }*/ ?>
									        <!--</a>
										    <div class="price-props">-->
										        <!-- <h4 class="price-item-title"><?php /*the_title();*/ ?> <span class="price-item-year"> <?php /*echo $value1;*/ ?></span></h4> -->

										        <?php					            
									                /*echo '<p class="page-price-gznk">' . $value2 . '</p>';
									                echo '<p class="page-price-tpgrf">' . $value . '</p>';*/
								        		?>

								                <!-- <a class="btn btn-danger" href="#" role="button">Заказать</a> -->

									<?php  } else {
										/* echo '<p>empty</p>';*/
									} ?>

									    <!-- </div> --><!-- .price-props -->
							    	<!-- </section> -->
				        
							<?php /*endwhile; 
							endif; }*/ ?>

						<!-- </div> --><!-- .price-item -->            	


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
				<?php echo $curstudycntnt; // Выводим содержимое записи CPT study (Документы) - контент из админ-панели. ?>
			</div><!-- .entry-content . col-lg-9 -->

			<div class="col-lg-3 sb-secondry">
		        <?php get_sidebar( 'right' ); ?>
		    </div>
	    </div><!-- .row -->  
		
		<h2>Другие дипломы</h2>

<?php
/*global $post;*/
/*$categories = get_the_category($post->ID);*/ ?>
<?php /*var_dump($categories);*//* $categories->category_nicename;*/ /*echo $categories[1]->category_nicename;*/ echo $cat_notin; /*echo $cat_id;*/ ?>	

		<?php
			// Вывод карусели с другими дипломами.
			if( function_exists( 'other_study_carousel' ) ) echo other_study_carousel($post_doc_id); ?>	    

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

<script>
/*function myFunction() {
    var x = document.getElementsByClassName("study-link-title");
    x[0].innerHTML = "Hello World!";
}*/
</script>

 <!-- onclick="myFunction()" -->