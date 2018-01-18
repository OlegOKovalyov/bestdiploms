<?php
/**
 * The sidebar containing the main widget area minus menu-lsb-bottom-links
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Best_Diploms
 */

if ( ! is_active_sidebar( 'left-sidebar-minus' ) ) {
	return;
}
?>

<aside id="sidebar-primary" class="widget-area">
	<?php studies_in_sidebars() ?>
	<?php reviews_in_sidebars(); ?>
	<?php /*articles_in_sidebars();*/ ?>	
	<?php /*dynamic_sidebar( 'left-sidebar-minus' );*/ ?>
</aside><!-- #sidebar-primary -->
