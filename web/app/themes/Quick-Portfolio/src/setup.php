<?php

namespace App;

use Roots\Sage\Template;

/**
 * Theme assets
 */
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('sage/main.css', asset_path('styles/main.css'), false, null);
    wp_enqueue_script('sage/main.js', asset_path('scripts/main.js'), ['jquery'], null, true);
}, 100);

/**
 * Theme setup
 */
add_action('after_setup_theme', function () {
    /**
     * Enable features from Soil when plugin is activated
     * @link https://roots.io/plugins/soil/
     */
    add_theme_support('soil-clean-up');
    add_theme_support('soil-jquery-cdn');
    add_theme_support('soil-nav-walker');
    add_theme_support('soil-nice-search');
    add_theme_support('soil-relative-urls');

    /**
     * Enable plugins to manage the document title
     * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Title_Tag
     */
    add_theme_support('title-tag');

    /**
     * Register navigation menus
     * @link http://codex.wordpress.org/Function_Reference/register_nav_menus
     */
    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', 'sage')
    ]);

    /**
     * Enable post thumbnails
     * @link http://codex.wordpress.org/Post_Thumbnails
     * @link http://codex.wordpress.org/Function_Reference/set_post_thumbnail_size
     * @link http://codex.wordpress.org/Function_Reference/add_image_size
     */
    add_theme_support('post-thumbnails');

    /**
     * Enable post formats
     * @link http://codex.wordpress.org/Post_Formats
     */
    add_theme_support('post-formats', ['aside', 'gallery', 'link', 'image', 'quote', 'video', 'audio']);

    /**
     * Enable HTML5 markup support
     * @link http://codex.wordpress.org/Function_Reference/add_theme_support#HTML5
     */
    add_theme_support('html5', ['caption', 'comment-form', 'comment-list', 'gallery', 'search-form']);

    /**
     * Use main stylesheet for visual editor
     * @see assets/styles/layouts/_tinymce.scss
     */
    add_editor_style(asset_path('styles/main.css'));
});

/**
 * Register sidebars
 */
add_action('widgets_init', function () {
    $config = [
        'before_widget' => '<div class="widget %1$s %2$s" role="region">',
        'before_title'  => '<h3 role="sectionhead">',
        'after_title'   => '</h3><div class="widget-content">',
        'after_widget'  => '</div></div>',
    ];

    register_sidebar([
        'name' => __('Footer Main', 'sage'),
        'id' => 'site-footer',
        'description' => 'Main footer area, will arrange into columns breaking into rows.',
    ] + $config);

    $config['before_widget'] = '<div class="widget column %1$s %2$s">';

    register_sidebar([
        'name' => __('Post Sidebar', 'sage'),
        'id' => 'sidebar-primary',
        'description' => 'Sidebar appears on posts, intended to be used with custom post attributes info, repo, and site.',
    ] + $config);
    register_sidebar([
        'name' => __('Footer Sidebar', 'sage'),
        'id' => 'sidebar-footer',
        'description' => 'Adds to the right of the footer, displays a column on a contrasting background.',
    ] + $config);
});
