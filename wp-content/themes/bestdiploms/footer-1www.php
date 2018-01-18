<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Best_Diploms
 */

?>

	</div><!-- #content -->

	<?php if ( 126 != get_the_ID() ) : ?>

		<div class="blank-top-row row">
			<div class="blank-top-row-content col-lg-12"></div>
		</div>			

		<div id="page-bottom" class="why-just-us row">
			<!-- <div class="row"> -->
				<div class="why-just-us-content col-lg-12">
					<div class="h4_div"><!--Почему именно мы--></div>
					<div class="why-just-us-advantages">
						<div class="card-deck">

							<div class="card">
								<img class="card-img-top" src="<?php echo get_template_directory_uri() ?>/images/popup01.png" alt="Card image cap">
								<div class="card-body">
									<p class="card-text1">Никакой хорошо отпечатанной типографии. Только настоящие оригиналы ГОЗНАК.</p>
								</div>
							</div>
							<div class="card">
								<img class="card-img-top" src="<?php echo get_template_directory_uri() ?>/images/popup02.png" alt="Card image cap">
								<div class="card-body">
									<p class="card-text2">Никакой хорошо отпечатанной типографии. Только настоящие оригиналы ГОЗНАК.</p>
								</div>
							</div>						
							<div class="card">
								<img class="card-img-top" src="<?php echo get_template_directory_uri() ?>/images/popup03.png" alt="Card image cap">
								<div class="card-body">
									<p class="card-text3">Никакой хорошо отпечатанной типографии. Только настоящие оригиналы ГОЗНАК.</p>
								</div>
							</div>
							<div class="card">
								<img class="card-img-top" src="<?php echo get_template_directory_uri() ?>/images/popup04.png" alt="Card image cap">
								<div class="card-body">
									<p class="card-text4">Никакой хорошо отпечатанной типографии. Только настоящие оригиналы ГОЗНАК.</p>
								</div>
							</div>
							<div class="card">
								<img class="card-img-top" src="<?php echo get_template_directory_uri() ?>/images/popup05.png" alt="Card image cap">
								<div class="card-body">
									<p class="card-text5">Никакой хорошо отпечатанной типографии. Только настоящие оригиналы ГОЗНАК.</p>
								</div>
							</div>
							<div class="card">
								<img class="card-img-top" src="<?php echo get_template_directory_uri() ?>/images/popup06.png" alt="Card image cap">
								<div class="card-body">
									<p class="card-text6">Никакой хорошо отпечатанной типографии. Только настоящие оригиналы ГОЗНАК.</p>
								</div>
							</div>
							<div class="card">
								<img class="card-img-top" src="<?php echo get_template_directory_uri() ?>/images/popup07.png" alt="Card image cap">
								<div class="card-body">
									<p class="card-text7">Никакой хорошо отпечатанной типографии. Только настоящие оригиналы ГОЗНАК.</p>
								</div>
							</div>

						</div>
					</div><!-- .why-just-us-advantages -->
				</div><!-- .why-just-us-content -->
			<!-- </div> --><!-- .row -->
		</div><!-- #page-bottom -->.

	<?php else : ?>

		<div id="page-bottom" class="blank-row row">
			<div class="blank-row-content col-lg-12"></div>
		</div>		

	<?php endif; ?>

</div><!-- #page -->

