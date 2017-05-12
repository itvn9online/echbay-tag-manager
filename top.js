


// content code in footer
var etm_code_in_footer_this_site = '';


/*
if (typeof jQuery != 'function') {
	console.log('EchBay Tag Manager not start! jQuery function not found.');
}
else {
	*/
	
	//
	try {
		
		//
//		console.log( etm_arr_all_tags );
		
		//
		(function () {
			var str = '';
			
			for ( var i = 0; i < etm_arr_all_tags.length; i++ ) {
//				console.log( etm_arr_all_tags[i] );
				
				//
				if ( etm_arr_all_tags[i].status_tags == 'show' ) {
					
					// default show script
					var show_script = true;
					
					// unescape data
//					console.log( etm_arr_all_tags[i] );
					for ( var x in etm_arr_all_tags[i] ) {
						etm_arr_all_tags[i][x] = unescape( etm_arr_all_tags[i][x] );
					}
//					console.log( etm_arr_all_tags[i] );
					
					
					//
					etm_arr_all_tags[i].name_tags = '<!-- ' + etm_arr_all_tags[i].name_tags + ' (ETM) -->' + "\n";
					
					
					// check show in page select
					if ( etm_arr_all_tags[i].page_tags != '' && etm_arr_all_tags[i].page_tags != 'all' && etm_body_class != '' ) {
						
						// -> not show script
						show_script = false;
						
						//
//						console.log( etm_arr_all_tags[i].page_tags );
						var arr_check = etm_arr_all_tags[i].page_tags.replace(/\s/g, '').split(',');
//						console.log( arr_check );
						
						// check class body -> current page
						for ( var j = 0; j < arr_check.length; j++ ) {
//							console.log( arr_check[j] );
							
							// check current page
							if ( show_script == false ) {
								arr_check[j] = jQuery.trim( arr_check[j] );
								
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
					if ( etm_arr_all_tags[i].url_tags != '' ) {
						
						// -> not show script
						show_script = false;
						
						//
						var wlh = window.location.href;
						
						//
//						console.log( etm_arr_all_tags[i].url_tags );
						var arr_check = etm_arr_all_tags[i].url_tags.split(',');
//						console.log( arr_check );
						
						// check URL custom set
						for ( var j = 0; j < arr_check.length; j++ ) {
//							console.log( arr_check[j] );
							
							// check current URL
							if ( show_script == false ) {
								arr_check[j] = jQuery.trim( arr_check[j] );
								
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
						if ( etm_arr_all_tags[i].header_tags != '' ) {
							str += etm_arr_all_tags[i].name_tags + etm_arr_all_tags[i].header_tags;
						}
						
						// footer
						if ( etm_arr_all_tags[i].body_tags != '' ) {
							etm_code_in_footer_this_site += etm_arr_all_tags[i].name_tags + etm_arr_all_tags[i].body_tags;
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
		})();
		
		//
		console.log('EchBay Tags Manager is running... version ' + etm_plugins_version);
		
	} catch ( e ) {
		console.log( 'stack: ' + (e.stackTrace || e.stack) );
	}

//}


