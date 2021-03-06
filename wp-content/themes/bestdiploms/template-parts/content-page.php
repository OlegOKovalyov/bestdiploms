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

	<?php
	if ( is_front_page() /*&& is_home()*/ ) : ?>
	<!-- Вывод карусель (CPT 'study') на Главной странице -->
	<?php if( function_exists( 'fp_carousel' ) ) echo fp_carousel(); ?>

		<?php bestdiploms_post_thumbnail(); ?>

		<div class="row">
			<div class="entry-content col-lg-9">
				<?php the_content() ?>
			</div><!-- .entry-content -->

			<div class="col-lg-3 sb-secondry">
		        <?php four_essences() ?>
		    </div>
	    </div><!-- .row -->  

	<!-- 369: Цены -->
	<?php elseif ( 369 == get_the_ID() ) : ?>

		<!-- Вывод CPT study (Документы) на странице Цены -->
		<div class="row">
	    <div class="entry-content col-lg-12">

			<?php if ( function_exists( 'four_essences' ) ) four_essences(); ?>
			<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>

			<h1><?php the_title() ?></h1>
	     
		    <?php $study_args = array(
		    	'order'			 => 'ASC',
		        'post_parent'	 => 141,
		        //'orderby'		 => 'parent',		    	
		        'post_type' => 'study',
		        'posts_per_page' => -1,
		    ); ?>

		    <?php 
		    $price_text = get_the_content();
		    $study_loop = new WP_query ( $study_args );
			if ( $study_loop->have_posts() ) : while ( $study_loop->have_posts() ) : $study_loop->the_post(); ?>

			<div class="row">
				<h2><?php the_title() ?></h2>
					<div class="study-cats-item col-12">

						<?php $extra_studyid = get_the_ID(); ?>

					    <!-- Displaying the Custom Post 'study' on Price Page (can display anywhere). --> 
					    <?php $args = array(
					        	'order'			 => 'DESC',
					        	//'post_parent__in' => array( 429, 454, 554, 565 ),
					        	'post_parent'	 => $extra_studyid,
					        	//'orderby'		 => 'parent',
					        	'orderby'		 => 'date',
					            'post_type' 	 => 'study',
					            'posts_per_page' => -1,
					            'category_name'  => 'education-kind', // Все виды образования
				        		);  
				        $extra_loop = new WP_Query( $args );
				        if ( $extra_loop->have_posts() ) : while ( $extra_loop->have_posts() ) : $extra_loop->the_post();
					        $post_id = $post->ID; // Current CPT 
					    ?>

						<div class="price-item">

					    	<?php while(  $post->ID  == $post_id ) { ?>
						
								<?php $in_args = array(
							        	'order'			 => 'ASC',
							        	'post_parent'	 => $post_id,
										'orderby'		 => 'menu_order',						        
							        	'orderby'		 => 'parent',
							            'post_type' 	 => 'study',
							            'posts_per_page' => -1,
							            'category_name'  => 'education-kind', // Вид категории Образование (например, Диплом бакалавра, Диплом магистра)
								); 		

								$in_loop = new WP_Query( $in_args );
				        		if ( $in_loop->have_posts() ) : while ( $in_loop->have_posts() ) : $in_loop->the_post();

								$value1 = get_post_field( "make" ); // Meta-box for Document Creation Date
								$value2 = get_post_field( "gznk-price" ); // Meta-box for GOZNAK Price
								$value = get_post_field( "price" );	// Meta-box for Typography Price
								
								// Уменьшаем заголовок карты до Диплом бакалавра, Диплом магистра (без дат выпуска)
								$card_title = get_the_title();
								$array_title = explode(" ", $card_title); // Переводим строку в массив
								$array_title = array_slice($array_title, 0, 2); // Выбираем первые два слова-элемента массива
								$newtext = implode(" ", $array_title); // Массив снова переводим в строку								
					            if( $value || $value2 ) { ?>

									<h3 class="doc-item-title"><?php the_title(); ?></h3>
									<section>
										<div class="price-img col-4 d-flex justify-content-center">
									        <a href="<?php echo get_the_post_thumbnail_url( $post->ID, array(580,408) ); ?>"  data-fancybox="images" data-caption="<?php the_title() ?>">
											            <?php if ( has_post_thumbnail() ) {
											                the_post_thumbnail( array( 215, 128 ) );
											            } ?>
											</a>
										</div>
									    <div class="price-props col">
									        <h4 class="price-item-title"><?php /*the_title();*/  echo $newtext  ?> <span class="price-item-year"> <?php echo $value1; ?></span></h4>

									        <?php					            
								                echo '<p class="page-price-gznk">' . $value2 . '</p>';
								                echo '<p class="page-price-tpgrf">' . $value . '</p>';
							        		?>

							                <a class="btn btn-danger" href="<?php echo home_url() . '/zakazat-diplom/' ?>" role="button">Заказать</a>
							                <a  id="#video-<?php echo $post->ID ?>" class="video-link" href="<?php echo home_url() . '/video-dokumentov/' . '#video-' .  $post->ID ?>"><img src="<?php bloginfo('template_url'); ?>/images/i_filmstrip.png" alt="Filmstrip Icon">Видео документа</a>
									    </div><!-- .price-props -->
							    	</section>

								<?php  } else { /*echo '<p>empty</p>'; */ } ?>	
							<?php endwhile; endif; } ?>

						</div><!-- .price-item -->

					<?php endwhile; endif; //wp_reset_postdata(); ?>  
					<?php //the_content();
					      //echo $price_text;
				
					wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
						'after'  => '</div>',
					) ); 
					?>

					</div><!-- .study-cats-item -->

				</div><!-- .row -->

				<?php endwhile; endif; wp_reset_postdata(); echo $price_text; ?>
			</div><!-- .entry-content -->
		</div><!-- .row -->


	<!-- 376: Оплата и доставка, Степени защиты документов -->
	<?php elseif ( 376 == get_the_ID() || 586 == get_the_ID()  ) : ?>

		<div class="row">
			<div class="entry-content col-lg-12">
				<?php if ( function_exists( 'four_essences' ) ) four_essences(); ?>
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
				<h1><?php the_title() ?></h1>		

				<?php the_content();
				
					wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
						'after'  => '</div>',
					) );
				?>

			</div><!-- .entry-content -->
	    </div><!-- .row -->  

	<!-- 212: Вопросы и ответы -->
	<?php elseif ( 212 == get_the_ID() ) : ?>
		<?php global $mytheme; ?>

		<!-- Вывод вопросов и ответов (CPT 'faqposts') на странице Вопросы и ответы -->
		<div class="row">
			<div class="entry-content col-lg-12">
				<?php if ( function_exists( 'four_essences' ) ) four_essences(); ?>
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
				<h1><?php the_title() ?></h1>		
				<?php the_content(); ?>

				<p class="sm-text">Вы можете написать нам на адрес электронной почты <span class="addr-email"><a href="mailto:bestdiplomy@gmail.com"><?php echo $mytheme['email']; ?></a></span></p>
				<p class="sm-text">Также задать любой вопрос можно по указанным телефонным номерам:<br>
					<span class="tel-num"><a href="<?php echo 'tel:' . $mytheme['phone-1']; ?>"> <?php echo $mytheme['phone1']; ?></a></span><br>
					<span>(бесплатно со всех номеров)</span><br>
					<span class="tel-num"><a href="<?php echo 'tel:' . $mytheme['phone-2']; ?>"> <?php echo $mytheme['phone2']; ?>.</a></span>
				</p>


				<div id="accordion" class="divaccordion" role="tablist">

				    <?php 
				    // Displaying the Custom Post 'faqposts' in Accordion (can display anywhere). 
				    	$ourCurrentPage = get_query_var('paged');
				        $args = array(
				        	'order'			 	=> 'DESC',
				            'post_type' 		=> 'faqposts',
				            'posts_per_page' => 10, // Вывод кол-ва постов на страницу (меняем)
            				'paged' => $ourCurrentPage,
				        );  
				        $your_loop = new WP_Query( $args ); 
				        $i_loop = 0;
				        if ( $your_loop->have_posts() ) : while ( $your_loop->have_posts() ) : $your_loop->the_post(); 
				        $i_loop = $i_loop + 1; 
				    ?>

					<div class="card">
						<div class="card-header" role="tab" id="heading-<?php echo $i_loop; ?>">
							<h5 class="">
								<a class="collapsed" data-toggle="collapse" href="#collapse-<?php echo $i_loop; ?>" role="button" aria-expanded="false" aria-controls="collapse-<?php echo $i_loop; ?>">
								  <?php the_excerpt() ?>
								  <?php if ( 1 == $i_loop ) : ?>
								  	<i class="fa fa-angle-down fa-2x" aria-hidden="true"></i>
								  <?php else : ?>	
								  	<i class="fa fa-angle-right fa-2x" aria-hidden="true"></i>
								  <?php endif; ?>
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

				    <?php endwhile; 

				    	endif; wp_reset_postdata(); 

				    ?>  

					<script>
						/*Делаем первый блок аккордиона открытым*/
						document.getElementById('collapse-1').classList.add('show');
						/* Смена иконки справа от заголовков блоков аккордеона с > на v */
						function toggleIcon(e) {
						    jQuery(e.target)
						        .prev('.card-header')
						        .find(".fa")
						        .toggleClass('fa-angle-right fa-angle-down');
						}
						jQuery('.divaccordion').on('hidden.bs.collapse', toggleIcon);
						jQuery('.divaccordion').on('shown.bs.collapse', toggleIcon);
					</script>

				</div><!-- #accordion -->

				<?php echo '<div class="wrap-page-numbers">' . paginate_links(
					array(
		                'total' => $your_loop->max_num_pages,
		                'prev_text'    => __('<'),
						'next_text'    => __('>'),
		            )) . '</div>';
            	?>
				<!-- Выводим форму Задать вопрос  -->
            	<?php //echo do_shortcode('[faqorderform]'); ?>
            	<?php echo do_shortcode('[contact-form-7 id="500" title="Задать вопрос"]'); ?>

				<?php
					wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
						'after'  => '</div>',
					) );
				?>

			</div><!-- .entry-content -->
	    </div><!-- .row -->  	    

	<!-- 259: Статьи -->
	<?php elseif ( 259 == get_the_ID() ) : ?>
		<!-- Вывод статей (CPT 'article') на странице Статьи -->
		<div class="row">
			<div class="entry-content col-lg-12">
				<?php if ( function_exists( 'four_essences' ) ) four_essences(); ?>
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
				<h1><?php the_title() ?></h1>		
				<?php the_content(); ?>
				<div id="articles" class="divarticles" role="tablist">

				    <?php 
				    // Displaying the Custom Post 'arcticle' (can display anywhere). 
				    	$ourCurrentPage = get_query_var('paged');
				        $args = array(
				        	'order'			 	=> 'DESC',
				            'post_type' 		=> 'article',
				            'posts_per_page' => 10, // Вывод кол-ва постов на страницу (меняем)
            				'paged' => $ourCurrentPage,
				        );  
				        $your_loop = new WP_Query( $args ); 
				        $i_loop = 0;
				        if ( $your_loop->have_posts() ) : while ( $your_loop->have_posts() ) : $your_loop->the_post(); 
				        $i_loop = $i_loop + 1; 
				    ?>

					<div class="media article-links">
						<div class="media-img-article">
							<?php if ( has_post_thumbnail() ) {
				                the_post_thumbnail();
				            } ?>
						</div>
						<div class="media-body">
							<h4><a href="<?php echo get_permalink() ?>"><?php the_title() ?></a></h4>
							<p>

								<?php $content = get_the_content();
									$trimmed_content = wp_trim_words( $content, 25, '<a href="'. get_permalink() .'"> ... далее >></a>' );
									echo $trimmed_content; 
								?>

							</p>
						</div><!-- .media-body -->
					</div><!-- .media .article-links -->

				    <?php endwhile; endif; wp_reset_postdata(); ?>  

				</div><!-- #articles .divarticles -->

				<?php echo '<div class="wrap-page-numbers">' . paginate_links(
					array(
		                'total' => $your_loop->max_num_pages,
		                'prev_text'    => __('<'),
						'next_text'    => __('>'),
		            )) . '</div>';
            	?>
				<!-- Выводим форму Задать вопрос  -->
            	<?php echo do_shortcode('[contact-form-7 id="500" title="Задать вопрос"]'); ?>

				<?php
					wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
						'after'  => '</div>',
					) );
				?>

			</div><!-- .entry-content -->
	    </div><!-- .row -->  		

	<!-- 282: Отзывы -->
	<?php elseif ( 282 == get_the_ID() ) : ?>
		<!-- Вывод комментариев (CPT reviews) на странице Отзывы -->
		<div class="row">
			<div class="entry-content col-lg-12">
				<?php if ( function_exists( 'four_essences' ) ) four_essences(); ?>
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>

				<h1><?php the_title() ?></h1>		
				<?php the_content(); ?>

				<div id="reviews" class="divreviews" role="tablist">

				    <?php 
				    // Displaying the Custom Post 'faqposts' in Owl Carousel (can display anywhere). 
				    	$ourCurrentPage = get_query_var('paged');
				        $args = array(
				        	'order'			 	=> 'DESC',
				            'post_type' 		=> 'reviews',
				            'posts_per_page' => 10, // Вывод кол-ва постов на страницу (меняем)
            				'paged' => $ourCurrentPage,
				            //'category_name' 	=> 'faq', 
				        );  
				        $your_loop = new WP_Query( $args ); 
				        if ( $your_loop->have_posts() ) : while ( $your_loop->have_posts() ) : $your_loop->the_post(); 

						$value1 = get_post_field( "rev-name" ); // Meta-box for Review Author Name
						$value2 = get_post_field( "rev-email" ); // Meta-box for Review Author Email
						$value = get_post_field( "rev-date" );	// Meta-box for Review Date
						$value3 = get_post_meta( 282, "description", true ); // Meta-box for Reviews (Отзывы) Text Area

					    if( $value || $value2 ) { 
					?>

					<section>
					    <div class="rev-props">
					        <h5 class="rev-item-name"><?php echo $value1; ?>
					        	<span class="rev-item-date"> <?php echo $value; ?></span>
					        </h5>

					        <?php the_content() ?>			            

					        <?php  }  ?>
							

					    </div><!-- .rev-props -->
					</section>

					    <?php endwhile; endif; wp_reset_postdata(); ?>  

					<?php echo '<div class="wrap-page-numbers">' . paginate_links(
						array(
			                'total' => $your_loop->max_num_pages,
			                'prev_text'    => __('<'),
							'next_text'    => __('>'),
			            )) . '</div>';
	            	?>
					<!-- Выводим форму Задать вопрос  -->
	            	<?php echo do_shortcode('[contact-form-7 id="502" title="Написать отзыв"]'); ?>
	            	<!-- Выводим произовольное мета поле внизу страницы Отзывы (согласно PSD-макету) -->
	            	<?php echo '<p>' . $value3 . '</p>'; ?>

					<?php
						wp_link_pages( array(
							'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
							'after'  => '</div>',
						) );
					?>

				</div><!-- #reviews .divreviews -->
			</div><!-- .entry-content -->
	    </div><!-- .row -->  

	<!-- 328: Города -->
	<?php elseif ( 328 == get_the_ID() ) : ?>

		<div class="row">
			<div class="entry-content col-lg-12">
				<?php if ( function_exists( 'four_essences' ) ) four_essences(); ?>
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
				<h1><?php the_title() ?></h1>		

				<?php the_content(); ?>

			    <div class="cities-links">	    
			     
				    <?php $cities_args = array(
				    	'order'		=> 'ASC',
				    	'orderby'	=> 'title',
				        'post_type' => 'cities',
				        'posts_per_page' => -1,
				    ); ?>

					<div class="city-link">
						<ul>
						    <?php $cities_loop = new WP_query ( $cities_args );
							if ( $cities_loop->have_posts() ) : while ( $cities_loop->have_posts() ) : $cities_loop->the_post(); ?>					
							        <li class="city-link-title">
							        	<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
							    	</li>

							<?php endwhile; endif; ?>
						</ul>
					</div><!-- .city-link -->

					<?php wp_reset_postdata(); ?>

				</div><!-- .cities-links -->
				<div class="cities-ordeform">
					<?php echo do_shortcode('[contact-form-7 id="496" title="Заказать диплом"]'); ?>
				</div>

				<?php wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
						'after'  => '</div>',
					) );
				?>

			</div><!-- .entry-content -->
	    </div><!-- .row -->  

	<!-- 357: Контакты -->
	<?php elseif ( 357 == get_the_ID() ) : ?>
		<?php global $mytheme; ?>

		<div class="row">
			<div class="entry-content col-lg-12">
				<?php if ( function_exists( 'four_essences' ) ) four_essences(); ?>
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
				<h1><?php the_title() ?></h1>		

				<?php the_content(); ?>

				<p class="sm-text">Вы можете написать нам на адрес электронной почты <span class="addr-email"><a href="mailto:bestdiplomy@gmail.com"><?php echo $mytheme['email']; ?></a></span></p>
				<p class="sm-text">Также звоните нам по телефонным номерам:<br>
					<span class="tel-num"><a href="<?php echo 'tel:' . $mytheme['phone-1']; ?>"> <?php echo $mytheme['phone1']; ?></a></span><br>
					<span>(бесплатно со всех номеров)</span><br>
					<span class="tel-num"><a href="<?php echo 'tel:' . $mytheme['phone-2']; ?>"> <?php echo $mytheme['phone2']; ?>.</a></span>
				</p>

				<?php wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
						'after'  => '</div>',
					) );
				?>

				<p class="sm-text">Наш офис:</p>
				<div class="our-office d-flex justify-content-center">
					<script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?sid=glJbquSLwU6Mz4u0kAMxhG9P_XuELL_y&amp;width=400&amp;height=400&amp;lang=ru_RU&amp;sourceType=constructor&amp;scroll=true"></script>
				</div>

			</div><!-- .entry-content -->
	    </div><!-- .row -->  	 

	<!-- 485: Заказать диплом -->
	<?php elseif ( 485 == get_the_ID() ) : ?>
		<?php global $mytheme; ?>

		<div class="row">
			<div class="entry-content col-lg-12">
				<?php if ( function_exists( 'four_essences' ) ) four_essences(); ?>
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
				<h1><?php the_title() ?></h1>		

				<?php the_content(); ?>

				<?php echo do_shortcode('[contact-form-7 id="504" title="Заказать диплом (полная форма)"]'); ?>

				<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/js/bootstrap-datepicker.min.js" type="text/javascript"></script>
				<script src="<?php bloginfo('template_url'); ?>/bootstrap-datepicker.ru.min.js" charset="UTF-8"></script>	
				<script>
			        jQuery('#datepicker').datepicker({
					    format: 'dd/mm/yyyy',
					    startDate: '-3d',
					    startDate: '01/01/1945',
					    language: "ru",
					    changeYear : true,
					    startDate: '01/01/1900',
					    endDate: '01/01/2010',
					    startView: 2,
					    title: 'Выберите дату',
					    uiLibrary: 'bootstrap4'
					});
			    </script>

				<?php wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
						'after'  => '</div>',
					) );
				?>

			</div><!-- .entry-content -->
	    </div><!-- .row -->

	<!-- 487: Видео документов -->
	<?php elseif ( 487 == get_the_ID() ) : ?>
		<?php global $mytheme; ?>

		<div class="row">
			<div class="entry-content col-lg-12">
				<?php if ( function_exists( 'four_essences' ) ) four_essences(); ?>
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
				<h1><?php the_title() ?></h1>

			    <!-- Displaying the Custom Post 'study' on Docs Video Page (can display anywhere). --> 
			    <?php $args = array(
			        	'order'			 => 'ASC',
			        	'post_parent__in' => array( 429, 454, 554, 565 ), // Высшее образование, Аттестаты школы, Диплом техникума, колледжа, Свидетельства и другие документы
			        	'orderby'		 => 'parent',
			            'post_type' 	 => 'study',
			            'posts_per_page' => -1,
			            'category_name'  => 'education-kind', // Все виды документов
		        	);  
				$extra_loop = new WP_Query( $args );
		        if ( $extra_loop->have_posts() ) : while ( $extra_loop->have_posts() ) : $extra_loop->the_post();
			        $post_id = $post->ID; // Current CPT  ?>

			                <h3 class="doc-item-title"><?php the_title(); ?></h3>			        

				<div class="price-item">

					<?php while(  $post->ID == $post_id ) { ?>
				
					<?php $in_args = array(
				        	'order'			 => 'ASC',
				            'post_type' 	 => 'study',
				            'post_parent'	 => $post_id,
				            'posts_per_page' => -1,
				            'category_name'  => 'education-doc',
					    ); 		

						$in_loop = new WP_Query( $in_args );
		        		if ( $in_loop->have_posts() ) : while ( $in_loop->have_posts() ) : $in_loop->the_post();

			        		$post_in_id = $post->ID; // Current inner CPT
							$value1 = get_post_field( "make" ); // Meta-box for Document Creation Date
							$value2 = get_post_field( "gznk-price" ); // Meta-box for GOZNAK Price
							$value = get_post_field( "price" );	// Meta-box for Typography Price
							$value3 = get_post_field( "iframe-html" );	// Meta-box for Video <iframe> HTML Block
							
							// Уменьшаем заголовок карты до Диплом бакалавра, Диплом магистра (без дат выпуска)
							$card_title = get_the_title();
							$array_title = explode(" ", $card_title); // Переводим строку в массив
							$array_title = array_slice($array_title, 0, 2); // Выбираем первые два слова-элемента массива
							$newtext = implode(" ", $array_title); // Массив снова переводим в строку								
					            if( $value || $value2 ) { ?>

					                <div class="all-video" id="video-<?php echo $post_in_id ?>">

										<?php echo $value3; ?>

									</div>

								<?php  } else {
									echo '<p>empty</p>';
								} ?>	

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

				<?php the_content(); ?>

				<?php echo do_shortcode('[contact-form-7 id="496" title="Заказать диплом"]'); ?>

			</div><!-- .entry-content -->
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
