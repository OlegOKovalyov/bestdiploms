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

	<?php global $mytheme; ?>

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
								<p class="card-img-bg">01</p>
								<!-- <img class="card-img-top" src="<?php //echo get_template_directory_uri() ?>/images/popup01.png" alt="Card image cap"> -->
								<div class="card-body">
									<p class="card-text1">Никакой хорошо отпечатанной типографии. Только настоящие оригиналы ГОЗНАК.</p>
								</div>
							</div>
							<div class="card">
								<p class="card-img-bg">02</p>
								<!-- <img class="card-img-top" src="<?php //echo get_template_directory_uri() ?>/images/popup02.png" alt="Card image cap"> -->
								<div class="card-body">
									<p class="card-text2">Никакой хорошо отпечатанной типографии. Только настоящие оригиналы ГОЗНАК.</p>
								</div>
							</div>						
							<div class="card">
								<p class="card-img-bg">03</p>
								<!-- <img class="card-img-top" src="<?php echo get_template_directory_uri() ?>/images/popup03.png" alt="Card image cap"> -->
								<div class="card-body">
									<p class="card-text3">Никакой хорошо отпечатанной типографии. Только настоящие оригиналы ГОЗНАК.</p>
								</div>
							</div>
							<div class="card">
								<p class="card-img-bg">04</p>
								<!-- <img class="card-img-top" src="<?php echo get_template_directory_uri() ?>/images/popup04.png" alt="Card image cap"> -->
								<div class="card-body">
									<p class="card-text4">Никакой хорошо отпечатанной типографии. Только настоящие оригиналы ГОЗНАК.</p>
								</div>
							</div>
							<div class="card">
								<p class="card-img-bg">05</p>
								<!-- <img class="card-img-top" src="<?php echo get_template_directory_uri() ?>/images/popup05.png" alt="Card image cap"> -->
								<div class="card-body">
									<p class="card-text5">Никакой хорошо отпечатанной типографии. Только настоящие оригиналы ГОЗНАК.</p>
								</div>
							</div>
							<div class="card">
								<p class="card-img-bg">06</p>
								<!-- <img class="card-img-top" src="<?php echo get_template_directory_uri() ?>/images/popup06.png" alt="Card image cap"> -->
								<div class="card-body">
									<p class="card-text6">Никакой хорошо отпечатанной типографии. Только настоящие оригиналы ГОЗНАК.</p>
								</div>
							</div>
							<div class="card">
								<p class="card-img-bg">07</p>
								<!-- <img class="card-img-top" src="<?php echo get_template_directory_uri() ?>/images/popup07.png" alt="Card image cap"> -->
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

		<?php echo do_shortcode('[contact-form-7 id="499" title="Напишите, какой документ вас интересует"]'); ?>

		<div class="footer-widget-row row">
			<?php studies_in_sidebars() ?>
			<?php dynamic_sidebar( 'footer-5' ); ?>
		</div><!-- .row -->

		<!-- <div class="footer-widget-row row justify-content-between"> -->
			<!-- <div class="footer-widget-row d-flex"> -->
				<!-- <div id="footer-widget-1" class="widget-area col-md-auto"> -->
						<?php /*dynamic_sidebar( 'footer-1' );*/ ?>
				<!-- </div> --><!-- #footer-widget-1 -->
				<!-- <div id="footer-widget-2" class="widget-area col-md-auto"> -->
						<?php /*dynamic_sidebar( 'footer-2' );*/ ?>
				<!-- </div> --><!-- #footer-widget-1 -->
				<!-- <div id="footer-widget-2" class="widget-area col-md-auto"> -->
						<?php /*dynamic_sidebar( 'footer-3' );*/ ?>
				<!-- </div> --><!-- #footer-widget-1 -->
				<!-- <div id="footer-widget-2" class="widget-area col-md-auto"> -->
						<?php /*dynamic_sidebar( 'footer-4' );*/ ?>
				<!-- </div> --><!-- #footer-widget-1 -->
				<!-- <div id="footer-widget-2" class="widget-area col-md-auto"> -->
						<?php /*dynamic_sidebar( 'footer-5' );*/ ?>
				<!-- </div> --><!-- #footer-widget-1 -->									
			<!-- </div> -->
		<!-- </div> --><!-- .row -->
		<div class="details-body-row row">
			<div class="col-sm-10 col-xs-12">
				<div class="row">
				<div class="details-body-footer d-flex justify-content-start">

					<?php /*echo do_shortcode('[details tel="+7-926-631-81-76" email="bestdiplomy@gmail.com"][/details]');*/ ?>
					<?php //echo do_shortcode('[details]'); ?>
					<p class="details-tel m-0 pt-1"><a href="tel:<?php echo $mytheme['phone']; ?>"><i class="fa fa-phone" aria-hidden="true"></i><?php echo $mytheme['phone']; ?></a></p>
					<p class="details-mail m-0 pt-1"><a href="mailto:<?php echo $mytheme['email']; ?>"><i class="fa fa-envelope" aria-hidden="true"></i><?php echo $mytheme['email']; ?></a></p>
					<p class="details-que m-0 pt-1"><a href="#contact_form_pop1" data-fancybox class="fancybox"><i class="fa fa-pencil" aria-hidden="true"></i>
				Задать вопрос онлайн</a></p>

				</div><!-- .details-body -->
				<p class="smallp">За каждым клиентом закрепляется личный менеджер нашей компании, который обеспечивает надлежащее и комфортное сопровождение всей сделки от момента поступления заявки до момента получения документа на руки и оплаты за него.</p>
				<p class="makeorgblnk">Изготовление документов только на оригинальных бланках ГОЗНАК</p>
			</div></div>
			<div class="site-branding-footer col-2"><a href="<?php echo home_url() ?>">
				<img src="<?php echo get_template_directory_uri() ?>/images/logosm.png" alt="Small footer logo"></a>
			</div>
		</div>

	</div><!-- .footer-content container -->
