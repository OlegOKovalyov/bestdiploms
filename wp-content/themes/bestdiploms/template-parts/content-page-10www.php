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
	<!-- Вывод карусель Эталажей (CPT 'etalage') на Главной странице -->
	<?php if( function_exists( 'fp_carousel' ) ) echo fp_carousel(); ?>
	<?php /*echo do_shortcode('[fpcarousel]');*/ ?><!-- Шорткод тоже рабочий -->

		<?php bestdiploms_post_thumbnail(); ?>

		<div class="row">
			<div class="entry-content col-lg-9">
				<?php echo 
					the_content();

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

	<!-- 369: Цены -->
	<?php elseif ( 369 == get_the_ID() ) : ?>
		<!--<p class="site-title"><a href="<?php /*echo esc_url( home_url( '/' ) );*/ ?>" rel="home"><?php /*bloginfo( 'name' );*/ ?></a></p>-->

		<!-- Вывод CPT study (Документы) на странице Цены -->
		<div class="row">
			<div class="entry-content col-lg-9">
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
				<h1><?php the_title() ?></h1>

			    <!-- Displaying the Custom Post 'study' on Price Page (can display anywhere). --> 
			    <?php $args = array(
			        	'order'			 => 'DESC',
			        	'post_parent__in' => array( 429, 454 ),
			        	'orderby'		 => 'parent',
			            'post_type' 	 => 'study',
			            'posts_per_page' => -1,
			            'category_name'  => 'education-kind', // Все виды образования
		        	);  
		        $extra_loop = new WP_Query( $args );
		        if ( $extra_loop->have_posts() ) : while ( $extra_loop->have_posts() ) : $extra_loop->the_post();
			        $post_id = $post->ID; // Current CPT ?>

					<div class="price-item">

				    	<?php while(  $post->ID  == $post_id ) { ?>

			                <h3 class="doc-item-title"><?php the_title(); ?></h3>
					
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
				        		//$meta = get_post_meta( $post->ID, 'your_fields', true ); 
								$value1 = get_post_field( "make" ); // Meta-box for Document Creation Date
								$value2 = get_post_field( "gznk-price" ); // Meta-box for GOZNAK Price
								$value = get_post_field( "price" );	// Meta-box for Typography Price
					            if( $value || $value2 ) { ?>

									<section>
								        <!-- <a href="#" target="_blank" rel="noopener">
								            <?php if ( has_post_thumbnail() ) {
								                /*the_post_thumbnail( array( 280, 128 ) );*/
								            } ?>
								        </a> -->
								        <a href="<?php echo get_the_post_thumbnail_url( $post->ID, array(580,408) ); ?>"  data-fancybox data-caption="<?php the_title() ?>">
										            <?php if ( has_post_thumbnail() ) {
										                the_post_thumbnail( array( 280, 128 ) );
										            } ?>
										        </a>
									    <div class="price-props">
									        <h4 class="price-item-title"><?php the_title(); ?> <span class="price-item-year"> <?php echo $value1; ?></span></h4>

									        <?php					            
								                echo '<p class="page-price-gznk">' . $value2 . '</p>';
								                echo '<p class="page-price-tpgrf">' . $value . '</p>';
							        		?>

							                <a class="btn btn-danger" href="#" role="button">Заказать</a>
							                <a class="video-link" href="#">Видео документа</a>
									    </div><!-- .price-props -->
							    	</section>

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

			</div><!-- .entry-content -->

			<div class="col-lg-3 sb-secondry">
		        <?php get_sidebar( 'right' ); ?>
		    </div>
	    </div><!-- .row -->  

	<!-- 376: Оплата и доставка -->
	<?php elseif ( 376 == get_the_ID() ) : ?>

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

	<!-- 212: Вопросы и ответы -->
	<?php elseif ( 212 == get_the_ID() ) : ?>

		<!-- Вывод вопросов и ответов (CPT 'faqposts') на странице Вопросы и ответы -->
		<div class="row">
			<div class="entry-content col-lg-9">
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
				<h1><?php the_title() ?></h1>		
				<?php the_content(); ?>
				<div id="accordion" class="divaccordion" role="tablist">

				    <?php 
				    // Displaying the Custom Post 'faqposts' in Accordion (can display anywhere). 
				    	$ourCurrentPage = get_query_var('paged');
				        $args = array(
				        	'order'			 	=> 'DESC',
				            'post_type' 		=> 'faqposts',
				            'posts_per_page' => 3, // Вывод кол-ва постов на страницу (меняем)
            				'paged' => $ourCurrentPage,
				            //'category_name' 	=> 'faq', 
				        );  
				        $your_loop = new WP_Query( $args ); 
				        $i_loop = 0;
				        if ( $your_loop->have_posts() ) : while ( $your_loop->have_posts() ) : $your_loop->the_post(); 
				        /*$meta = get_post_meta( $post->ID, '', true );*/ 
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
								</a><!-- <i class="fa fa-angle-right" aria-hidden="true"></i> -->
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
				    	/*echo "hello2 - Здесь будет пагинация!"; echo paginate_links(array(
                'total' => $your_loop->max_num_pages,
            ));*/

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
            	<?php echo do_shortcode('[faqorderform]'); ?>

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

	<!-- 259: Статьи -->
	<?php elseif ( 259 == get_the_ID() ) : ?>
		<!-- Вывод статей (CPT 'article') на странице Статьи -->
		<div class="row">
			<div class="entry-content col-lg-9">
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
				            'posts_per_page' => 2, // Вывод кол-ва постов на страницу (меняем)
            				'paged' => $ourCurrentPage,
				            //'category_name' 	=> 'faq', 
				        );  
				        $your_loop = new WP_Query( $args ); 
				        $i_loop = 0;
				        if ( $your_loop->have_posts() ) : while ( $your_loop->have_posts() ) : $your_loop->the_post(); 
				        /*$meta = get_post_meta( $post->ID, '', true );*/ 
				        $i_loop = $i_loop + 1; 
				    ?>

					<div class="media article-links">

						<?php if ( has_post_thumbnail() ) {
			                the_post_thumbnail();
			            } ?>

						<div class="media-body">
							<h4><a href="'. get_permalink() .'"><?php the_title() ?></a></h4>
							<p>

								<?php $content = get_the_content();
									$trimmed_content = wp_trim_words( $content, 18, '<a href="'. get_permalink() .'"> далее></a>' );
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
            	<?php echo do_shortcode('[faqorderform]'); ?>

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

	<!-- 282: Отзывы -->
	<?php elseif ( 282 == get_the_ID() ) : ?>
		<!-- Вывод комментариев (CPT reviews) на странице Отзывы -->
		<div class="row">
			<div class="entry-content col-lg-9">
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
				            'posts_per_page' => 3, // Вывод кол-ва постов на страницу (меняем)
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


					        <!-- <a class="btn btn-danger" href="#" role="button">Заказать</a> -->
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
	            	<?php echo do_shortcode('[revorderform]'); ?>
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

			<div class="col-lg-3 sb-secondry">
		        <?php get_sidebar( 'right-plus' ); ?>
		    </div>
	    </div><!-- .row -->  

	<!-- 328: Города -->
	<?php elseif ( 328 == get_the_ID() ) : ?>

		<div class="row">
			<div class="entry-content col-lg-9">
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
				<h1><?php the_title() ?></h1>		

				<?php the_content(); ?>

			    <div class="cities-links">	    
			     
				    <?php $cities_args = array(
				    	'order'			 => 'ASC',
				        //'post_parent'	 => $extra_studyid,
				        //'orderby'		 => 'parent',		    	
				        'post_type' => 'cities',
				        'posts_per_page' => -1,
				        //'category_name' => 'education-all'
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
					<?php echo do_shortcode('[orderform]'); ?>
				</div>

				<?php wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
						'after'  => '</div>',
					) );
				?>

			</div><!-- .entry-content -->

			<div class="col-lg-3 sb-secondry">
		        <?php get_sidebar( 'right' ); ?>
		    </div>
	    </div><!-- .row -->  

	<!-- 357: Контакты -->
	<?php elseif ( 357 == get_the_ID() ) : ?>
		<?php global $mytheme; ?>

		<div class="row">
			<div class="entry-content col-lg-9">
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
				<h1><?php the_title() ?></h1>		

				<?php the_content(); ?>

				<?php echo do_shortcode('[kontaktorderform]'); ?>

				<p>Вы можете написать нам на адрес электронной почты <span class="addr-email"><a href="mailto:bestdiplomy@gmail.com"><?php echo $mytheme['email']; ?></a></span></p>

				<p>Также звоните нам по телефонному номеру <span class="tel-num"><a href="tel:+79266318176"> <?php echo $mytheme['phone']; ?>.</a></span></p>

				<?php wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
						'after'  => '</div>',
					) );
				?>

			</div><!-- .entry-content -->

			<div class="col-lg-3 sb-secondry">
		        <?php get_sidebar( 'right' ); ?>
		    </div>
	    </div><!-- .row -->  	 

	<!-- 485: Заказать диплом -->
	<?php elseif ( 485 == get_the_ID() ) : ?>
		<?php global $mytheme; ?>

		<div class="row">
			<div class="entry-content col-lg-12 pl-3">
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
				<h1><?php the_title() ?></h1>		

				<?php the_content(); ?>

				<?php echo do_shortcode('[orderdiplform]'); ?>

				<?php wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
						'after'  => '</div>',
					) );
				?>

			</div><!-- .entry-content -->
	    </div><!-- .row -->

	<!-- 487: Контакты -->
	<?php elseif ( 487 == get_the_ID() ) : ?>
		<?php global $mytheme; ?>

		<div class="row">
			<div class="entry-content col-lg-9">
				<?php if ( function_exists( 'dimox_breadcrumbs' ) ) dimox_breadcrumbs(); ?>
				<h1><?php the_title() ?></h1>		

				<?php the_content(); ?>

				<?php echo do_shortcode('[kontaktorderform]'); ?>

				<p>Вы можете написать нам на адрес электронной почты <span class="addr-email"><a href="mailto:bestdiplomy@gmail.com"><?php echo $mytheme['email']; ?></a></span></p>

				<p>Также звоните нам по телефонному номеру <span class="tel-num"><a href="tel:+79266318176"> <?php echo $mytheme['phone']; ?>.</a></span></p>

				<?php wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bestdiploms' ),
						'after'  => '</div>',
					) );
				?>

			</div><!-- .entry-content -->

			<div class="col-lg-3 sb-secondry">
		        <?php get_sidebar( 'right' ); ?>
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
