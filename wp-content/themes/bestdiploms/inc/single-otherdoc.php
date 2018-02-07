<?php

 /**
 * Template Name: Другие документы study otherdoc
 * Template Post Type: study
 * Template part for displaying CPT study content in single-otherdoc.php 
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Best_Diploms
 */

get_header(); ?>

    <div id="primary" class="content-area col-lg-9 order-2">
        <main id="main" class="site-main">

            <?php
            while ( have_posts() ) : the_post(); echo 'single-otherdoc.php';

                get_template_part( 'template-parts/content', 'otherdoc' );

                // If comments are open or we have at least one comment, load up the comment template.
                if ( comments_open() || get_comments_number() ) :
                    comments_template();
                endif;

            endwhile; // End of the loop.
            ?>

        </main><!-- #main -->
    </div><!-- #primary -->

    <div class="col-lg-3 col-sidebar-primary">
        <?php get_sidebar(); echo 'single-otherdoc.php'; ?>
    </div>

<?php get_footer();