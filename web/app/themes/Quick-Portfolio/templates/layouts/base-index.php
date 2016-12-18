<!doctype html>
<html <?php language_attributes(); ?>>
  <?php get_template_part('partials/head'); ?>
  <body <?php body_class(); ?>>
    <!--[if IE]>
      <div class="alert alert-warning">
        <?php _e('You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.', 'sage'); ?>
      </div>
    <![endif]-->
    <div class="wrap">
      <div class="content row" id="heightDefined">
        <?php
          do_action('get_header');
          get_template_part('partials/header');
        ?>
        <main class="main invisible" title="Portfolio projects">
          <?php include App\template()->main(); ?>
          <div class="mortar pre_setup transitions" aria-hidden="true">&nbsp</div>
        </main>
      </div>
      <canvas id="backgroundPost" aria-hidden="true"></canvas>
      <div class="backgroundLanscape hidden" aria-hidden="true">
        <img src="<?= get_template_directory_uri(); ?>/dist/images/sky-holding.gif" class="sky">
        <img src="<?= get_template_directory_uri(); ?>/dist/images/city-holding.gif" class="land">
      </div>
    </div>
    <?php
      do_action('get_footer');
      get_template_part('partials/footer');
      wp_footer();
    ?>
  </body>
</html>
