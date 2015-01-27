<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the id=main div and all content after
 *
 * @package WordPress
 * @subpackage Fruitful theme
 * @since Fruitful theme 1.0
 */
/*
 ?>


<?php $theme_options = fruitful_ret_options("fruitful_theme_options");  ?>



Copyright <?php echo date('Y'); ?>
<?php wp_nav_menu( array('menu' => 'Menu_foot_4' )); */ ?>


		<footer class="motopress-wrapper footer">
			<div class="container">
				<div class="">
					<div class="col-md-12">
						<div class="extrafooter">
							<div class="footer-widgets">
								<div class="col-md-3">
									<div id="text-5">
										<h4>Navegación</h4>
										<div class="textwidget">
											<?php wp_nav_menu( array('menu' => 'Menu_Principal' )); ?>
										</div>										
									</div>    	
								</div>
								<div class="col-md-3">
									<div id="text-6">
										<h4>Proyectos</h4>
										<div class="textwidget">
											<?php wp_nav_menu( array('menu' => 'Proyectos' )); ?>
										</div>
									</div>
								</div>
								<div class="col-md-3">
									<div id="tag_cloud-3">
										<h4>Compras</h4>
										<div class="textwidget">
											<?php wp_nav_menu( array('menu' => 'Compras' )); ?>
										</div>
									</div>    	
								</div>
								<div class="col-md-3">
									<div id="text-8">

										<h4>Contactenos</h4>
										<div class="textwidget">
											<div class="footeraddress">
												Freephone:  +1 800 559 6580<br>
												Telephone:  +1 959 603 6035<br>
												FAX: +1 800 559 6580
											</div>
											<div class="mailfooter">
												E-mail: <a href="mailto:mail@demolink.org">mail@demolink.org</a>
											</div>
										</div>
									</div>        	
								</div>
							</div>
						</div>
						<div class="row hide">
							<div class="col-md-12">
								<div data-motopress-type="static" data-motopress-static-file="static/static-footer-text.php">
									<div id="footer-text" class="footer-text">
										<a href="/html Template.html" title="Cooperate with the best" class="site-name">Real Estate</a> © 2015 •
										<a href="http://livedemo00.template-help.com/wordpress_52174/privacy-policy/" title="Privacy Policy">Privacy Policy</a>
										<!-- {%FOOTER_LINK} -->
									</div>    	
								</div>
							</div>
						</div>				
					</div>
				</div>
			</div>
			<div style="clear:both;"></div>
		</footer>


		<script type="text/javascript" src="<?php bloginfo("template_url"); ?>/scripts/jquery.flexslider.min.js"></script>
		<script type="text/javascript" src="<?php bloginfo("template_url"); ?>/scripts/main.js"></script>
		<script type="text/javascript" src="<?php bloginfo("template_url"); ?>/scripts/device.min.js"></script>
		<script type="text/javascript" src="<?php bloginfo("template_url"); ?>/scripts/superfish.js"></script>
		<script type="text/javascript" src="<?php bloginfo("template_url"); ?>/scripts/jquery.mobilemenu.js"></script>
		<script type="text/javascript" src="<?php bloginfo("template_url"); ?>/scripts/cherry-plugin.js"></script>


	</body>
</html>