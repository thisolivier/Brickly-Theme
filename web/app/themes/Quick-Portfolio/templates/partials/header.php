<header class="sitewide">
  <div id="theCloud">
    <h1 class="brand">
      <a id="cloudLink" href="<?= esc_url(home_url('/')); ?>">
        <?php if( is_home() ) {bloginfo('name');} else {wp_title('');} ?>
      </a>
    </h1>
    <nav class="nav-primary">
      <?php
      if (has_nav_menu('primary_navigation')) :
        wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav']);
      endif;
      ?>
    </nav>
    <div class="backgroundCloud" aria-hidden="true">
      <div class="ball big">&nbsp;</div>
      <div class="ball small">&nbsp;</div>
      <div class="ball medium">&nbsp;</div>
      <!-- <div class="ball small">&nbsp;</div> -->
    </div>
  </div>
</header>
