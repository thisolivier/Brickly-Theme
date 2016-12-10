<?php

class PostFields {

  public function addActions(){
    /* Fire our meta box setup function on the post editor screen. */
    /* To modify see https://www.smashingmagazine.com/2011/10/create-custom-post-meta-boxes-wordpress/ */
    add_action ('load-post.php', array($this, 'awesome_meta_boxes_setup'));
    add_action ('load-post-new.php', array($this, 'awesome_meta_boxes_setup'));
  }

  // Hook into the post's meta box action
  public function awesome_meta_boxes_setup () {
    add_action ('add_meta_boxes', array($this, 'awesome_meta_boxes'));
  }

  // Make my meta box
  public function awesome_meta_boxes () {
    add_meta_box (
        'post-content',
        'Content',    // Title
        array($this, 'awesome_content_callback'),   // Callback function
        'post',         // Admin page (or post type)
        'normal',         // Context
        'high'         // Priority
    );
    add_meta_box (
        'extra-links',
        'Links',    // Title
        array($this, 'awesome_links_callback'),   // Callback function
        'post',         // Admin page (or post type)
        'side',         // Context
        'high'         // Priority
    );
  }

  public function awesome_content_callback ($object, $box) {
    wp_nonce_field (basename( __FILE__ ), 'smashing_post_class_nonce');
    ?><p>
      <label for="smashing-post-class">Content</label>
      <br>
      <input type="text" name="smashing-post-class" id="smashing-post-class" value="<?php echo esc_attr( get_post_meta( $object->ID, 'smashing_post_class', true ) ); ?>" size="100%" />
    </p><?php
  }

  public function awesome_links_callback ($object, $box) {
    wp_nonce_field (basename( __FILE__ ), 'smashing_post_class_nonce');
    ?><p>
      <label for="smashing-post-class">Link</label>
      <br>
      <input type="text" name="smashing-post-class" id="smashing-post-class" value="<?php echo esc_attr( get_post_meta( $object->ID, 'smashing_post_class', true ) ); ?>" size="100%" />
    </p><?php
  }
}

$awesomeContent = new PostFields();
$awesomeContent->addActions();
