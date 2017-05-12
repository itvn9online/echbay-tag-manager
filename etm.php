<?php
/**
 * Plugin Name: EchBay Tag Manager
 * Description: Control tags manager same same google tag manager. Easily add and manage custom meta tags to various parts of your site or on individual posts, pages, URL...
 * Plugin URI: https://github.com/itvn9online/echbay-tag-manager
 * Author: Dao Quoc Dai
 * Author URI: https://www.facebook.com/ech.bay/
 * Version: 1.0.0
 * Text Domain: echbayetm
 * Domain Path: /languages/
 * License: GPLv2 or later
 */

// Exit if accessed directly
if (! defined ( 'ABSPATH' )) {
	exit ();
}

define ( 'ETM_DF_VERSION', '1.0.0' );
// echo ETM_DF_VERSION . "\n";

define ( 'ETM_DF_DIR', dirname ( __FILE__ ) . '/' );
// echo ETM_DF_DIR . "\n";

//
require_once ETM_DF_DIR . 'class.php';

//
$ETM_func = new ETM_Actions_Module ();

// load custom value in database
$ETM_func->load ();

// check and call function for admin
if (is_admin ()) {
	add_action ( 'admin_menu', 'ETM_add_menu_setting_to_admin_menu' );
}
// or guest (public in theme)
else {
	add_action ( 'wp_head', 'ETM_add_echbay_tags_manager_to_site_header' );
//	add_action ( 'wp_footer', 'ETM_add_echbay_tags_manager_to_site_footer' );
}




