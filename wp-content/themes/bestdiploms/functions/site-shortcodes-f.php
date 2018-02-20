<?php
// Дополнительные функции (нужно будет перенести в отдельный файл плагина)

/****** Не используется *******
 * Шорткод. Координаты фирмы, представленной на сайте (телефон и e-mail). Использование:
 * - в админке WordPress (или/или):
 * [details]
 * [details tel="+7-926-631-81-76" email="bestdiplomy@gmail.com"][/details]
 * - в шаблоне WordPress (или/или):
 * <?php echo do_shortcode('[details tel="+7-926-631-81-76" email="bestdiplomy@gmail.com"][/details]'); ?>
 * <?php echo do_shortcode('[details]'); ?>
 */
add_shortcode( 'details', 'show_details');
function show_details( $atts, $content, $tag ) {
	$d_tel = empty( $atts['tel'] ) ? '+7-926-631-81-76' : esc_html( $atts['tel'] );
	$d_email = empty( $atts['email'] ) ? 'bestdiplomy@gmail.com' : esc_html( $atts['email'] );	

	ob_start();
	?>

		<p class="details-tel m-0 pt-1"><a href="tel:<?php echo $d_tel; ?>"><i class="fa fa-phone" aria-hidden="true"></i><?php echo $d_tel; ?></a></p>
        <p class="details-mail m-0 pt-1"><a href="mailto:<?php echo $d_email; ?>"><i class="fa fa-envelope" aria-hidden="true"></i><?php echo $d_email; ?></a></p>

	<?php 
	return ob_get_clean();
}


/**
 * Шорткод. Форма обратной связи Заказать диплом (Главная страница и Города). Использование:
 * - в админке WordPress:
 * [orderform]
 * - в файле-шаблоне:
 * <?php echo do_shortcode('[orderform]'); ?>
 */
add_shortcode( 'orderform', 'show_orderform');
function show_orderform( $atts, $content, $tag ) {

	ob_start();
	?>

		<div class="wrap-form-order row flex-column">
			<h4>Заказать диплом</h4>

			<div class="form-oder d-flex flex-column align-self-center">
				<input type="text" class="form-control" placeholder="Ваше имя">
				<input type="text" class="form-control" placeholder="Телефон или e-mail">
				<select id="inputState" class="form-control">
					<option selected>Тип документа</option>
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
				</select>

				<a class="btn btn-danger" href="<?php echo home_url() . '/zakazat-diplom/' ?>" role="button"><i class="fa fa-angle-right" aria-hidden="true"></i>
 Заказать <i class="fa fa-angle-left" aria-hidden="true"></i></a>

			</div><!-- .form-bar -->
		</div><!-- .row -->

	<?php 
	return ob_get_clean();
}


/**
 * Шорткод. Форма обратной связи Задать вопрос (Вопросы и ответы, Статьи). Использование:
 * - в админке WordPress:
 * [faqorderform]
 * <?php echo do_shortcode('[faqorderform]'); ?>
 */
add_shortcode( 'faqorderform', 'show_faqorderform');
function show_faqorderform( $atts, $content, $tag ) {

	ob_start();
	?>

		<div class="wrap-faq-form-order row flex-column">
			<h4>Задать вопрос</h4>

			<div class="form-oder d-flex flex-column align-self-center">
				<input type="text" class="form-control" placeholder="Ваше имя">
				<input type="text" class="form-control" placeholder="Телефон или e-mail">
			    <textarea type="textarea" class="form-control" placeholder="Текст вопроса" id="FormControlTextarea1" rows="3"></textarea>

				<a class="btn btn-danger" href="#" role="button"><i class="fa fa-angle-right" aria-hidden="true"></i>
 Отправить <i class="fa fa-angle-left" aria-hidden="true"></i></a>

			</div><!-- .form-bar -->
		</div><!-- .row -->

	<?php 
	return ob_get_clean();
}

/**
 * Шорткод. Форма обратной связи Написать отзыв (Отзывы страница). Использование:
 * - в админке WordPress:
 * [revorderform]
 * <?php echo do_shortcode('[revorderform]'); ?>
 */
