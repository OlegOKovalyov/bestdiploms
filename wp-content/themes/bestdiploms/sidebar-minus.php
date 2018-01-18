<?php
/**
 * The sidebar containing the main widget area minus articles-links
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
</aside><!-- #sidebar-primary -->
