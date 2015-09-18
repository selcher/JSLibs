// Simple JavaScript Templating
// Based from John Resig's post on micro templating
// http://ejohn.org/blog/javascript-micro-templating/
( function( w ) {

	var cache = {};

	/**
	 * Convert object to string format.
	 */
	var convertDataToStr = function convertDataToStr( data ) {

		var dataKeys = Object.keys( data );
		var dataKeysLength = dataKeys.length;
		var dataKey = null;
		var dataAsStr = "";

		for ( var i = dataKeysLength; i--; ) {

			dataKey = dataKeys[ i ];
			dataAsStr += "var " + dataKey + " = " + JSON.stringify( data[ dataKey ] ) + ";";

		}

		return dataAsStr;

	};

	/**
	 * Convert the template string to pure javascript.
	 */
	var convertTemplateStrToJS = function convertTemplateStrToJS( templateStr ) {

		return (

			"var p=[],print=function(){p.push.apply(p,arguments);};" +

			"p.push('" +

			templateStr.replace( /[\r\t\n]/g, " " )
				.replace( /<%(?!=)/g, "\t" )
				.replace( /<%=(.*?)%>/g, "',$1,'" )
				.replace( /\t/g, "');" )
				.replace( /%>/g, "p.push('" )

			+ "');return p.join('');"

		);

	};

	/**
	 * Public API
	 *
	 * Parse template string with data
	 *
	 * @param str = template
	 * @param data = object
	 */
	w.template = function template( str, data ) {

		// Figure out if we're getting a template, or if we need to
		// load the template - and be sure to cache the result.
		var fn = !/\W/.test( str ) ?

			cache[ str ] = cache[ str ] ||
				template( document.getElementById( str ).innerHTML ) :

			// Generate a reusable function that will serve as a template
			// generator (and which will be cached).
			new Function(
				"obj",
				convertDataToStr( data ) + convertTemplateStrToJS( str )
			);

		// Provide some basic currying to the user
		return data ? fn( data ) : fn;
	
	};

} )( window );