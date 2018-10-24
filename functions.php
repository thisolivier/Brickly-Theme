<?php
function brickly_scripts() {
	// Load our main stylesheet.
	wp_enqueue_style( 'celestial-style-dist', get_stylesheet_directory_uri() . '/dist/style.css');
	wp_enqueue_style( 'celestial-style', get_stylesheet_uri() );

    wp_enqueue_script( 'react-app', get_stylesheet_directory_uri() . '/react_app_built/app.js' , array(), '1.0', true );

    $url = trailingslashit( home_url() );
    $path = trailingslashit( parse_url( $url, PHP_URL_PATH ) );

    wp_scripts()->add_data( 'react-app', 'data', sprintf( 'var WORDPRESS = %s;', wp_json_encode( array(
        'site_name' => get_bloginfo( 'name', 'display' ),
        'path' => $path,
        'url' => array(
            'api' => esc_url_raw( get_rest_url( null, '/wp/v2' ) ),
            'root' => esc_url_raw( $url ),
        ),
    ) ) ) );
}
add_action( 'wp_enqueue_scripts', 'brickly_scripts' );