<?php
/**
 * The main template file
 */
 ?>
 <!DOCTYPE html>

 <html <?php language_attributes(); ?> class="no-js">
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width">
        <link rel="profile" href="http://gmpg.org/xfn/11">
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
        <title>Celestial</title>
        <?php wp_head(); ?>
    </head>
    <body>
        <div id="page">
            <?php wp_footer(); ?>
        </div>
    </body>
</html>