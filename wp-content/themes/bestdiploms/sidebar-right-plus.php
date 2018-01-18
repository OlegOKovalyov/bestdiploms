<?php
/**
 * The right sidebar containing gallery widget area plus menu-lsb-bottom-links
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Best_Diploms
 */

if ( ! is_active_sidebar( 'right-sidebar-plus' ) ) {
	return;
}
?>

<aside id="sidebar-secondary" class="widget-area">
	<?php dynamic_sidebar( 'right-sidebar' ); ?>	
	<?php articles_in_sidebars(); ?>
</aside><!-- #sidebar-secondary -->
