<?php
function extractCategoryInfo($category) {
    return array(
        'name' => $category->name,
        'description' => $category->description,
        'count' => $category->count,
        'id' => $category->term_id,
    );
}

function empty_theme_scripts() {
	// Load our main stylesheet.
	wp_enqueue_style( 'react-style', get_stylesheet_directory_uri() . '/dist/style.css');
	wp_enqueue_style( 'empty-theme-style', get_stylesheet_uri() );

    wp_enqueue_script( 'react-app', get_stylesheet_directory_uri() . '/react_app_built/app.js' , array(), '1.0', true );

    $url = trailingslashit( home_url() );
    $path = trailingslashit( parse_url( $url, PHP_URL_PATH ) );
    $authorPost = get_post(98);
    $categories = array_values(get_categories());

    wp_scripts()->add_data( 'react-app', 'data', sprintf( 'var WORDPRESS = %s;', wp_json_encode( array(
        'site' => array(
            'name' => get_bloginfo( 'name', 'display' ),
            'path' => $path,
            'url' => array(
                'api' => esc_url_raw( get_rest_url( null, '/wp/v2' ) ),
                'root' => esc_url_raw( $url ),
            ),
        ),
        'author' => array(
            'title' => $authorPost->post_title,
            'content' => $authorPost->post_content,
            'name' => get_post_meta(98, 'name', true),
            'telephone' => get_post_meta(98, 'telephone', true),
            'email' => get_post_meta(98, 'email', true),

        ),
        'category' => array_map("extractCategoryInfo", $categories)
    ) ) ) );
}
add_action( 'wp_enqueue_scripts', 'empty_theme_scripts' );

function submitForm( $data ) {
    $first_name = sanitize_text_field( trim( $data['first_name'] ) );
    $last_name = sanitize_text_field( trim( $data['last_name'] ) );
    $email = sanitize_email( trim( $data['email'] ) );
    $message = sanitize_text_field( trim( $data['message'] ) );

    $form_post = array(
        'post_title'    => "Enquiry form from {$first_name}",
        'post_content'  => 'Hello this is the wordpress content field',
        'post_status'   => 'publish',
        'post_author'   => 1,
        'post_type' => 'flamingo_inbound'
    );
      
    $id = wp_insert_post( $form_post );
    add_post_meta($id, '_from', "{$first_name} {$last_name}", true);
    add_post_meta($id, '_from_email', $email, true);
    add_post_meta($id, '_subject', $message, false);

    // You should send a response!
  }

add_action( 'rest_api_init', function () {
  register_rest_route( 'brickly/v1', '/enquiry', array(
    'methods' => 'POST',
    'callback' => 'submitForm'
  ) );
} );