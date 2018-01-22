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
				            //'category_name' 	=> 'education-all', // Все виды образования
				            //'category_name' 	=> 'education1',
				            //'category_name' 	=> 'education2',
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
							// Получение метаданных внизу страницы админ-панели при заполнении страницы CPT study (Документы) в категории education-doc - Документ вида категории Образование
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

/**
 * Карусель Другие дипломы ( CPT study (Документы) )
 */
function other_study_carousel( $cat_arg ) {
	ob_start(); ?>	
		<div class="row">
			<div class="carousel-block col-lg-12"><!-- Здесь будет карусель -->

				<!-- Owl-Carousel -->
				<div class="owl-carousel owl-theme">

				    <?php /*$cat_p_arg = $cat_arg[1]->category_parent; echo $cat_p_arg;
				    	  $cat_pp_arg = $cat_p_arg[1]->category_parent; echo $cat_pp_arg;*/
				    // Displaying the Custom Post 'study' in Owl Carousel (can display anywhere). 
				        $args = array(
				        	'order'			 	=> 'ASC',
				            'post_type' 		=> 'study',
				            //'category_name' 	=> 'education-all', // Все виды образования
				            //'category_name' 	=> 'education1',
				            //'category_name' 	=> 'education2',
				            //'category_name' 	=> $cat_arg,
				            //'post__not_in' 		=> array( 141, 143, 398 ),
				            //'category__not_in'	=> 'education1', 'no-category',
				            'category_name'		=> 'education-doc',
				            //'category__not_in'  => array($cat_arg),
				            'post__not_in'  	=>  $cat_arg,
				            'post_status'		=> 'publish',
				            //'category_name' 	=> 'documents-pop', // Самые популярные документы
				            //'cat'				=>  array ( -141, -398, -143 ),
				        );  
				        $your_loop = new WP_Query( $args ); 

				        if ( $your_loop->have_posts() ) : while ( $your_loop->have_posts() ) : $your_loop->the_post(); 
				        $meta = get_post_meta( $post->ID, '', true );
				        $cur_post = $post->ID; echo $cur_post; ?>

				        <?php $value1 = get_post_field( "make" );
				        	  $value2 = get_post_field( "gznk-price" );
				        	  $value = get_post_field( "price" );
				        ?>

				        <?php
							// если мы на странице категории
							if( is_category() ) 
								/*echo get_queried_object()->name;*/
				        ?>
						<?php  /*if ( 398 != $cur_post ) { echo $cur_post;*/

							$card_title = get_the_title();

							// Это не сработало							
							$pattern = "/^[^0-9]*/";
							$cut_card_title = preg_replace( $pattern, '', $card_title );
							/*echo $cut_card_title;*/

							// Это рабочий код (оставить!)
							$array_title = explode(" ", $card_title); // Переводим строку в массив
							$array_title = array_slice($array_title, 0, 2); // Выбираем первые два слова-элемента массива
							$newtext = implode(" ", $array_title); // Массив снова переводим в строку
							/*echo $newtext;*/

						 ?>

						<div class="doc-item">
					    	<!-- contents of Your Post -->
					        <h4 class="doc-item-title"><?php /*the_title();*/ echo $newtext ?></h4>
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
					        <a class="btn btn-danger" href="#" role="button">Заказать</a>
						</div><!-- .doc-item -->
						<?php /*}*/ ?>						

				    <?php endwhile; endif; wp_reset_postdata(); ?>  

				</div><!-- .owl-carousel .owl-theme -->
				<!-- /Owl-Carousel -->

			</div><!-- .carousel-block -->
		</div><!-- .row -->
	<?php 
	return ob_get_clean();
}