add_shortcode( 'revorderform', 'show_revorderform');
function show_revorderform( $atts, $content, $tag ) {

	ob_start();
	?>

		<div class="wrap-rev-form-order row flex-column">
			<h4>Написать отзыв</h4>

			<div class="form-oder d-flex flex-column align-self-center">
				<input type="text" class="form-control" placeholder="Ваше имя">
				<input type="text" class="form-control" placeholder="Телефон или e-mail">
			    <textarea type="textarea" class="form-control" placeholder="Текст вопроса" id="FormControlTextarea1" rows="3"></textarea>

				<a class="btn btn-danger" href="#" role="button"><i class="fa fa-angle-right" aria-hidden="true"></i>
 Отправить <i class="fa fa-angle-left" aria-hidden="true"></i></a>

			</div><!-- .form-bar -->
		</div><!-- .row -->

	<?php 
	return ob_get_clean();
}

/**
 * Шорткод. Форма обратной связи без названия на странице Контакты. Использование:
 * - в админке WordPress:
 * [kontaktorderform]
 * <?php echo do_shortcode('[kontaktorderform]'); ?>
 */
add_shortcode( 'kontaktorderform', 'show_kontaktorderform');
function show_kontaktorderform( $atts, $content, $tag ) {

	ob_start();
	?>

		<div class="wrap-kntkt-form-order row flex-column">
			<div class="form-oder d-flex flex-column align-self-center">
				<input type="text" class="form-control" placeholder="Ваше имя">
				<input type="text" class="form-control" placeholder="Телефон или e-mail">
			    <textarea type="textarea" class="form-control" placeholder="Текст вопроса" id="FormControlTextarea1" rows="3"></textarea>

				<a class="btn btn-danger" href="#" role="button"><i class="fa fa-angle-right" aria-hidden="true"></i>
 Отправить <i class="fa fa-angle-left" aria-hidden="true"></i></a>

			</div><!-- .form-order -->
		</div><!-- .row -->

	<?php 
	return ob_get_clean();
}

/**
 * Шорткод. Форма обратной связи Заказать диплом на странице Заказать диплом. Использование:
 * - в админке WordPress:
 * [orderdiplform]
 * <?php echo do_shortcode('[orderdiplform]'); ?>
 */
