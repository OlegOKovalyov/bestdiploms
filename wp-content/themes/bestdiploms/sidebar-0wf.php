<?php
/**
 * The sidebar containing the main widget area
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Best_Diploms
 */

if ( ! is_active_sidebar( 'left-sidebar' ) ) {
	return;
}
?>

<aside id="sidebar-primary" class="widget-area">
	<?php studies_in_sidebars() ?>
	<?php /*study_in_sidebars()*/ ?>	
	<?php /*study1_in_sidebars()*/ ?>
	<?php /*dynamic_sidebar( 'left-sidebar' );*/ ?>
	<?php reviews_in_sidebars(); ?>
	<?php articles_in_sidebars(); ?>
</aside><!-- #sidebar-primary -->
