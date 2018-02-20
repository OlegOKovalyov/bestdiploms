<?php
/**
 * The right sidebar containing gallery widget area - not used.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Best_Diploms
 */

if ( ! is_active_sidebar( 'right-sidebar' ) ) {
	return;
}
?>

<aside id="sidebar-secondary" class="widget-area">
	<?php dynamic_sidebar( 'right-sidebar' ); ?>
</aside><!-- #sidebar-secondary -->

