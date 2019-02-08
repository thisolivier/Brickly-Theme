<?php
/**
 * The main template file
 */
$url = esc_url_raw( trailingslashit( home_url() ) );
?>
<!DOCTYPE html>

<html <?php language_attributes(); ?> xmlns:fb="http://ogp.me/ns/fb#">
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width">
        <title>Olivier.uk</title>
        <?php wp_head(); ?>
        <meta property="og:type" content="website">
        <meta property="og:description" content="Talented software engineer with recent good references looking for short and medium term contracts. Proficient in building Swift, Python (Flask or Django), Javascript (Node, React), and Wordpress projects." />
        <meta property="og:image" content="https://olivier.uk/app/uploads/2019/02/siteshare.png" />
        <meta property="og:image:width" content="1730" />
        <meta property="og:image:height" content="1730" />
        <meta property="og:url" content="<?php echo($url); ?>">
        <meta property="og:title" content="Olivier's Portfolio">
    </head>
    <body>
        <div id="page">
            <?php wp_footer(); ?>
        </div>
    </body>
</html>