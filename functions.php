<?php

function getCategories() {
    $wordpressCategories = get_categories();
    $formattedCategories = array();
    foreach ($wordpressCategories as $category) {
        if ($category->slug == 'uncategorized') {
            continue;
        }
        $formattedCategories[$category->slug] = array(
            'name' => $category->name,
            'description' => $category->description,
            'count' => $category->count,
            'id' => $category->term_id,
        );
    };
    return $formattedCategories;
}

function getMenuInfo($menuLocationString) {
    $locations = get_nav_menu_locations();
    if (isset($locations[$menuLocationString])) {
        $menu = get_term($locations[$menuLocationString], 'nav_menu');
        return(
            array_map(function($menuItem){
                return array(
                    'destination' => $menuItem->url,
                    'title' => $menuItem->title
                );
            }, wp_get_nav_menu_items($menu->term_id))
        );
    }
    return array();
}

function getPosts() {
    global $post;
    $args = array(
        'posts_per_page' => 200, 
        'post_type' => 'post',
    );
    $wordpressPosts = get_posts($args);
    $formattedPosts = array();
    foreach ( $wordpressPosts as $post ) : 
        if ( ! empty($post) && is_a($post, 'WP_Post') ) {
            $postId = get_the_ID();
            $postTags = get_the_tags('', '', '');
            $formattedPosts[(string) $postId] = array(
                'title' => $post->post_title,
                'byLine' => get_post_meta($postId, 'intro', true),
                'tags' => $postTags ? array_map(function($tag){ return $tag->name; }, $postTags) : [],
                'categories' => array_values(wp_get_post_categories($postId, array('fields' => 'id=>slug'))),
                'repo' => get_post_meta($postId, 'repo', true),
                'liveSite' => get_post_meta($postId, 'site', true),
                'content' => $post->post_content,
                'image' => wp_get_attachment_link(),
                'date' => $post->post_date
            );
        }
    endforeach;
    return $formattedPosts;
}

function brickly_scriptsAndStyles() {
	wp_enqueue_style( 'react-style', get_stylesheet_directory_uri() . '/react_app_built/style.css');
	wp_enqueue_style( 'wordpress-required-style', get_stylesheet_uri() );
    wp_enqueue_script( 'react-app', get_stylesheet_directory_uri() . '/react_app_built/app.js' , array(), '1.0', true );

    $url = trailingslashit( home_url() );
    $path = trailingslashit( parse_url( $url, PHP_URL_PATH ) );
    $authorPost = get_post(98);

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
        'category' => getCategories(),
        'outlinks' => getMenuInfo('outlinks'),
        'posts' => getPosts(),
    ) ) ) );
}
add_action( 'wp_enqueue_scripts', 'brickly_scriptsAndStyles' );

function handleEnquiryFormSubmission( $data ) {
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
    'callback' => 'handleEnquiryFormSubmission'
  ) );
} );

add_theme_support( 'menus' );

add_action( 'init', function () {
    register_nav_menu('outlinks', 'Links to other sites');
} );

// REMOVE WP EMOJI
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

// REMOVE oEmbed
remove_action( 'wp_head', 'wp_oembed_add_host_js' );
add_filter( 'tiny_mce_plugins', 'disable_embeds_tiny_mce_plugin' );