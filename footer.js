



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
//window.onload = function() {
//if (typeof jQuery == 'function') {
	
	try {
		
		//
		(function () {
			
			// exist if code not found
			if ( typeof etm_code_in_footer_this_site == 'undefined' || etm_code_in_footer_this_site == '' ) {
				console.log('ETM FOOTER is NULL');
				return false;
			}
//			console.log( etm_code_in_footer_this_site );
			
			
			// change doc write to be friendlier, temporary
			if (typeof jQuery == 'function') {
				document.write = function(node){
					jQuery("body").append(node);
				};
			}
			
			
			//
			document.write( etm_code_in_footer_this_site );
//			document.write( '<!-- EchBay Tag Manager (footer) -->' + "\n" + etm_code_in_footer_this_site + '<!-- End EchBay Tag Manager (footer) -->' + "\n" );
			
			
			//
			/*
//			var jd = '_' + Math.random().toString(32) + Math.random().toString(32);
//			jd = jd.replace( /\./g, '_' );
//			document.write( '<div id="' + jd + '"></div>' );
//			var d1 = document.getElementById(jd);
//			d1.insertAdjacentHTML('beforeend', etm_code_in_footer_this_site);
			*/
			
			//
			/*
//			var e = document.createElement('div');
//			e.innerHTML = etm_code_in_footer_this_site;
//			
//			while(e.firstChild) {
//				element.appendChild(e.firstChild);
//			}
			*/
			
			
			// let the above script run, then replace doc.write
			if (typeof jQuery == 'function') {
				jQuery(window).on('load', function () {
					ETM_reset_document_write_to_old();
				});
			}
			else {
				console.log('EchBay Tag Manager recommend using jQuery.');
				
				window.onload = function (e) {
					ETM_reset_document_write_to_old();
				}
			}
			
			// max 10 seconde for set old document write
			setTimeout(function() {
				ETM_reset_document_write_to_old();
			}, 10 * 1000);
			
		})();
		
	} catch ( e ) {
		console.log( 'stack: ' + (e.stackTrace || e.stack) );
	}
	
/*
}
else {
	console.log('EchBay Tag Manager not start! jQuery function not found.');
}
*/
//};



