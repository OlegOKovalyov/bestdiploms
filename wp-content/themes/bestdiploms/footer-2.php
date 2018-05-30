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
								<div class="card-body">
									<p class="card-text1">Никакой хорошо отпечатанной типографии. Только настоящие оригиналы ГОЗНАК.</p>
								</div>
							</div>
							<div class="card">
								<p class="card-img-bg">02</p>
								<div class="card-body">
									<p class="card-text2">Никакой хорошо отпечатанной типографии. Только настоящие оригиналы ГОЗНАК.</p>
								</div>
							</div>						
							<div class="card">
								<p class="card-img-bg">03</p>
								<div class="card-body">
									<p class="card-text3">Никакой хорошо отпечатанной типографии. Только настоящие оригиналы ГОЗНАК.</p>
								</div>
							</div>
							<div class="card">
								<p class="card-img-bg">04</p>
								<div class="card-body">
									<p class="card-text4">Никакой хорошо отпечатанной типографии. Только настоящие оригиналы ГОЗНАК.</p>
								</div>
							</div>
							<div class="card">
								<p class="card-img-bg">05</p>
								<div class="card-body">
									<p class="card-text5">Никакой хорошо отпечатанной типографии. Только настоящие оригиналы ГОЗНАК.</p>
								</div>
							</div>
							<div class="card">
								<p class="card-img-bg">06</p>
								<div class="card-body">
									<p class="card-text6">Никакой хорошо отпечатанной типографии. Только настоящие оригиналы ГОЗНАК.</p>
								</div>
							</div>
							<div class="card">
								<p class="card-img-bg">07</p>
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
		<div class="details-body-row row">
			<div class="col-sm-10 col-xs-12">
				<div class="row">
				<div class="details-body-footer d-flex justify-content-start">
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
		<small>&copy; 2006-<?php echo date('Y') ?> Любое использование материалов сайта допустимо только с письменного разрешения авторов.</small>
	</div><!-- .site-info -->
</footer><!-- #colophon -->	

<div style="display:none" class="fancybox-hidden">
    <div id="contact_form_pop1"> 
        <?php echo do_shortcode('[contact-form-7 id="500" title="Задать вопрос"]'); ?>
    </div>
</div>

<?php wp_footer(); ?>

</body>
</html>
