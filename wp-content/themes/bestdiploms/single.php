<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Best_Diploms
 *
 * Output CPT Article (Статьи). Template sigle-article.php and single-articles.php are not working.
 */

get_header(); ?>

    <div id="primary" class="content-area col-lg-9  order-lg-2">
        <main id="main" class="site-main">

            <?php
            while ( have_posts() ) : the_post();

                get_template_part( 'template-parts/content', get_post_type() );

                // If comments are open or we have at least one comment, load up the comment template.
                if ( comments_open() || get_comments_number() ) :
                    comments_template();
                endif;

            endwhile; // End of the loop.
            ?>

        </main><!-- #main -->
    </div><!-- #primary -->

    <div class="col-lg-3 col-sidebar-primary">
        <!-- <?php //get_sidebar('minus'); ?> -->
        <?php get_sidebar(); ?>
    </div>

<?php get_footer();