<div id="footer" class="row">
	<div class="footer-content container">
		<div class="row flex-column">
			<h4>Напишите, какой документ вас интересует</h4>
			<p>и мы свяжемся с вами в ближайшее время</p>

			<div class="form-bar d-flex justify-content-between">
				<input type="text" class="form-control" placeholder="Ваше имя">
				<input type="text" class="form-control" placeholder="Телефон или e-mail">
				<select id="inputStateFooter" class="form-control">
					<option selected>Тип документа</option>
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
				</select>
				<!-- <button type="submit" class="btn btn-danger">Заказать</button> -->
				<a class="btn btn-danger" href="#" role="button"><i class="fa fa-angle-right" aria-hidden="true"></i>
 Заказать <i class="fa fa-angle-left" aria-hidden="true"></i></a>
			</div><!-- .form-bar -->
		</div><!-- .row -->

		<div class="footer-widget-row row justify-content-between">
			<!-- <div class="footer-widget-row d-flex"> -->
				<!-- <div id="footer-widget-1" class="widget-area col-md-auto"> -->
						<?php dynamic_sidebar( 'footer-1' ); ?>
				<!-- </div> --><!-- #footer-widget-1 -->
				<!-- <div id="footer-widget-2" class="widget-area col-md-auto"> -->
						<?php dynamic_sidebar( 'footer-2' ); ?>
				<!-- </div> --><!-- #footer-widget-1 -->
				<!-- <div id="footer-widget-2" class="widget-area col-md-auto"> -->
						<?php dynamic_sidebar( 'footer-3' ); ?>
				<!-- </div> --><!-- #footer-widget-1 -->
				<!-- <div id="footer-widget-2" class="widget-area col-md-auto"> -->
						<?php dynamic_sidebar( 'footer-4' ); ?>
				<!-- </div> --><!-- #footer-widget-1 -->
				<!-- <div id="footer-widget-2" class="widget-area col-md-auto"> -->
						<?php dynamic_sidebar( 'footer-5' ); ?>
				<!-- </div> --><!-- #footer-widget-1 -->									
			<!-- </div> -->
		</div><!-- .row -->
		<div class="details-body-row row">
			<div class="col-10">
				<div class="row">
				<div class="details-body-footer d-flex justify-content-start">
					<?php /*echo do_shortcode('[details tel="+7-926-631-81-76" email="bestdiplomy@gmail.com"][/details]');*/ ?>
					<?php echo do_shortcode('[details]'); ?>
					<!-- <p class="details-tel m-0 pt-1"><a href="tel:+79266318176"><i class="fa fa-phone" aria-hidden="true"></i>+7 926 631-81-76</a></p>
					<p class="details-mail m-0 pt-1"><a href="mailto:bestdiplomy@gmail.com"><i class="fa fa-envelope" aria-hidden="true"></i>bestdiplomy@gmail.com</a></p> -->
					<p class="details-que m-0 pt-1"><a href="#"><i class="fa fa-pencil" aria-hidden="true"></i>
				Задать вопрос онлайн</a></p>
				</div><!-- .details-body -->
				<p class="smallp">За каждым клиентом закрепляется личный менеджер нашей компании, который обеспечивает надлежащее и комфортное сопровождение всей сделки от момента поступления заявки до момента получения документа на руки и оплаты за него.</p>
				<p>Изготовление документов только на оригинальных бланках ГОЗНАК</p>
			</div></div>
			<div class="site-branding-footer col-2">
				<img src="<?php echo get_template_directory_uri() ?>/images/logosm.png" alt="Small footer logo">
			</div>
		</div>

	</div><!-- .footer-content container -->
</div><!-- #footer .row -->
<footer id="colophon" class="site-footer row">
	<div class="site-info row d-flex justify-content-center container">
		<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'bestdiploms' ) ); ?>"><?php
			/* translators: %s: CMS name, i.e. WordPress. */
			printf( esc_html__( 'Proudly powered by %s', 'bestdiploms' ), 'WordPress' );
		?></a>
		<span class="sep"> | </span>
		<?php
			/* translators: 1: Theme name, 2: Theme author. */
			printf( esc_html__( 'Theme: %1$s by %2$s.', 'bestdiploms' ), 'bestdiploms', '<a href="https://github.com/OlegOKovalyov/">Oleg Kovalyov</a>' );
		?>
	</div><!-- .site-info -->
</footer><!-- #colophon -->	

<?php wp_footer(); ?>

<!-- <script src="<?php /*echo get_template_directory_uri()*/ ?>/bower_components/owl.carousel/dist/owl.carousel.min.js"></script> -->
<!-- <script src="<?php /*bloginfo('template_directory');*/ ?>/owlcarousel/dist/owl.carousel.min.js"></script> -->
</body>
</html>
