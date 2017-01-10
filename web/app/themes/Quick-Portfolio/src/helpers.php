<?php

namespace App;

use Roots\Sage\Asset;
use Roots\Sage\Assets\JsonManifest;
use Roots\Sage\Template;

function template($layout = 'base')
{
    return Template::$instances[$layout];
}

function template_part($template, array $context = [], $layout = 'base')
{
    extract($context);
    include template($layout)->partial($template);
}

/**
 * @param $filename
 * @return string
 */
function asset_path($filename)
{
    static $manifest;
    isset($manifest) || $manifest = new JsonManifest(get_template_directory() . '/' . Asset::$dist . '/assets.json');
    return (string) new Asset($filename, $manifest);
}

/**
 * Determine whether to show the sidebar
 * @return bool
 */
function display_sidebar()
{
    static $display;
    isset($display) || $display = apply_filters('sage/display_sidebar', true);
    return $display;
}

/**
 * Page titles
 * @return string
 */
function title()
{
    if (is_home()) {
        if ($home = get_option('page_for_posts', true)) {
            return get_the_title($home);
        }
        return __('Latest Posts', 'sage');
    }
    if (is_archive()) {
        return get_the_archive_title();
    }
    if (is_search()) {
        return sprintf(__('Search Results for %s', 'sage'), get_search_query());
    }
    if (is_404()) {
        return __('Not Found', 'sage');
    }
    return get_the_title();
}

function portfolio_meta()
{
  $format = '<%1$s class="postLink %2$s"><a href="%3$s">%4$s</a></%1$s>';
  $values[0] = '<span class="postIntro entry-summary" role="sectionhead">' . get_post_meta(get_the_ID(), 'intro', true) . '</span>';
  $values[1] = sprintf($format, 'nav', 'viewSite', get_post_meta(get_the_ID(), 'site', true), 'View Site');
  $values[2] = sprintf($format, 'nav', 'repo', get_post_meta(get_the_ID(), 'repo', true), 'Repository');
  foreach($values as $key => $current){
    if ($current){
      echo $current;
    }
  }
}
