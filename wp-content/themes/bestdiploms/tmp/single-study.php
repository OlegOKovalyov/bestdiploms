// Файл single-study.php:
<div id="primary" class="content-media">
    <main id="main" class="site-main" role="main">
        <?php
            while( have_posts() ) : the_post();
                get_template_part( 'template-parts/content', 'study' );
            endwhile;
        ?>
    </main>
</div>