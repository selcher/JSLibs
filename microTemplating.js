// Simple JavaScript Templating
// Based from John Resig's post on micro templating
// http://ejohn.org/blog/javascript-micro-templating/
( function( w ) {

	var cache = {};

	/**
	 *Template tags
	 */
	var startTag = "<%";
	var variableTag = startTag + "=";
	var endTag = "%>";

	// Regex: /<%(?!=)/g
	var startTagPattern = new RegExp( startTag + "(?!=)", "g" );

	// Regex: /<%=(.*?)%>/g
	var variableTagPattern = new RegExp( variableTag + "(.*?)" + endTag, "g" );

	// Regex: /%>/g
	var endTagPattern = new RegExp( endTag, "g" );

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
				.replace( startTagPattern, "\t" )
				.replace( variableTagPattern, "',$1,'" )
				.replace( /\t/g, "');" )
				.replace( endTagPattern, "p.push('" )

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

	/**
	 * Set the tags of the template.
	 *
	 * @param start = start tag
	 * @param end = end tag
	 * @param varia = variable tag
	 */
	w.setTemplateTags = function setTemplateTags( start, end, varia ) {

		if ( start ) {
			
			startTag = start;
			startTagPattern = new RegExp( startTag + "(?!=)", "g" );
		
		}

		if ( end ) {
			
			endTag = end;
			endTagPattern = new RegExp( endTag, "g" );
		
		}

		if ( varia ) {
			
			variableTag = varia;
			variableTagPattern = new RegExp( variableTag + "(.*?)" + endTag, "g" );
		
		}

	};

} )( window );