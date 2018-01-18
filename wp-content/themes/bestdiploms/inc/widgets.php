<?php
/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function bestdiploms_widgets_init() {
	// Добавляем виджеты для левого сайдбара	
	register_sidebar( array(
		'name'          => esc_html__( 'Left Sidebar', 'bestdiploms' ),
		'id'            => 'left-sidebar',
		'description'   => esc_html__( 'Add widgets here.', 'bestdiploms' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<p class="widget-title">',
		'after_title'   => '</p>',
	) );

	// Добавляем виджеты для уменьшенного левого сайдбара	
	register_sidebar( array(
		'name'          => esc_html__( 'Left Sidebar Minus', 'bestdiploms' ),
		'id'            => 'left-sidebar-minus',
		'description'   => esc_html__( 'Add widgets here.', 'bestdiploms' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<p class="widget-title">',
		'after_title'   => '</p>',
	) );	

	// Добавляем виджеты для правого сайдбара
	register_sidebar( array(
		'name'          => esc_html__( 'Right Sidebar', 'bestdiploms' ),
		'id'            => 'right-sidebar',
		'description'   => esc_html__( 'Add widgets here.', 'bestdiploms' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<li class="widget-title">',
		'after_title'   => '</li>',
	) );

	// Добавляем виджеты для увеличенного правого сайдбара
	register_sidebar( array(
		'name'          => esc_html__( 'Right Sidebar Plus', 'bestdiploms' ),
		'id'            => 'right-sidebar-plus',
		'description'   => esc_html__( 'Add widgets here.', 'bestdiploms' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<li class="widget-title">',
		'after_title'   => '</li>',
	) );	

	// Добавляем виджеты для футера 1
	register_sidebar( array(
		'name'          => esc_html__( 'Footer-1', 'bestdiploms' ),
		'id'            => 'footer-1',
		'description'   => esc_html__( 'Add widgets here.', 'bestdiploms' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<div class="widget-title">',
		'after_title'   => '</div>',
	) );

	// Добавляем виджеты для футера 2
	register_sidebar( array(
		'name'          => esc_html__( 'Footer-2', 'bestdiploms' ),
		'id'            => 'footer-2',
		'description'   => esc_html__( 'Add widgets here.', 'bestdiploms' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<div class="widget-title">',
		'after_title'   => '</div>',
	) );	

	// Добавляем виджеты для футера 3
	register_sidebar( array(
		'name'          => esc_html__( 'Footer-3', 'bestdiploms' ),
		'id'            => 'footer-3',
		'description'   => esc_html__( 'Add widgets here.', 'bestdiploms' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<div class="widget-title">',
		'after_title'   => '</div>',
	) );	

	// Добавляем виджеты для футера 4
	register_sidebar( array(
		'name'          => esc_html__( 'Footer-4', 'bestdiploms' ),
		'id'            => 'footer-4',
		'description'   => esc_html__( 'Add widgets here.', 'bestdiploms' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<div class="widget-title">',
		'after_title'   => '</div>',
	) );		

	// Добавляем виджеты для футера 5
	register_sidebar( array(
		'name'          => esc_html__( 'Footer-5', 'bestdiploms' ),
		'id'            => 'footer-5',
		'description'   => esc_html__( 'Add widgets here.', 'bestdiploms' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<div class="widget-title">',
		'after_title'   => '</div>',
	) );

}
add_action( 'widgets_init', 'bestdiploms_widgets_init' );