add_shortcode( 'orderdiplform', 'show_orderdiplform');
function show_orderdiplform( $atts, $content, $tag ) {

	ob_start();
	?>

		<!-- <div class="wrap-order-dipl-form row flex-column px-4"> -->
		<div class="wrap-kntkt-form-order row flex-column px-4">
			<div class="form-oder d-flex flex-column">

				<form action="">

					<div class="form-row">
					    <div class="form-group col-md-6">
					        <label for="inputState"></label>
					        <select id="inputState" class="form-control">
						        <option selected>Качество необходимого документа</option>
						        <option>Бланк ГОЗНАК</option>
						        <option>Типографский бланк</option>
					        </select>
					    </div>
					    <div class="form-group col-md-6">
					        <label for="inputState"></label>
							<select id="inputState" class="form-control">
								<option selected>Тип документа</option>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</select>
					    </div>
					</div><!-- .form-row -->

					<div class="form-row">
						<div class="form-group col-md-4">
							<input type="text" class="form-control" placeholder="Фамилия">
						</div>
						<div class="form-group col-md-4">
							<input type="text" class="form-control" placeholder="Имя">
						</div>
						<div class="form-group col-md-4">
							<input type="text" class="form-control" placeholder="Отчество">
						</div>
					</div><!-- .form-row -->  

					<div class="form-row">
						<div class="form-group input-group col-md-3">
							<div class="input-group date">
						        <input type="text" id="datepicker" class="form-control" placeholder="Дата рождения" >
						    </div>
						</div>
						<div class="form-group col-md-3">
							<input type="text" class="form-control" placeholder="Город обучения">
						</div>
						<div class="form-group col-md-6">
							<input type="text" class="form-control" placeholder="ВУЗ">
						</div><!-- .form-group -->
					</div><!-- .form-row -->

					<div class="form-row">
						<div class="form-group col-md-12">
							<input type="text" class="form-control" placeholder="Специальность">		
						</div><!-- .form-group -->
					</div><!-- .form-row -->

					<div class="form-row">
						<div class="form-group col-md-4">
						    <input type="text" class="form-control" placeholder="Форма обучения" >
						</div>
						<div class="form-group col-md-4">
							<input type="text" class="form-control" placeholder="Год поступления">
						</div>
						<div class="form-group col-md-4">
							<input type="text" class="form-control" placeholder="Год окончания">
						</div><!-- .form-group -->
					</div><!-- .form-row -->

					<div class="form-row">
						<div class="form-group col-md-3">
						    <input type="text" class="form-control" placeholder="Дата выдачи" >
						</div>
						<div class="form-group col-md-9">
							<input type="text" class="form-control" placeholder="Документ о предыдущем образованнии">
						</div>
					</div><!-- .form-row -->

					<div class="form-row">
						<div class="form-group col-md-12">
							<textarea type="textarea" class="form-control" placeholder="Ваши комментарии и пожелания"  rows="3"></textarea>
						</div>
					</div><!-- .form-row -->

					<div class="form-row">
						<div class="form-group col-md-6">
						    <input type="text" class="form-control" placeholder="Адрес доставки" >
						</div>
						<div class="form-group col-md-6">
							<input type="text" class="form-control" placeholder="ФИО получателя">
						</div>
					</div><!-- .form-row -->

					<div class="form-row">
						<div class="form-group col-md-6">
						    <input type="text" class="form-control" placeholder="E-mail" >
						</div>
						<div class="form-group col-md-6">
							<input type="text" class="form-control" placeholder="Телефон">
						</div>
					</div><!-- .form-row -->

					<div class="form-row">
						<div class="form-group col-md-12">
						    <a class="btn btn-danger" href="#" role="button"><i class="fa fa-angle-right" aria-hidden="true"></i> Заказать <i class="fa fa-angle-left" aria-hidden="true"></i></a>
						</div>
					</div><!-- .form-row -->	

				</form>

			</div><!-- .form-order -->
		</div><!-- .wrap-order-dipl-form -->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/js/bootstrap-datepicker.min.js" type="text/javascript"></script>
		<script src="<?php bloginfo('template_url'); ?>/bootstrap-datepicker.ru.min.js" charset="UTF-8"></script>	
		<script>
	        /*jQuery('#datepicker').datepicker();*/
	        jQuery('#datepicker').datepicker({
			    format: 'dd/mm/yyyy',
			    startDate: '-3d',
			    startDate: '01/01/1945',
			    language: "ru",
			    changeYear : true,
			    startDate: '01/01/1900',
			    endDate: '01/01/2010',
			    startView: 2,
			    title: 'Выберите декаду',
			    uiLibrary: 'bootstrap4'
			});
	    </script>

	<?php 
	return ob_get_clean();
}



/****** Не используется (рабочий код ) *******
 * Шорткод. Вывод карусели Owl Carousel на главной странице сайта WordPress
 * (Front Page Carousel). На данный момент используется функция fp-carousel();
 * Использование:
 * - в админке WordPress:
 * [fpcarousel]
 * - в шаблоне WordPress:
 * <?php echo do_shortcode('[fpcarousel]'); ?>
 */
add_shortcode( 'fpcarousel', 'show_fpcarousel');
function show_fpcarousel( $atts, $content, $tag ) {
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

/**
 * Шорткод. Произвольный текст внизу страницы Отзывы (или в любом другом месте). Использование:
 * - в админке WordPress (или/или):
 * [customtext]
 * [customtext partext="Сюда можно вставить любой текст"][/customtext]
 * - в шаблоне WordPress (или/или):
 * <?php echo do_shortcode('[customtext partext="Сюда можно вставить любой текст"][/customtext]'); ?>
 * <?php echo do_shortcode('[customtext]'); ?>
 */
add_shortcode( 'customtext', 'show_customtext');
function show_customtext( $atts, $content, $tag ) {
	$p_text = empty( $atts['partext'] ) ? 'Сюда можно вставить любой текст' : esc_html( $atts['partext'] );
	//$d_tel = empty( $atts['tel'] ) ? '+7-926-631-81-76' : esc_html( $atts['tel'] );
	//$d_email = empty( $atts['email'] ) ? 'bestdiplomy@gmail.com' : esc_html( $atts['email'] );	

	ob_start();
	?>

		<p class="customtext-partext m-0 pt-1"><?php echo $p_text; ?></p>
        <!-- <p class="customtext-mail m-0 pt-1"><a href="mailto:<?php /*echo $d_email;*/ ?>"><i class="fa fa-envelope" aria-hidden="true"></i><?php /*echo $d_email;*/ ?></a></p> -->

	<?php 
	return ob_get_clean();
}