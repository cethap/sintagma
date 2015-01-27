<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package WordPress
 * @subpackage Fruitful theme
 * @since Fruitful theme 1.0
 */

?>


<?php if (is_front_page()) {?>
	<script type="text/javascript"> homePage = true; </script>
<?php }else{ ?>
	<script type="text/javascript"> homePage = false; </script>
<?php } ?>

<div id="slider" class="flexslider">
  <ul class="slides">
	<?php if ( has_post_thumbnail() ) : ?>
	<li>
	  <?php $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full' ); ?>
	  <img src="<?php echo $large_image_url[0]; ?>" class="imgCentral img-responsive" />
	</li>
	<?php endif; ?>
  </ul>
</div>
<div class="container">

	<article id="post-<?php the_ID(); ?>" class="col-md-12">
		<?php if (!is_front_page()) {?>	
		<header class="entry-header">
		  <h1 class="entry-title"><?php the_title(); ?></h1>
		</header><!-- .entry-header -->
		<?php } ?>
		<div class="entry-content">
			<?php the_content(); ?>
		  <div class="clearfix"></div>
		</div>
	</article>
</div>
