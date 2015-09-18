( function( w ) {

    var range = {};

    /**
     * Function: range.from
     *
     * @param start
     * @param end
     * @param increment ( optional )
     */
    range.from = function( start, end, increment ) {

        var inc = increment || 1;
        var result = [];

        for ( var i = start; i <= end; i = i + inc ) {
            result.push( i );
        }

        return result;

    };

    /**
     * Function: range.for
     *
     * @param len = length
     * @param start ( optional )
     * @param increment ( optional )
     */
    range.for = function( len, start, increment ) {

        var inc = increment || 1;
        var startPt = start || 1;
        var endPt = startPt + ( ( len - 1 ) * inc );

        return this.from( startPt, endPt, inc );

    };

    /**
     * Function range.pad
     *
     * @param start
     * @param pad
     * @param increment ( optional )
     * @param leftBound
     * @param rightBound
     */
    range.pad = function( start, pad, increment, leftBound, rightBound ) {

        var inc = increment || 1;
        var padding = pad * inc;

        var result = this.from( start - padding, start + padding, inc );

        if ( leftBound != null || rightBound != null ) {

            result = this.trim( result, leftBound, rightBound );

        }

        return result;

    };

    /**
     * Function range.trim
     *
     * @param rangeArray
     * @param leftBound
     * @param rightBound
     */
    range.trim = function( rangeArray, leftBound, rightBound ) {

        var result = [];

        rangeArray.forEach( function( val ) {

            var inLeftBound = leftBound != null ? val >= leftBound : true;
            var inRightBound = rightBound != null ? val <= rightBound : true;

            if ( inLeftBound && inRightBound ) {

                result.push( val );

            }

        } );

        return result;

    };

    w.range = range;

} )( window )
