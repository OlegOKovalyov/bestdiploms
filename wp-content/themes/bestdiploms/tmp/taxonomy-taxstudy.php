// Файл taxonomy-taxstudy.php:
<div id="primary" class="content-media">
    <main id="main" class="site-main" role="main">
        <h1><?php single_term_title(); ?></h1>
        <?php
            $args = array( 'post_type' => 'study' );
            $query = new WP_Query( $args );
            while( $query->have_posts() ) {
                $query->the_post();
                get_template_part( 'template-parts/content', 'taxstudy' );
            } wp_reset_postdata();
        ?>
    </main>
</div>