</div><!-- #footer .row -->
<footer id="colophon" class="site-footer row">
	<div class="site-info col d-flex justify-content-center container">
		<!-- <span>&copy; 2006-2018 Любое использование материалов сайта допустимо только с письменного разрешения авторов.</span> -->
		<small>&copy; 2006-<?php echo date('Y') ?> Любое использование материалов сайта допустимо только с письменного разрешения авторов.</small>
		<!-- <a href="<?php //echo esc_url( __( 'https://wordpress.org/', 'bestdiploms' ) ); ?>"><?php
			/* translators: %s: CMS name, i.e. WordPress. */
			//printf( esc_html__( 'Proudly powered by %s', 'bestdiploms' ), 'WordPress' );
		?></a> -->
		<!-- <span class="sep"> | </span> -->
		<?php
			/* translators: 1: Theme name, 2: Theme author. */
			//printf( esc_html__( 'Theme: %1$s by %2$s.', 'bestdiploms' ), 'bestdiploms', '<a href="https://github.com/OlegOKovalyov/">Oleg Kovalyov</a>' );
		?>
	</div><!-- .site-info -->
</footer><!-- #colophon -->	

<div style="display:none" class="fancybox-hidden">
    <div id="contact_form_pop1"> 
        <?php echo do_shortcode('[contact-form-7 id="500" title="Задать вопрос"]'); ?>
    </div>
</div>

<?php wp_footer(); ?>

<!-- <script src="<?php /*echo get_template_directory_uri()*/ ?>/bower_components/owl.carousel/dist/owl.carousel.min.js"></script> -->
<!-- <script src="<?php /*bloginfo('template_directory');*/ ?>/owlcarousel/dist/owl.carousel.min.js"></script> -->
<!-- <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script> -->
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script> -->
<!-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script> -->

</body>
</html>
