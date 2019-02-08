<?php
/**
 * The main template file
 */
?>
<!DOCTYPE html>

<html <?php language_attributes(); ?> xmlns:fb="http://ogp.me/ns/fb#">
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width">
        <title>Olivier.uk</title>
        <?php wp_head(); ?>
    </head>
    <body>
        <div id="page">
            <?php wp_footer(); ?>
        </div>
    </body>
</html>