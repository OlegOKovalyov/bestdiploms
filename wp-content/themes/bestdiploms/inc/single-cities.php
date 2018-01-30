<?php
 /**
  * The template for displaying all CPT cities posts
  *
  * @package Best_Diploms  
  */

get_header(); ?>

    <div id="primary" class="content-area col-lg-9 order-2">
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
        <?php get_sidebar(); echo 'single-cities.php'; ?>
    </div>

<?php get_footer();