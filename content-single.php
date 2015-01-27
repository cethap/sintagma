<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package WordPress
 * @subpackage Fruitful theme
 * @since Fruitful theme 1.0
 */

?>

<link rel="stylesheet" type="text/css" href="<?php bloginfo("template_url"); ?>/css/zoom_thumb_images/style_common.css" />
<link rel="stylesheet" type="text/css" href="<?php bloginfo("template_url"); ?>/css/zoom_thumb_images/style1.css" />

<div class="col-md-12 divImgCentral">
  <?php if ( has_post_thumbnail() ) : ?>
	<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
	  <?php $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full' ); ?>
	  <img src="<?php echo $large_image_url[0]; ?>" class="imgCentral img-responsive" />
	</a>
  <?php endif; ?>
  
  <!--img src="<?php //bloginfo("template_url"); ?>/img/servicios/png_0011_banner.png" class="imgCentral img-responsive"-->
</div>

<article id="post-<?php the_ID(); ?>" class="col-md-10 divImgCentral" style="float: none; margin: 34px auto;">

	<header class="entry-header">
	  <h1 class="entry-title"><?php the_title(); ?></h1>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php the_content(); ?>
	  <div class="clearfix"></div>
	</div>
</article>