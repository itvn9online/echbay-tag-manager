



// https://www.googletagmanager.com/gtm.js?id=GTM-WSRXC2G



//
var etm_click_esc_to_clode_etm_window = 0,
	etm_html_template_for_createlist = jQuery('#the-list').html() || '';



//
//try {
	
	// optimize tags
	function ETM_compress_html ( str ) {
		str = unescape( str );
		
		str = str.replace( / type=\"text\/javascript\"/gi, '' );
		str = str.replace( / type=\'text\/javascript\'/gi, '' );
		
		//
		var arr = str.split("\n"),
			re = /^\w+$/,
			ky_tu_cuoi_cung = '';
		str = '';
		for (var i = 0; i < arr.length; i++) {
			arr[i] = jQuery.trim(arr[i]);
			
			//
			if ( arr[i] != '' ) {
				// remove comment
				if ( arr[i].substr( 0, 4 ) == '<!--' && arr[i].substr( arr[i].length - 3 ) == '-->' ) {
				}
				else if ( arr[i].substr( 0, 2 ) == '/*' && arr[i].substr( arr[i].length - 2 ) == '*/' ) {
				}
				// accept code
				else if ( arr[i].substr(0, 2) != '//' ) {
//					if (arr[i] != '') {
						str += arr[i];
//					}
					
					//
					ky_tu_cuoi_cung = arr[i].substr( arr[i].length - 1 );
					if ( ky_tu_cuoi_cung != ';' ) {
						str += "\n";
					}
				}
			}
		}
		
		return encodeURIComponent( str );
	}
	
	function ETM_dog ( id ) {
		return document.getElementById(id);
	}
	
	function ETM_disable_input_page_tags () {
		if ( document.getElementById('page_tags_all').checked == true ) {
			jQuery('input[name="page_tags[]"]').prop('disabled', true);
			document.getElementById('page_tags_all').disabled = false;
		}
		else {
			jQuery('input[name="page_tags[]"]').prop('disabled', false);
		}
	}
	
	function ETM_check_before_update () {
		
		//
		var new_arr = {
			name_tags : jQuery('#name_tags').val() || '',
			status_tags : jQuery('input[name="status_tags"]:checked').val() || 'show',
			page_tags : (function () {
				var str = '';
				if ( document.getElementById('page_tags_all').checked == false ) {
					jQuery('input[name="page_tags[]"]:checked').each(function() {
						str += ',' + jQuery(this).val();
					});
				}
				
				//
				if ( str == '' ) {
					str = jQuery('input[name="page_tags[]"]:first').val();
				}
				else {
					str = str.substr(0, 1) == ',' ? str.substr(1) : str;
				}
				
				return str;
			})(),
			url_tags : jQuery('#url_tags').val() || '',
			header_tags : jQuery('#header_tags').val() || '',
			body_tags : jQuery('#body_tags').val() || ''
		};
		console.log( new_arr );
//		console.log( jQuery('input[name="status_tags"]:checked').val() );
		
		//
		if ( new_arr['header_tags'] == '' && new_arr['body_tags'] == '' ) {
			if ( confirm('Re-Enter Header or Body code') == false ) {
				jQuery('input[name="status_tags"]').each(function() {
					if ( jQuery(this).val() == 'hide' ) {
						jQuery(this).prop('checked', true);
					}
				});
				return false;
			} else {
				jQuery('#header_tags').focus();
			}
		}
		
		// mã hóa để đảm bảo an toàn dữ liệu trước khi submit
		/*
		for ( var x in new_arr ) {
			if ( typeof new_arr[x] == 'string' ) {
				new_arr[x] = escape( new_arr[x] );
			}
		}
		*/
		
		//
		var tags_id = jQuery('#_eb_tags_id').val() || '';
		
		// add new
		if ( tags_id == '' ) {
			
			// set new node for edit tags
			jQuery('#_eb_tags_id').val( etm_arr_all_tags.length );
			
//			etm_arr_all_tags = [];
			etm_arr_all_tags.push( new_arr );
		}
		// edit
		else {
			tags_id = tags_id.toString().replace(/[^0-9]/g, '');
			console.log( 'Edit tags: ' + tags_id );
			
			// check node exist
			if ( tags_id == '' || typeof etm_arr_all_tags[ tags_id ] == 'undefined' ) {
				alert('ID for edit not found');
				return false;
			}
			
			//
			etm_arr_all_tags[ tags_id ] = new_arr;
		}
		
		//
		ETM_escape_arr_for_update();
		
		// set to form
		jQuery('#header_body_tags').val( JSON.stringify( etm_arr_all_tags ) );
		
		// Create tab for all page, google remarketing disable document.write
		etm_optimize_arr_all_tags = etm_arr_all_tags.slice();
		
		ETM_dog('etm_header_all_page').value = '';
		ETM_dog('etm_body_all_page').value = '';
		for ( var i = 0; i < etm_arr_all_tags.length; i++ ) {
			// nếu tags là all page
			if ( etm_arr_all_tags[i].page_tags == 'all'
			// trạng thái là hiển thị
			&& etm_arr_all_tags[i].status_tags == 'show'
			// hiển thị trên tất cả URL
			&& etm_arr_all_tags[i].url_tags == '' ) {
				ETM_dog('etm_header_all_page').value += etm_arr_all_tags[i].header_tags;
				ETM_dog('etm_body_all_page').value += etm_arr_all_tags[i].body_tags;
				
				etm_optimize_arr_all_tags[i] = null;
			}
		}
		ETM_dog('etm_header_all_page').value = ETM_compress_html( ETM_dog('etm_header_all_page').value );
		ETM_dog('etm_body_all_page').value = ETM_compress_html( ETM_dog('etm_body_all_page').value );
		
		//
		jQuery('#header_body_optimize').val( JSON.stringify( etm_optimize_arr_all_tags ) );
		
		//
		ETM_create_html_list();
		
		//
		return true;
	}
	
	
	function ETM_escape_arr_for_update () {
//		console.log( etm_arr_all_tags );
		for ( var i = 0; i < etm_arr_all_tags.length; i++ ) {
			for ( var x in etm_arr_all_tags[i] ) {
				etm_arr_all_tags[i][x] = escape( etm_arr_all_tags[i][x] );
			}
		}
//		console.log( etm_arr_all_tags );
	}
	
	
	function ETM_unescape_arr_for_update () {
//		console.log( etm_arr_all_tags );
		for ( var i = 0; i < etm_arr_all_tags.length; i++ ) {
			for ( var x in etm_arr_all_tags[i] ) {
				etm_arr_all_tags[i][x] = unescape( etm_arr_all_tags[i][x] );
			}
		}
//		console.log( etm_arr_all_tags );
	}
	
	
	function ETM_open_form_edit_tags () {
		jQuery('body').addClass('etm-no-scroll');
		
		document.echbay_config_for_efm.reset();
		
		ETM_disable_input_page_tags();
		
//		jQuery('#etm_list_tags').hide();
		
		jQuery('#etm_edit_tags').height( jQuery(window).height() );
		
		ETM_fix_textarea_height();
		
		//
		if ( etm_click_esc_to_clode_etm_window == 0 ) {
			etm_click_esc_to_clode_etm_window = 1;
			
			// press ESC to close ETM window
			jQuery(document).keydown(function(e) {
				if (e.keyCode == 27) {
					ETM_close_form_edit_tags();
				}
			});
			
			jQuery(window).resize(function () {
				jQuery('#etm_edit_tags').height( jQuery(window).height() );
			});
		}
	}
	
	
	function ETM_close_form_edit_tags () {
		jQuery('body').removeClass('etm-no-scroll');
		
//		jQuery('#etm_edit_tags').hide();
	}
	
	
	//
	function ETM_fix_textarea_height() {
		jQuery('textarea.etm-fix-textarea-height').each(function() {
			var a = jQuery(this).attr('data-resize') || '';
			if (a == '') {
				jQuery(this).height(90);
				
				//
				var new_height = jQuery(this).get(0).scrollHeight || 0;
				new_height += 20;
				if (new_height < 90) {
					new_height = 90;
				}
				
				//
				jQuery(this).height(new_height);
				
				//
//				console.log('Fix textarea height #' + ( jQuery(this).attr('name') || jQuery(this).attr('id') || 'NULL' ) );
			}
			/*
		}).off('click').click(function() {
			ETM_fix_textarea_height()
		}).off('blur').blur(function() {
			ETM_fix_textarea_height()
			*/
		}).off('change').change(function() {
			ETM_fix_textarea_height()
		});
	}
	
	function ETM_create_node_list ( htm, arr, tags_id ) {
		for ( var x in arr ) {
//			console.log(x);
			
			//
//			arr[x] = unescape( arr[x].slice() );
			
			//
			var re = arr[x];
			if ( x == 'page_tags' ) {
				re = arr[x].replace( /\,/gi, ', ' );
			}
			else if ( x == 'url_tags' && re == '' ) {
				re = 'All URL';
			}
			
			//
			htm = htm.replace( '{jmp.' + x + '}', re );
			htm = htm.replace( '{jmp.' + x + '}', re );
		}
		htm = htm.replace( '{jmp.tags_id}', tags_id );
		
		//
		return htm
	}
	
	
	function ETM_create_html_list () {
		
		//
		ETM_unescape_arr_for_update();
		
		//
		var tmp = etm_html_template_for_createlist.slice();
		if ( tmp != '' ) {
			var str = '';
			
			for ( var i = 0; i < etm_arr_all_tags.length; i++ ) {
				str += ETM_create_node_list( tmp, etm_arr_all_tags[i], i );
			}
			
			jQuery('#the-list').html( str );
			jQuery('#etm_list_tags').show();
			
			//
			jQuery('.click-to-edit-echbay-tags').off('click').click(function () {
				
				ETM_open_form_edit_tags();
				
				var a = jQuery( this ).attr('data-id') || '';
				
				jQuery('#_eb_tags_id').val( a );
				
				//
				var arr = etm_arr_all_tags[a];
				for ( var x in arr ) {
					if ( typeof arr[x] == 'object' ) {
					} else {
						if ( x == 'page_tags' ) {
//							console.log( arr[x] );
							var arr_x = arr[x].replace( /\s/g, '' ).split(',');
//							console.log( arr_x );
							
							for ( var j = 0; j < arr_x.length; j++ ) {
								jQuery('input[name="page_tags[]"]').each(function() {
									if ( jQuery(this).val() == arr_x[j] ) {
										jQuery(this).prop('checked', true);
									}
								});
							}
							
							//
							ETM_disable_input_page_tags();
						}
						else if ( x == 'status_tags' ) {
							jQuery('input[name="status_tags"]').each(function() {
								if ( jQuery(this).val() == arr[x] ) {
									jQuery(this).prop('checked', true);
								}
							});
						}
						else {
//							jQuery('#' + x).val( unescape( arr[x] ) );
							jQuery('#' + x).val( arr[x] );
						}
					}
				}
				
				ETM_fix_textarea_height();
				
			});
		}
	}
	
	
	// add new tags
	jQuery('#create_new_tags').click(function () {
		
		ETM_open_form_edit_tags();
		
	});
	
	
	
	
	//
	(function () {
		
		
		//
		var arr = [
			'all',
			'single',
			'archive',
			'page',
			'front_page',
			'home',
			'tag',
			'category',
			'feed',
			'search',
			'author',
			'404'
		];
		var str = '';
		for ( var i = 0; i < arr.length; i++ ) {
			str += '<input type="checkbox" name="page_tags[]" id="page_tags_' + arr[i] + '" value="' + arr[i] + '">\
				<label for="page_tags_' + arr[i] + '">' + arr[i] + '</label>\
				</br>';
		}
		
		//
		jQuery('#etm_show_list_page').html(str);
		
	}());
	
	//
	jQuery('input[name="page_tags[]"]').change(function () {
		ETM_disable_input_page_tags();
	});
	
	
	
	//
	if ( etm_arr_all_tags.length == 0 ) {
		jQuery('.show-if-tags-null').show();
	}
	else {
		
		//
		ETM_create_html_list();
		
		//
		ETM_fix_textarea_height();
	}
	
/*	
} catch ( e ) {
	console.log( 'stack: ' + (e.stackTrace || e.stack) );
}
*/




