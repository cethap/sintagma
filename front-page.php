<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package WordPress
 * @subpackage Fruitful theme
 * @since Fruitful theme 1.0
 */

get_header(); 

$attachments = get_children( array('post_parent' => get_the_id(), 'post_type' => 'attachment', 'post_mime_type' =>'image') );

?>	

<div class="clearfix"></div>

<div id="slider" class="flexslider">
  <ul class="slides">

	<?php 
	  foreach ( $attachments as $attachment_id => $attachment ){ 
	    $image = wp_get_attachment_image_src($attachment_id, 'folio-image');
	?>
	    <li>
	      <img src="<?php echo $image[0]; ?>" alt="">
	    </li>  
	<?php
	  }
	?>
  </ul>
</div>
<div id="carousel" class="flexslider">
  <ul class="slides">

	<?php 
	  foreach ( $attachments as $attachment_id => $attachment ){ 
	    $image = wp_get_attachment_image_src($attachment_id, 'folio-image');
	?>
	    <li>
	      <img src="<?php echo $image[0]; ?>" alt="">
	    </li>  
	<?php
	  }
	?>
  </ul>
</div>

 
<?php get_footer(); ?> 