


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
				var show_script = true;
				
				//
				if ( etm_arr_all_tags[i].status_tags == 'show' ) {
					
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
						etm_arr_all_tags[i].page_tags = etm_arr_all_tags[i].page_tags.replace(/\s/g, '').split(',');
//						console.log( etm_arr_all_tags[i].page_tags );
						
						// check class body -> current page
						for ( var j = 0; j < etm_arr_all_tags[i].page_tags.length; j++ ) {
//							console.log( etm_arr_all_tags[i].page_tags[j] );
							
							// check current page
							if ( show_script == false ) {
								if ( etm_body_class.split( etm_arr_all_tags[i].page_tags[j] ).length > 1 ) {
									show_script = true;
								}
							}
						}
					}
					
					
					// check if show in url only
					if ( etm_arr_all_tags[i].url_tags != '' ) {
						// if URL not true -> break
						if ( window.location.href.split( etm_arr_all_tags[i].url_tags ).length == 1 ) {
//							etm_arr_all_tags[i].header_tags = '';
//							etm_arr_all_tags[i].body_tags = '';
							show_script = false;
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
				if (typeof jQuery == 'function') {
					jQuery("head").append( str );
				}
				else {
					document.write( str );
				}
			}
			/*
			else {
				console.log('EchBay Tags Manager HEADER is NULL');
			}
			*/
		})();
		
		//
		console.log('EchBay Tags Manager is running... version ' + etm_plugins_version);
		
	} catch ( e ) {
		console.log( 'stack: ' + (e.stackTrace || e.stack) );
	}

//}


