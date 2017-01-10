<article <?php post_class(); ?>>
  <header>
    <h2 class="entry-title" title="<?php the_title(); ?>">
      <a class="magicLink" href="<?= get_permalink(); ?>">
        <?php the_title(); ?>
      </a>
    </h2>
    <?php get_template_part('partials/entry-meta'); ?>
  </header><br>
  <?= get_template_part('partials/sidebar'); ?>
  <div class="entry-content">
    <?php the_content(); ?>
  </div>
  <div class="shadow" aria-hidden="true">&nbsp</div>
</article>
