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
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="profile" href="http://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class('container-fluid'); ?>>
<div id="page" class="site container">
	<header id="masthead" class="site-header">
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
			<div class="details-body d-flex justify-content-end pr-4">
                <p class="details-tel m-0 pt-1"><a href="tel:+79266318176">+7 926 631-81-76</a></p>
                <p class="details-mail m-0 pt-1"><a href="mailto:bestdiplomy@gmail.com">bestdiplomy@gmail.com</a></p>
                <p class="details-que m-0 pt-1"><a href="#">Задать вопрос онлайн</a></p>
            </div><!-- .details-body -->
			<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
			
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>		
			
			<?php 
				wp_nav_menu([
					'menu'				=> 'primary',
					'theme_location'	=> 'primary',
					'container'			=> 'div',
					'container_id'		=> 'navbarNavAltMarkup',
					'container_class'	=> 'collapse navbar-collapse',
					'menu_id'			=> '',
					'menu_class'		=> 'navbar-nav ml-auto',
					'depth'				=> 2,

				]);
			?>
		
		</nav>
        <div class="col-lg-8 valid_goznak mt-5">
			<?php
			if ( is_front_page() /*&& is_home()*/ ) : ?>
	                <img src="<?php echo get_template_directory_uri() ?>/images/strip_validblanks.png">
			<?php else : ?>
				<!--<p class="site-title"><a href="<?php /*echo esc_url( home_url( '/' ) );*/ ?>" rel="home"><?php /*bloginfo( 'name' );*/ ?></a></p>-->
			<?php
			endif; ?>
            <div class="order_button d-lg-flex justify-content-lg-center my-2">
                <a class="btn btn-danger" href="#" role="button"> > Купить диплом < </a>
            </div><!-- .order_button -->
        </div><!-- .valid_goznak -->                
		
	</header><!-- #masthead -->

	<div id="content" class="site-content row">
