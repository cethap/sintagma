<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package WordPress
 * @subpackage Fruitful theme
 * @since Fruitful theme 1.0
 */

?>

  <?php if ( has_post_thumbnail() ) : ?>

	  <?php $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full' ); ?>

  <?php endif; ?>

<style type="text/css" media="screen">
	html, body, .container{
		height: 100% !important;
	}
	body {
		background-image: url("<?php echo $large_image_url[0]; ?>");
		background-size: cover;
		background-attachment: fixed;
	}
</style>


<script>
  $(function(){
  	$("#Sede option").eq(0).val("");
  });
</script>


<div class="container" style="height: auto ! important; margin-bottom: 30px;">
<?php the_content(); ?>

</div>




<div class="clearfix"></div>
