<?php
/**
 * Вывод различных каруселей Owl Carousel на сайте bestdiploms
 * Автор: Олег Ковалев
 * URL: https://github.com/OlegOKovalyov
 * Версия: 2018.01.06
 * Лицензия: MIT
 */

/**
 * Карусель на Главной (Front Page Carousel)
 */
function fp_carousel() {
	ob_start(); ?>	
		<div class="row">
			<div class="carousel-block col-lg-12"><!-- Здесь будет карусель -->

				<!-- Owl-Carousel -->
				<div class="owl-carousel owl-theme">

				    <?php 
				    // Displaying the Custom Post 'study' in Owl Carousel (can display anywhere). 
				        $args = array(
				        	'order'			 	=> 'ASC',
				            'post_type' 		=> 'study',
				            'posts_per_page' => -1,
				            'category_name' 	=> 'documents-pop', // Самые популярные документы
				        );  
				        $your_loop = new WP_Query( $args ); 

				        if ( $your_loop->have_posts() ) : while ( $your_loop->have_posts() ) : $your_loop->the_post(); 
				        $meta = get_post_meta( $post->ID, '', true ); ?>

				        <?php
							// Уменьшаем заголовок карты до Диплом бакалавра, Диплом магистра (без дат выпуска)
							$card_title = get_the_title();
							$array_title = explode(" ", $card_title); // Переводим строку в массив
							$array_title = array_slice($array_title, 0, 2); // Выбираем первые два слова-элемента массива
							$newtext = implode(" ", $array_title); // Массив снова переводим в строку
							// Получение метаданных внизу страницы админ-панели при заполнении страницы CPT study (Документы) в категории education-doc - Документ вида категории
				         	$value1 = get_post_field( "make" );
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
					        <h4 class="doc-item-title"><?php echo $newtext ?></h4>
					        <p class="doc-item-year"><?php echo $value1; ?></p>
					        <a href="#" target="_blank" rel="noopener">
					            <?php if ( has_post_thumbnail() ) {
					                the_post_thumbnail( array( 280, 128 ) );
					            } ?>
					        </a>
					        <?php
					            if( $value || $value2 ) {
					                echo '<p class="doc-price-gznk">' . $value2 . '</p>';
					                echo '<p class="doc-price-tpgrf">' . $value . '</p>';
					            } else {
					                echo '<p>empty</p>';
					        } ?>
					        <span class="doc-item-content"><?php /*the_content();*/ ?></span>
					        <a class="btn btn-danger" href="<?php echo home_url() . '/zakazat-diplom/' ?>" role="button">Заказать</a>
						</div><!-- .doc-item -->

				    <?php endwhile; endif; wp_reset_postdata(); ?>  

				</div><!-- .owl-carousel .owl-theme -->
				<!-- /Owl-Carousel -->

			</div><!-- .carousel-block -->
		</div><!-- .row -->
	<?php 
	return ob_get_clean();
}

/**
 * Карусель Другие дипломы ( CPT study (Документы) )
 */
function other_study_carousel( $cat_arg ) {
	ob_start(); ?>	
		<div class="row">
			<div class="carousel-block col-lg-12"><!-- Здесь будет карусель -->

				<!-- Owl-Carousel -->
				<div class="owl-carousel owl-theme">

				    <?php 
				    // Displaying the Custom Post 'study' in Owl Carousel (can display anywhere). 
				        $args = array(
				        	'order'			 	=> 'ASC',
				            'post_type' 		=> 'study',
				            'category_name'		=> 'education-doc',
				            'post__not_in'  	=>  $cat_arg,
				            'post_status'		=> 'publish',
				        );  
				        $your_loop = new WP_Query( $args ); 

				        if ( $your_loop->have_posts() ) : while ( $your_loop->have_posts() ) : $your_loop->the_post(); 
				        $meta = get_post_meta( $post->ID, '', true );
				        $cur_post = $post->ID; echo $cur_post; ?>

				        <?php $value1 = get_post_field( "make" );
				        	  $value2 = get_post_field( "gznk-price" );
				        	  $value = get_post_field( "price" );

							$card_title = get_the_title();
							$array_title = explode(" ", $card_title); // Переводим строку в массив
							$array_title = array_slice($array_title, 0, 2); // Выбираем первые два слова-элемента массива
							$newtext = implode(" ", $array_title); // Массив снова переводим в строку
						 ?>

						<div class="doc-item">
					    	<!-- content of the Post -->
					        <h4 class="doc-item-title"><?php echo $newtext ?></h4>
					        <p class="doc-item-year"><?php echo $value1; ?></p>
					        <a href="#" target="_blank" rel="noopener">
					            <?php if ( has_post_thumbnail() ) {
					                the_post_thumbnail( array( 280, 128 ) );
					            } ?>
					        </a>
					        <?php
					            if( $value || $value2 ) {
					                echo '<p class="doc-price-gznk">' . $value2 . '</p>';
					                echo '<p class="doc-price-tpgrf">' . $value . '</p>';
					            } else {
					                echo '<p>empty</p>';
					        } ?>

					        <a class="btn btn-danger" href="<?php echo home_url() . '/zakazat-diplom/' ?>" role="button">Заказать</a>
						</div><!-- .doc-item -->

				    <?php endwhile; endif; wp_reset_postdata(); ?>  

				</div><!-- .owl-carousel .owl-theme -->
				<!-- /Owl-Carousel -->

			</div><!-- .carousel-block -->
		</div><!-- .row -->
	<?php 
	return ob_get_clean();
}