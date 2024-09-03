/* https://github.com/Tanbiruzzaman/afch-bnwp, translated and adapted from
 * https://github.com/WPAFC/afch-rewrite */
//<nowiki>
( function ( $, mw ) {
	var subscriptToLoad = false,
		pageName = mw.config.get( 'wgPageName' ).replace( /_/g, ' ' ),

		// `loadMap` determines which scripts should be loaded
		// on each page. Each key is a subscript name and
		// its value is a list of page prefixes on which it
		// should be loaded.

		loadMap = {
			// `submissions.js` is for reviewing textual
			// Articles for Creation submissions.
			submissions: [
				'উইকিপিডিয়া:নিবন্ধ সৃষ্টিকরণ/', 'উইকিপিডিয়া আলোচনা:নিবন্ধ সৃষ্টিকরণ/', 'ব্যবহারকারী:', 'খসড়া:'
			]
		};

	$.each( loadMap, function ( script, prefixes ) {
		$.each( prefixes, function ( _, prefix ) {
			if ( pageName.indexOf( prefix ) === 0 ) {
				subscriptToLoad = script;
				return false;
			}
		} );

		// Return false and break out of the loop if already found
		return !!subscriptToLoad;
	} );

	if ( subscriptToLoad ) {
		// Initialize the AFCH object
		window.AFCH = {};

		// Set up constants
		AFCH.consts = {};

		// Master version data
		AFCH.consts.version = '0.1.0';
		AFCH.consts.versionName = 'Beta';

		// FIXME: Change when moving into production
		AFCH.consts.beta = true;

		AFCH.consts.scriptpath =
      mw.config.get( 'wgServer' ) + mw.config.get( 'wgScript' );
		AFCH.consts.baseurl = AFCH.consts.scriptpath +
      '?action=raw&ctype=text/javascript&title=ব্যবহারকারী:Tanbiruzzaman/afch-master.js';

		$.getScript( AFCH.consts.baseurl + '/core.js' ).done( function () {
			var loaded = AFCH.load( subscriptToLoad );
			if ( !loaded ) {
				mw.notify(
					'AFCH লোড হচ্ছেনা:' +
              ( AFCH.error || 'অজানা ত্রুটি' ),
					{ title: 'AFCH ত্রুটি' } );
			}
		} );
	}
}( jQuery, mediaWiki ) );
//</nowiki>
