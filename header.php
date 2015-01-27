<?php
/** 
* The Header for our theme. 
* Displays all of the <head> section and everything up till <div id="main"> 
* @package WordPress 
* @subpackage Fruitful theme 
* @since Fruitful theme 1.0 
**/
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?> >
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<title><?php if ( ! is_front_page() ) { wp_title( '|', true, 'right' ); }else{ bloginfo('name'); } ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo("template_url"); ?>/styles/stylecherry.css">
<!--link rel="stylesheet" type="text/css" media="all" href="<?php //bloginfo("template_url"); ?>/styles/bootstrap.css">
<link rel="stylesheet" type="text/css" media="all" href="<?php //bloginfo("template_url"); ?>/styles/responsive.css"-->
<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo("template_url"); ?>/bootstrap/bootstrap.min.css">
<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo("template_url"); ?>/styles/flexslider.css">
<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo("template_url"); ?>/style.css">
<link rel="stylesheet" id="cherry-plugin-css" href="<?php bloginfo("template_url"); ?>/styles/cherry-plugin.css" type="text/css" media="all">
<link rel="stylesheet" id="theme52174-css" href="<?php bloginfo("template_url"); ?>/main-style.css" type="text/css" media="all">

<?php 
	wp_head(); 
?>

<script type="text/javascript" src="<?php bloginfo("template_url"); ?>/scripts/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<?php bloginfo("template_url"); ?>/scripts/bootstrap.min.js"></script>

<!--[if lt IE 8]>
<div style=' clear: both; text-align:center; position: relative;'>
	<a href="<?php bloginfo("template_url"); ?>/http://www.microsoft.com/windows/internet-explorer/default.aspx?ocid=ie6_countdown_bannercode"><img src="http://storage.ie6countdown.com/assets/100/images/banners/warning_bar_0000_us.jpg" border="0" alt="" /></a>
</div>
<![endif]-->
<!--[if gte IE 9]><!-->
<script src="<?php bloginfo("template_url"); ?>/scripts/jquery.mobile.customized.min.js" type="text/javascript"></script>
<!--<![endif]-->

<?php fruitful_get_favicon(); ?>
<!--[if lt IE 9]><script src="<?php echo get_template_directory_uri(); ?>/scripts/html5.js" type="text/javascript"></script><![endif]-->

</head>
<body <?php 
		$additional_body_classes = '';
		if (class_exists('Woocommerce')) {
			if (is_shop()) { $additional_body_classes .= 'shop-page '; }
		} 
		$theme_options = fruitful_ret_options("fruitful_theme_options");
		if (isset($theme_options['responsive']) && ($theme_options['responsive'] == 'on')) {
			$additional_body_classes .= 'responsive ';
		}
		body_class(trim($additional_body_classes)); 
	  ?>>
	  
		<?php if (is_front_page()) {?>
			<script type="text/javascript"> homePage = true; </script>
		<?php }else{ ?>
			<script type="text/javascript"> homePage = false; </script>
		<?php } ?>


	<header class="motopress-wrapper header">
		<div class="container">
			<div class="row">
				<div class="col-md-12" data-motopress-wrapper-file="wrapper/wrapper-header.php" data-motopress-wrapper-type="header" data-motopress-id="54c1d8935268b">
					<div class="extra_head">

						<div class="extra_head2 isStuck" style="position: fixed; top: 0px;">
							<div class="row">
								<div class="col-md-4" >
									<!-- BEGIN LOGO -->
									<div class="logo pull-left">
										<a href="#" class="logo_h logo_h__img">
											<img src="<?php bloginfo("template_url"); ?>/ima/logo.png" alt="" title="Logo de sintagma">
										</a>
									</div>
									<!-- END LOGO -->        	
								</div>
								<div class="col-md-8">
									<div class="menu_holder">	
									<!-- BEGIN MAIN NAVIGATION -->
									<nav class="nav nav__primary clearfix">

										<?php 
											$themeUri = get_bloginfo("template_url");
											wp_nav_menu( 
												array( 'menu' => 'Menu_Principal', 
												'items_wrap' => '
												<ul class="sf-menu sf-js-enabled" id="elul">
													%3$s									
												 </ul>' ) );
										?>

									</nav><!-- END MAIN NAVIGATION -->                
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</header>


	<?php
		//if (is_front_page()) fruitful_get_slider();
	?>