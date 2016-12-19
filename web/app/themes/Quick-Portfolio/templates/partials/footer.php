<footer class="content-info" role="complementary" title="About Olivier, enquiry form, and various links">
  <div class="home">
      <a href="/" title="Home">
        <img src="<?= get_template_directory_uri(); ?>/dist/images/icon-house.png" alt="Home">
      </a>
  </div>
  <div class="footer-container">
    <?php dynamic_sidebar('site-footer'); ?>
    <div class="sidebar-wrapper" role="group" title="Sharing links, other places to visit.">
      <?php dynamic_sidebar('sidebar-footer'); ?>
    </div>
  </div>
</footer>
