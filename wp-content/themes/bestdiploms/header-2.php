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
	<!--<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'bestdiploms' ); ?></a>-->

	<header id="masthead" class="site-header">
		<!--<nav id="menu" class="navbar navbar-expand-md  navbar-dark bg-primary" role="navigation">-->
		
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
			<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
			
			<!--<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#bs4navbar" aria-controls="bs4navbar" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>-->
			
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>		
            
<!--<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">-->
			
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
			
    <!--</div>
  </div>-->
			
		</nav>
		
<!--<div class="container">		
    <a class="navbar-brand" href="#"><?php the_custom_logo(); ?></a>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup2" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup2">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="#">Главная <span class="sr-only">(current)</span></a>
          <a class="nav-item nav-link" href="#">Цены</a>
          <a class="nav-item nav-link" href="#">Оплата и доставка</a>
          <a class="nav-item nav-link" href="#">Вопросы и ответы</a>
          <a class="nav-item nav-link" href="#">Услуги</a>
          <a class="nav-item nav-link" href="#">Отзывы</a>
          <a class="nav-item nav-link" href="#">Города</a>
          <a class="nav-item nav-link" href="#">Контакты</a>-->
          <!--<a class="nav-item nav-link disabled" href="#">Disabled</a>-->
        <!--</div>
      </div>
    </nav>
</div>--><!-- .container -->				
		
	</header><!-- #masthead -->

	<div id="content" class="site-content row">
