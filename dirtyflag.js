function DirtyFlag( obj ) {

    if ( this instanceof DirtyFlag ) {

        this._p = obj.primary;
        this._d = obj.derived;
        this.flag = true;
        this.transform = obj.transform;

        Object.defineProperty( this, "primary", {
            "set": function( val ) {
                this._p = val;
                this.flag = true;
            },
            "get": function() {
                return this._p;
            }
        } );

        Object.defineProperty( this, "derived", {
            "get": function() {
                if ( this.flag ) {
                    this._d = this.transform();
                    this.flag = false;
                }
                return this._d;
            }
        } );

        return this;

    } else {

        return new DirtyFlag( obj );

    }

}
