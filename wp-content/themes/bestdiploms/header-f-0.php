<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Best_Diploms
 */

?>
<!doctype html>
<html itemscope itemtype="http://schema.org/WebPage" <?php language_attributes(); ?>>
<!-- <html <?php /*language_attributes();*/ ?>> -->
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/css/bootstrap-datepicker.standalone.min.css" /> -->
		
	<?php global $mytheme; ?>

	<?php wp_head(); ?>
</head>

<body <?php body_class('container-fluid'); ?>>
<div id="page" class="site container">
	<header id="masthead" class="site-header row">
        <div class="header-topper col-lg-12">
            <div class="site-branding navbar-brand">
	            <?php
	            the_custom_logo();
	            if ( is_front_page() && is_home() ) : ?>
		            <!--<h1 class="site-title"><a href="<?php /*echo esc_url( home_url( '/' ) );*/ ?>" rel="home"><?php /*bloginfo( 'name' );*/ ?></a></h1>-->
	            <?php else : ?>
		            <!--<p class="site-title"><a href="<?php /*echo esc_url( home_url( '/' ) );*/ ?>" rel="home"><?php /*bloginfo( 'name' );*/ ?></a></p>-->
	            <?php
	            endif;

	            $description = get_bloginfo( 'description', 'display' );
	            if ( $description || is_customize_preview() ) : ?>
		            <p class="site-description"><?php /*echo $description; /* WPCS: xss ok. */ ?></p>
	            <?php
	            endif; ?>
            </div><!-- .site-branding -->
	        <div class="header-top row">
	            <div class="header-top-bar w-100">
	                <div class="details-body d-flex justify-content-end">

	                	<?php /*echo do_shortcode('[details tel="+7-926-631-81-76" email="bestdiplomy@gmail.com"][/detai/*ls]');*/ ?>
	                	<?php /*echo do_shortcode('[details]');*/ ?>
                        <p class="details-tel m-0 pt-1"><a href="tel:<?php echo $mytheme['phone']; ?>"><i class="fa fa-phone" aria-hidden="true"></i><?php echo $mytheme['phone']; ?></a></p>
                        <p class="details-mail m-0 pt-1"><a href="mailto:<?php echo $mytheme['email']; ?>"><i class="fa fa-envelope" aria-hidden="true"></i><?php echo $mytheme['email']; ?></a></p>
                        <p class="details-que m-0 pt-1"><a href="#contact_form_pop1"  data-fancybox class="fancybox"><i class="fa fa-pencil" aria-hidden="true"></i>
Задать вопрос онлайн</a></p>

                    </div><!-- .details-body -->
	                <nav class="navbar navbar-light navbar-expand-lg"> <!-- было:  navbar-dark bg-primary -->
	
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>		
<!-- <div class="collapse navbar-collapse" id="navbarNavAltMarkup"> -->	
	                <?php 
		                /*wp_nav_menu([
			                'menu'				=> 'primary',
			                'theme_location'	=> 'primary',
			                'container'			=> 'div',
			                'container_id'		=> 'navbarNavAltMarkup',
			                'container_class'	=> 'collapse navbar-collapse',
			                'menu_id'			=> '',
			                'menu_class'		=> 'navbar-nav ml-auto',
			                'depth'				=> 2,

		                ]);*/
	                ?>

	                <?php 
		                wp_nav_menu([
		                	'menu'				=> 'primary',
			                'theme_location'	=> 'primary',
			                'container_id'		=> 'navbarNavAltMarkup',
			                'container_class'	=> 'collapse navbar-collapse',
			                //'menu_id'			=> '',
			                'menu_class'		=> 'navbar-nav ml-auto'
		                ]);
	                ?>

<!-- </div> -->
                </nav>
            </div><!-- .header-top-bar -->
        </div><!-- .header-top .row -->		        
	</div><!-- .header-toppper -->


			<?php
			if ( is_front_page() /*&& is_home()*/ ) : ?>		
		        <div class="valid_goznak col-lg-9">
						<div class="site-title"><?php the_title(); ?></div>
			            <img src="<?php echo get_template_directory_uri() ?>/images/strip_big.png" alt="Strip header">
		            <div class="order_button d-flex justify-content-center mt-1 mb-3">
		                <a class="btn btn-danger" href="<?php echo home_url() . '/zakazat-diplom/' ?>" role="button"><i class="fa fa-angle-right" aria-hidden="true"></i>Купить диплом <i class="fa fa-angle-left" aria-hidden="true"></i></a>
		            </div><!-- .order_button -->
		        </div><!-- .valid_goznak .col-lg-9 --> 
			<?php else : ?>
				<!-- <div class="row"> -->
					<div class="col-md-1"></div>
					<div class="valid_goznak-pages col-lg-10 col-sm-8 col-xs-12 ml-3">
						<p class="page-title h1 mt-5 mb-4">Настоящие, подлинные <br /> <span>бланки ГОЗНАК</span></p>
						<!-- <div>Настоящие, подлинные <br /> <span>бланки ГОЗНАК</span></div> -->
						<!--<p class="site-title"><a href="<?php /*echo esc_url( home_url( '/' ) );*/ ?>" rel="home"><?php /*bloginfo( 'name' );*/ ?></a></p>-->
			            <div class="order_button d-lg-flex justify-content-lg-left mt-4">
			                <a class="btn btn-danger" href="<?php echo home_url() . '/zakazat-diplom/' ?>" role="button"><i class="fa fa-angle-right" aria-hidden="true"></i>Купить диплом <i class="fa fa-angle-left" aria-hidden="true"></i></a>
			            </div><!-- .order_button -->					
					</div><!-- .valid_goznak -->
				<!-- </div>.row -->  
			<?php
			endif; ?>                   
		
	</header><!-- #masthead -->

	<div id="content" class="site-content row">
