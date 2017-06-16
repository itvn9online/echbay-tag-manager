


// content code in footer
var etm_code_in_footer_this_site = '';


//
function ETM_trim ( str ) {
	if (typeof jQuery == 'function') {
		return jQuery.trim( str );
	} else {
		return str.replace(/^\s+|\s+$/g, "");
	}
}


/*
if (typeof jQuery != 'function') {
	console.log('EchBay Tag Manager not start! jQuery function not found.');
}
else {
	*/
	
	//
	try {
		
		//
//		console.log( z );
		
		//
		(function ( z ) {
			var str = '';
			
			for ( var i = 0; i < z.length; i++ ) {
//				console.log( z[i] );
				
				//
				if ( z[i] != null
				&& z[i].status_tags == 'show'
				&& z[i].page_tags != 'all' ) {
					
					// default show script
					var show_script = true;
					
					// unescape data
//					console.log( z[i] );
					for ( var x in z[i] ) {
						z[i][x] = unescape( z[i][x] );
					}
//					console.log( z[i] );
					
					
					//
					z[i].name_tags = '<!-- ' + z[i].name_tags + ' (ETM) -->' + "\n";
					
					
					// check show in page select
					if ( z[i].page_tags != '' && z[i].page_tags != 'all' && etm_body_class != '' ) {
						
						// -> not show script
						show_script = false;
						
						//
//						console.log( z[i].page_tags );
						var arr_check = z[i].page_tags.replace(/\s/g, '').split(',');
//						console.log( arr_check );
						
						// check class body -> current page
						for ( var j = 0; j < arr_check.length; j++ ) {
//							console.log( arr_check[j] );
							
							// check current page
							if ( show_script == false ) {
								arr_check[j] = ETM_trim( arr_check[j] );
								
								if ( arr_check[j] != '' ) {
									if ( etm_body_class.split( arr_check[j] ).length > 1 ) {
										console.log( 'ETM: show in page ' + arr_check[j] );
										show_script = true;
										break;
									}
								}
							}
						}
					}
					
					
					// check if show in url only
					if ( z[i].url_tags != '' ) {
						
						// -> not show script
						show_script = false;
						
						//
						var wlh = window.location.href;
						
						//
//						console.log( z[i].url_tags );
						var arr_check = z[i].url_tags.split(',');
//						console.log( arr_check );
						
						// check URL custom set
						for ( var j = 0; j < arr_check.length; j++ ) {
//							console.log( arr_check[j] );
							
							// check current URL
							if ( show_script == false ) {
								arr_check[j] = ETM_trim( arr_check[j] );
								
								if ( arr_check[j] != '' ) {
									if ( wlh.split( arr_check[j] ).length > 1 ) {
										console.log( 'ETM: show in URL ' + arr_check[j] );
										show_script = true;
//										break;
									}
								}
							}
						}
					}
					
					
					//
					if ( show_script == true ) {
						// header
						if ( z[i].header_tags != '' ) {
							str += z[i].name_tags + z[i].header_tags;
						}
						
						// footer
						if ( z[i].body_tags != '' ) {
							etm_code_in_footer_this_site += z[i].name_tags + z[i].body_tags;
						}
					}
				}
			}
			
			// print header
			if ( str != '' ) {
				// recommend using jQuery
				if (typeof jQuery == 'function') {
					jQuery("head").append( str );
				}
				// basic javascript
				else {
					document.write( str );
				}
			}
			else {
				console.log('ETM HEADER is NULL');
			}
		})( etm_arr_all_tags );
		
		//
		console.log('EchBay Tags Manager is running... version ' + etm_plugins_version);
		
	} catch ( e ) {
		console.log( 'stack: ' + (e.stackTrace || e.stack) );
	}

//}


