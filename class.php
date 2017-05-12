<?php

// check class exist
if (! class_exists ( 'ETM_Actions_Module' )) {
	
	// my class
	class ETM_Actions_Module {
		
		/*
		* config
		*/
		var $custom_setting = '[]';
		
		var $media_version = ETM_DF_VERSION;
		
		var $prefix_option = '_etm_header_body_tags';
		
		var $root_dir = '';
		
		var $etm_url = '';
		
		var $ebnonce = '';
		
		var $enqueue = 'ETM-static-';
		
		
		/*
		* begin
		*/
		function load() {
			
			
			/*
			* Check and set config value
			*/
			// root dir
			$this->root_dir = basename ( ETM_DF_DIR );
			
			// Get version by time file modife
			$this->media_version = filemtime( ETM_DF_DIR . 'top.js' );
			
			// URL to this plugin
//			$this->etm_url = plugins_url () . '/' . ETM_DF_ROOT_DIR . '/';
			$this->etm_url = plugins_url () . '/' . $this->root_dir . '/';
			
			// nonce for echbay plugin
//			$this->ebnonce = ETM_DF_ROOT_DIR . ETM_DF_VERSION;
			$this->ebnonce = $this->root_dir . ETM_DF_VERSION;
			
			
			/*
			* Load custom value
			*/
			$this->get_op ();
		}
		
		// get options
		function get_op() {
			global $wpdb;
			
			//
			$sql = $wpdb->get_results ( "SELECT option_name, option_value
			FROM
				`" . $wpdb->options . "`
			WHERE
				option_name = '" . $this->prefix_option . "'", OBJECT );
//			print_r( $sql ); exit();
			
			//
			if ( isset( $sql[0] )
			&& $sql[0]->option_name == $this->prefix_option
			&& $sql[0]->option_value != '' ) {
//				$this->custom_setting = esc_textarea( $sql[0]->option_value );
				$this->custom_setting = $sql[0]->option_value;
			}
//			print_r( $this->custom_setting ); exit();
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
				if( ! wp_verify_nonce( $_POST['_ebnonce'], $this->ebnonce ) ) {
					wp_die('404 not found!');
				}

				
				// print_r( $_POST );
				
				//
				$v = $_POST[$this->prefix_option];
				
				// add prefix key to option key
				$key = $this->prefix_option;
				
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
			wp_enqueue_script( $this->enqueue . 'admin', $this->etm_url . 'admin.js', array(), $this->media_version );
		}
		
		// form admin
		function admin() {
			
			// admin -> used real time version
			$this->media_version = time();
			
			//
			wp_enqueue_style( $this->enqueue . 'admin', $this->etm_url . 'admin.css', array(), $this->media_version, 'all' );
			
			//
			$main = file_get_contents ( ETM_DF_DIR . 'admin.html', 1 );
			
			$main = $this->template ( $main, array (
				'_ebnonce' => wp_create_nonce( $this->ebnonce ),
				
				'js' => 'var etm_arr_all_tags = ' . $this->custom_setting . ';',
				
				'custom_setting' => $this->custom_setting,
				
				'etm_plugin_url' => $this->etm_url,
				'etm_plugin_version' => $this->media_version,
			) );
			
			echo $main;
			
			//
//			add_action( 'admin_enqueue_scripts', array( $this, 'admin_script' ) );
			wp_enqueue_script( $this->enqueue . 'admin', $this->etm_url . 'admin.js', array(), $this->media_version );
			
		}
		
		function guest_script () {
			
			//
//			wp_register_script( $this->enqueue . 'top', $this->etm_url . 'top.js', array(), $this->media_version, true );
			
//			wp_enqueue_script( $this->enqueue . 'top' );
			
			wp_enqueue_script( $this->enqueue . 'top', $this->etm_url . 'top.js', array(), $this->media_version, false );
			
		}
		
		// get html for theme
		function guest() {
//			print_r( get_body_class() );
			
			echo '<!-- EchBay Tag Manager -->
<script type="text/javascript">
var etm_arr_all_tags = ' . $this->custom_setting . ',
	etm_body_class="' . implode( ' ', get_body_class() ) . '",
	etm_plugins_version = "' . ETM_DF_VERSION . '";
</script>
<script type="text/javascript" src="' . $this->etm_url . 'top.js?v=' . $this->media_version . '"></script>
<!-- End EchBay Tag Manager -->';
			
			//
//			add_action( 'wp_enqueue_scripts', array( $this, 'guest_script' ) );
//			wp_enqueue_script( $this->enqueue . 'top', $this->etm_url . 'top.js', array(), $this->media_version );
		}
		function footer() {
			/*
			echo '<!-- EchBay Tag Manager (footer) -->
<script type="text/javascript" src="' . $this->etm_url . 'footer.js?v=' . $this->media_version . '"></script>
<!-- End EchBay Tag Manager (footer) -->';
			*/
			
			//
//			wp_register_script( $this->enqueue . 'footer', $this->etm_url . 'footer.js', array(), $this->media_version );
			
//			wp_enqueue_script( $this->enqueue . 'footer' );
			
			wp_enqueue_script( $this->enqueue . 'footer', $this->etm_url . 'footer.js', array(), $this->media_version );
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
	if ( current_user_can('manage_options') )  {
		add_menu_page ( 'EchBay Tag Manager', 'EB Tag Manager', 'manage_options', 'etm-custom-setting', 'ETM_show_setting_form_in_admin', NULL, 99 );
	}
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



