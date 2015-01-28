<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package WordPress
 * @subpackage Fruitful theme
 * @since Fruitful theme 1.0
 */

?>

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
