



// save old doc write
var etm_old_document_write = document.write;

//
function ETM_reset_document_write_to_old () {
	if ( etm_old_document_write != null ) {
		document.write = etm_old_document_write;
		
		etm_old_document_write = null;
	}
}

// print footer
if (typeof jQuery != 'function') {
	console.log('EchBay Tag Manager not start! jQuery function not found.');
}
else {
	
	try {
		
		//
		(function () {
			
			//
			if ( typeof etm_code_in_footer_this_site != 'undefined' && etm_code_in_footer_this_site != '' ) {
				
				// change doc write to be friendlier, temporary
				document.write = function(node){
					jQuery("body").append(node);
				};
				
				
				//
				document.write( etm_code_in_footer_this_site );
//				document.write( '<!-- EchBay Tag Manager (footer) -->' + "\n" + etm_code_in_footer_this_site + '<!-- End EchBay Tag Manager (footer) -->' + "\n" );
				
				
				// let the above script run, then replace doc.write
				jQuery(window).load(function () {
					ETM_reset_document_write_to_old();
				});
				
				// max 10 seconde for set old document write
				setTimeout(function() {
					ETM_reset_document_write_to_old();
				}, 10 * 1000);
				
			}
		})();
		
	} catch ( e ) {
		console.log( 'stack: ' + (e.stackTrace || e.stack) );
	}
	
}



