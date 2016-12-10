<?php

class PostFields {
  /* Based on the guide https://www.smashingmagazine.com/2011/10/create-custom-post-meta-boxes-wordpress/ */
  public $awesome_box_list = [];
  public function addActions () {
    /* Fire our meta box setup function on the post editor screen. */
    add_action ('load-post.php', array($this, 'awesome_meta_boxes_setup'));
    add_action ('load-post-new.php', array($this, 'awesome_meta_boxes_setup'));
  }

  public function awesome_meta_boxes_setup () {
    // Hook into the post's meta box action
    add_action ('add_meta_boxes', array($this, 'awesome_meta_boxes'));
    // Hook into the post's save action
    add_action( 'save_post', array($this, 'save_awesome_meta'), 10, 2 );
  }

  // Make my meta boxes
  public function awesome_meta_boxes () {
    wp_nonce_field (basename( __FILE__ ), 'awesome_nonce');
    add_meta_box (
        'post-content',// Key
        'Content',     // Title
        array($this, 'awesome_callback'),   // Callback function
        'post',        // Admin page (or post type)
        'normal',      // Context
        'high',        // Priority
        array('theKey' => 'post-content') // Callback args
    );
    add_meta_box (
        'extra-links', // Key
        'Links',       // Title
        array($this, 'awesome_callback'),   // Callback function
        'post',        // Admin page (or post type)
        'side',        // Context
        'high',        // Priority
        array('theKey' => 'extra-links') // Callback args
    );
  }

  // Fill my meta boxes with stuff
  public function awesome_callback ($object, $box) {
    $the_key = $box['args']['theKey'];
    array_push($this->awesome_box_list, $the_key);
    ?>
    <p>
      <label for="<?php $the_key ?>">Content</label>
      <br>
      <input
        type="text"
        name="<?php $the_key ?>"
        id="<?php $the_key ?>"
        value="<?php echo esc_attr( get_post_meta( $object->ID, $the_key, true ) ); ?>">
    </p>
    <?php
  }

  public function save_awesome_meta( $post_id, $post ) {
    /* Is the nonce set and corrent, are we an apropriate user? */
    $post_type = get_post_type_object( $post->post_type );
    if (
      !isset( $_POST['awesome_nonce'] ) ||
      !wp_verify_nonce( $_POST['awesome_nonce'], basename( __FILE__ ) ) ||
      !current_user_can( $post_type->cap->edit_post, $post_id )
    ) return $post_id;

    foreach ($awesome_box_list as $meta_key) {
      $new_meta_value = ( isset( $_POST[$meta_key] ) ? sanitize_html_class( $_POST[$meta_key] ) : '' );
      $meta_value = get_post_meta( $post_id, $meta_key, true );

      /* If there was no previous value, add it. */
      if ( $new_meta_value && '' == $meta_value )
        add_post_meta( $post_id, $meta_key, $new_meta_value, true );

      /* If the new value does not match the old, update it. */
      elseif ( $new_meta_value && $new_meta_value != $meta_value )
        update_post_meta( $post_id, $meta_key, $new_meta_value );

      /* If the new value is blank, empty the meta. */
      elseif ( '' == $new_meta_value && $meta_value )
        delete_post_meta( $post_id, $meta_key, $meta_value );
    }
  }
}

$awesomeContent = new PostFields();
$awesomeContent->addActions();
