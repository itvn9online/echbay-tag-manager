<?php
/**
 * Plugin Name: EchBay Tag Manager
 * Description: Control tags manager same same google tag manager. Easily add and manage custom meta tags to various parts of your site or on individual posts, pages, URL...
 * Plugin URI: https://www.facebook.com/webgiare.org/
 * Author: Dao Quoc Dai
 * Author URI: https://www.facebook.com/ech.bay/
 * Version: 1.0.3
 * Text Domain: echbayetm
 * Domain Path: /languages/
 * License: GPLv2 or later
 */

// Exit if accessed directly
if ( ! defined ( 'ABSPATH' ) ) {
	exit ();
}

define ( 'ETM_DF_VERSION', '1.0.2' );
// echo ETM_DF_VERSION . "\n";

define ( 'ETM_DF_DIR', dirname ( __FILE__ ) . '/' );
// echo ETM_DF_DIR . "\n";

define ( 'ETM_THIS_PLUGIN_NAME', 'EchBay Tag Manager' );
// echo ETM_THIS_PLUGIN_NAME . "\n";




// global echbay plugins menu name
// check if not exist -> add new
if ( ! defined ( 'EBP_GLOBAL_PLUGINS_SLUG_NAME' ) ) {
	define ( 'EBP_GLOBAL_PLUGINS_SLUG_NAME', 'echbay-plugins-menu' );
	define ( 'EBP_GLOBAL_PLUGINS_MENU_NAME', 'Webgiare Plugins' );
	
	define ( 'ETM_ADD_TO_SUB_MENU', false );
}
// exist -> add sub-menu
else {
	define ( 'ETM_ADD_TO_SUB_MENU', true );
}









