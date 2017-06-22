


// print footer
(function () {
	
	//
	if ( typeof etm_code_in_footer_this_site != 'undefined' && etm_code_in_footer_this_site != '' ) {
		
		// save old doc write
		var etmOldDocWrite = document.write;
		
		// change doc write to be friendlier, temporary
		document.write = function(node){
			jQuery("body").append(node);
		};
		
		
		// let the above script run, then replace doc.write
		$(window).on('load', function () {
			document.write = etmOldDocWrite;
		});
		/*
		$(document).ready(function(e) {
			document.write = etmOldDocWrite;
		});
		*/
		/*
		setTimeout(function() {
			document.write = etmOldDocWrite;
		}, 1000);
		*/
		
		
		//
//		jQuery('body').append( etm_code_in_footer_this_site ); return false;
//		jQuery(document.body).append( etm_code_in_footer_this_site ); return false;
		document.write( etm_code_in_footer_this_site ); return false;
		
		
		//
		var ETM_add_script_file_to_footer = function ( rc ) {
			
			//
//			jQuery.getScript(rc, function() {});
//			jQuery.getScript(rc);
//			return false;
			
			
			//
			var s = 'script',
				d = document,
				js,
				fjs = d.getElementsByTagName(s);
			
			//
			fjs = fjs[ fjs.length - 1 ];
			
			//
			js = d.createElement(s);
			js.async = 1;
			js.src = rc;
			js.charset = 'utf-8';
			fjs.parentNode.insertBefore(js, fjs.nextSibling);
		};
		
		
		//
		etm_code_in_footer_this_site = etm_code_in_footer_this_site.split('</script>');
		
		//
		var arr_check_src = [
			'//www.googleadservices.com/pagead/conversion.js',
			'//www.googleadservices.com/pagead/conversion_async.js'
		];
		
		//
		for ( var i = 0; i < etm_code_in_footer_this_site.length; i++ ) {
//			console.log( etm_code_in_footer_this_site[i] );
			
			//
			var da_inner = 0;
			for ( var x = 0; x < arr_check_src.length; x++ ) {
				if ( etm_code_in_footer_this_site[i].split( arr_check_src[x] ).length > 1 ) {
					ETM_add_script_file_to_footer( arr_check_src[x] );
					
					da_inner = 1;
				}
			}
			
			//
			if ( da_inner == 0 ) {
				etm_code_in_footer_this_site[i] += '</script>';
				
				//
//				jQuery('body').append( etm_code_in_footer_this_site[i] );
//				jQuery(document.body).append( etm_code_in_footer_this_site[i] );
				document.write( etm_code_in_footer_this_site[i] );
			}
		}
		
	}
})();



