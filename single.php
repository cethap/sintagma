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


?>
	
<div class="PageContent">


  <?php while ( have_posts() ) : the_post(); ?>
	<?php get_template_part( 'content', 'single' ); ?>
  <?php endwhile; // end of the loop. ?>

	
<?php get_footer(); ?>