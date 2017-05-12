


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
					etm_arr_all_tags[i].name_tags = '<!-- ' + unescape( etm_arr_all_tags[i].name_tags ) + ' (ETM) -->' + "\n";
					etm_arr_all_tags[i].header_tags = unescape( etm_arr_all_tags[i].header_tags );
					etm_arr_all_tags[i].body_tags = unescape( etm_arr_all_tags[i].body_tags );
					
					// check if show in url only
					if ( etm_arr_all_tags[i].url_tags != '' ) {
						if ( window.location.href.split(etm_arr_all_tags[i].url_tags).length == 1 ) {
							etm_arr_all_tags[i].header_tags = '';
							etm_arr_all_tags[i].body_tags = '';
						}
						else {
							etm_arr_all_tags[i].header_tags = unescape( etm_arr_all_tags[i].header_tags );
							etm_arr_all_tags[i].body_tags = unescape( etm_arr_all_tags[i].body_tags );
						}
					}
					
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
			
			// print header
			if ( str != '' ) {
				if (typeof jQuery == 'function') {
					jQuery("head").append( str );
				}
				else {
					document.write( str );
				}
			}
			else {
				console.log('EchBay Tags Manager HEADER is NULL');
			}
		})();
		
		//
		console.log('EchBay Tags Manager is running... version ' + etm_plugins_version);
		
	} catch ( e ) {
		console.log( 'stack: ' + (e.stackTrace || e.stack) );
	}

//}