/*
* class.php
*/
// check class exist
if (! class_exists ( 'ETM_Actions_Module' )) {
	
	// my class
	class ETM_Actions_Module {
		
		/*
		* config
		*/
		var $eb_plugin_data = '[]';
		
		var $eb_plugin_media_version = ETM_DF_VERSION;
		
		var $eb_plugin_prefix_option = '_etm_header_body_tags';
		
		var $eb_plugin_root_dir = '';
		
		var $eb_plugin_url = '';
		
		var $eb_plugin_nonce = '';
		
		var $eb_plugin_en_queue = 'ETM-static-';
		
		
		/*
		* begin
		*/
		function load() {
			
			
			/*
			* Check and set config value
			*/
			// root dir
			$this->eb_plugin_root_dir = basename ( ETM_DF_DIR );
			
			// Get version by time file modife
			$this->eb_plugin_media_version = filemtime( ETM_DF_DIR . 'top.js' );
			
			// URL to this plugin
//			$this->eb_plugin_url = plugins_url () . '/' . ETM_DF_ROOT_DIR . '/';
			$this->eb_plugin_url = plugins_url () . '/' . $this->eb_plugin_root_dir . '/';
			
			// nonce for echbay plugin
//			$this->eb_plugin_nonce = ETM_DF_ROOT_DIR . ETM_DF_VERSION;
			$this->eb_plugin_nonce = $this->eb_plugin_url . ETM_DF_VERSION;
			
			
			/*
			* Load custom value
			*/
			$this->get_op ();
		}
		
		// get options
		function get_op() {
			global $wpdb;
			
			//
			$pref = $this->eb_plugin_prefix_option;
			
			//
			$sql = $wpdb->get_results ( "SELECT option_name, option_value
			FROM
				`" . $wpdb->options . "`
			WHERE
				option_name LIKE '{$pref}%'
			ORDER BY
				option_id DESC
			LIMIT 0, 1", OBJECT );
//			print_r( $sql ); exit();
			
			//
			if ( isset( $sql[0] )
//			&& $sql[0]->option_name == $this->eb_plugin_prefix_option
			&& $sql[0]->option_value != '' ) {
//				$this->eb_plugin_data = esc_textarea( $sql[0]->option_value );
				$this->eb_plugin_data = $sql[0]->option_value;
			}
//			print_r( $this->eb_plugin_data ); exit();
		}
		
		// add checked or selected to input
		function ck($v1, $v2, $e = ' checked') {
			if ($v1 == $v2) {
				return $e;
			}
			return '';
		}
		
		
		
		
		// update custom setting
		function update() {
			if ($_SERVER ['REQUEST_METHOD'] == 'POST' && isset( $_POST['_ebnonce'] )) {
				
				// check nonce
				if( ! wp_verify_nonce( $_POST['_ebnonce'], $this->eb_plugin_nonce ) ) {
					wp_die('404 not found!');
				}

				
				// print_r( $_POST );
				
				
				
				// backup old tags
				$key_bak = $this->eb_plugin_prefix_option . '_' . date( 'ha', time() );
				
				delete_option ( $key_bak );
				
				add_option( $key_bak, $this->eb_plugin_data, '', 'no' );
				
				
				
				// get and update new tags
				$v = $_POST[$this->eb_plugin_prefix_option];
				
				// add prefix key to option key + hour to add
				$key = $this->eb_plugin_prefix_option;
				
				//
				delete_option ( $key );
				
				//
				$v = stripslashes ( stripslashes ( stripslashes ( trim( $v ) ) ) );
				
				//
//				$v = sanitize_text_field( $v );
				
				//
				add_option( $key, $v, '', 'no' );
//				add_option ( $key, $v );
				
				//
				die ( '<script type="text/javascript">
alert("Update done!");
</script>' );
				
			} // end if POST
		}
		
		
		
		
		function admin_script () {
			wp_enqueue_script( $this->eb_plugin_en_queue . 'admin', $this->eb_plugin_url . 'admin.js', array(), $this->eb_plugin_media_version );
		}
		
		// form admin
		function admin() {
			
			// admin -> used real time version
			$this->eb_plugin_media_version = time();
			
			//
			echo '<link rel="stylesheet" href="' . $this->eb_plugin_url . 'admin.css?v=' . $this->eb_plugin_media_version . '" type="text/css" />';
			
//			wp_enqueue_style( $this->eb_plugin_en_queue . 'admin', $this->eb_plugin_url . 'admin.css', array(), $this->eb_plugin_media_version, 'all' );
			
			
			/*
			// get all taxonomy
			$list_taxonomy = get_taxonomies( array(
				'show_ui' => true,
				'_builtin' => false
			), 'objects' );
			print_r( $list_taxonomy );
			
			
			// get all post type
			// names or objects, note names is the default
			$output = 'objects';
			// 'and' or 'or'
			$operator = 'and';
			
			$list_post_type = get_post_types( array(
			   'public'   => true,
//			   '_builtin' => false,
				'_builtin' => true,
//				'publicly_queryable' => true,
//				'show_ui' => true
			), $output, $operator );
			print_r( $list_post_type );
			
//			$list_post_type = post_type_supports();
//			print_r( $list_post_type );
			*/
			
			
			//
			$main = file_get_contents ( ETM_DF_DIR . 'admin.html', 1 );
			
			$main = $this->template ( $main, array (
				'_ebnonce' => wp_create_nonce( $this->eb_plugin_nonce ),
				
				'plugin_name' => EAS_THIS_PLUGIN_NAME,
				'plugin_version' => EAS_DF_VERSION,
				
				'js' => 'var etm_arr_all_tags = ' . $this->eb_plugin_data . ';',
				
//				'custom_setting' => $this->custom_setting,
				
//				'etm_plugin_url' => $this->eb_plugin_url,
//				'etm_plugin_version' => $this->eb_plugin_media_version,
//				'etm_plugins_version' => ETM_DF_VERSION,
			) );
			
			echo $main;
			
			//
//			add_action( 'admin_enqueue_scripts', array( $this, 'admin_script' ) );
//			wp_enqueue_script( $this->eb_plugin_en_queue . 'admin', $this->eb_plugin_url . 'admin.js', array(), $this->eb_plugin_media_version );
			
			echo '<script type="text/javascript" src="' . $this->eb_plugin_url . 'admin.js?v=' . $this->eb_plugin_media_version . '"></script>';
			
		}
		
		
		
		
		function guest_script () {
			
			//
//			wp_register_script( $this->eb_plugin_en_queue . 'top', $this->eb_plugin_url . 'top.js', array(), $this->eb_plugin_media_version, true );
			
//			wp_enqueue_script( $this->eb_plugin_en_queue . 'top' );
			
			wp_enqueue_script( $this->eb_plugin_en_queue . 'top', $this->eb_plugin_url . 'top.js', array(), $this->eb_plugin_media_version, false );
			
		}
		
		// get html for theme
		function guest() {
//			print_r( get_body_class() );
			
			echo '<!-- ' . ETM_THIS_PLUGIN_NAME . ' -->
<script type="text/javascript">
var etm_arr_all_tags = ' . $this->eb_plugin_data . ',
	etm_body_class="' . implode( ' ', get_body_class() ) . '",
	etm_plugins_version = "' . ETM_DF_VERSION . '";
</script>
<script type="text/javascript" src="' . $this->eb_plugin_url . 'top.js?v=' . $this->eb_plugin_media_version . '"></script>
<!-- End ' . ETM_THIS_PLUGIN_NAME . ' -->';
			
			//
//			$this->guest_script();
			
			// add js file to footer
//			$this->footer();
		}
		function footer() {
			/* */
			echo '<!-- ' . ETM_THIS_PLUGIN_NAME . ' (footer) -->
<script type="text/javascript" src="' . $this->eb_plugin_url . 'footer.js?v=' . $this->eb_plugin_media_version . '"></script>
<!-- End ' . ETM_THIS_PLUGIN_NAME . ' (footer) -->';
			
			return true;
			/* */
			
			//
//			wp_register_script( $this->eb_plugin_en_queue . 'footer', $this->eb_plugin_url . 'footer.js', array(), $this->eb_plugin_media_version );
			
//			wp_enqueue_script( $this->eb_plugin_en_queue . 'footer' );
			
			wp_enqueue_script( $this->eb_plugin_en_queue . 'footer', $this->eb_plugin_url . 'footer.js', array(), $this->eb_plugin_media_version, true );
		}
		
		
		
		
		// add value to template file
		function template($temp, $val = array(), $tmp = 'tmp') {
			foreach ( $val as $k => $v ) {
				$temp = str_replace ( '{' . $tmp . '.' . $k . '}', $v, $temp );
			}
			
			return $temp;
		}
	} // end my class
} // end check class exist




/*
 * Show in admin
 */
function ETM_show_setting_form_in_admin() {
	global $ETM_func;
	
	$ETM_func->update ();
	
	$ETM_func->admin ();
}

function ETM_add_menu_setting_to_admin_menu() {
	// only show menu if administrator login
	if ( ! current_user_can('manage_options') )  {
		return false;
	}
	
	// menu name
	$a = ETM_THIS_PLUGIN_NAME;
	
	// add main menu
	if ( ETM_ADD_TO_SUB_MENU == false ) {
		add_menu_page( $a, EBP_GLOBAL_PLUGINS_MENU_NAME, 'manage_options', EBP_GLOBAL_PLUGINS_SLUG_NAME, 'ETM_show_setting_form_in_admin', NULL, 99 );
	}
	
	// add sub-menu
	add_submenu_page( EBP_GLOBAL_PLUGINS_SLUG_NAME, $a, trim( str_replace( 'EchBay', '', $a ) ), 'manage_options', strtolower( str_replace( ' ', '-', $a ) ), 'ETM_show_setting_form_in_admin' );
}




/*
 * Show in theme
 */
function ETM_add_echbay_tags_manager_to_site_header() {
	global $ETM_func;
	
	$ETM_func->guest ();
}

function ETM_add_echbay_tags_manager_to_site_footer() {
	global $ETM_func;
	
	$ETM_func->footer ();
}
// end class.php









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
	add_action ( 'wp_footer', 'ETM_add_echbay_tags_manager_to_site_footer' );
}




