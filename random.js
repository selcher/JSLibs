( function( w ) {

    var random = {};

    /**
     * Function: random.number
     *
     * @param amount = amount of random numbers to generate
     * @param start
     * @param stop
     */
    random.number = function( amount, start, stop ) {

        var result = [];

        for ( var i = ( amount || 1 ); i--; ) {

            result.push( Math.floor( Math.random() * 10 ) );

        }

        return result;

    };

    /**
     * Function: random.character
     *
     * @param amount = amount of random numbers to generate
     * @param start
     * @param stop
     */
    random.character = function( amount, start, stop ) {

    };

    w.random = random;

} )( window )
