<?php
function celestial_scripts() {
	// Load our main stylesheet.
	wp_enqueue_style( 'celestial-style-dist', get_stylesheet_directory_uri() . '/dist/style.css');
	wp_enqueue_style( 'celestial-style', get_stylesheet_uri() );

    wp_enqueue_script( 'celestial-script', get_stylesheet_directory_uri() . '/react_app_built/app.js' , array(), '1.0', true );

    $url = trailingslashit( home_url() );
    $path = trailingslashit( parse_url( $url, PHP_URL_PATH ) );

    wp_scripts()->add_data( 'celestial-script', 'data', sprintf( 'var CelestialSettings = %s;', wp_json_encode( array(
        'title' => get_bloginfo( 'name', 'display' ),
        'path' => $path,
        'URL' => array(
            'api' => esc_url_raw( get_rest_url( null, '/wp/v2' ) ),
            'root' => esc_url_raw( $url ),
        ),
    ) ) ) );
}
add_action( 'wp_enqueue_scripts', 'celestial_scripts' );