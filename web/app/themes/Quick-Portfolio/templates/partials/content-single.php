<article <?php post_class(); ?>>
  <div class="post-meta">
    <?= \App\portfolio_meta(); ?>
    <p class="byline tags"><?php the_tags( '','','' ); ?> </p>
  </div>
  <div class="entry-content">
    <?php the_content(); ?>
  </div>
</article>
