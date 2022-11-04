'use strict'

class Text {

	constructor( text ) {

		this.text = text;
		this.font = "游ゴシック体, 'Yu Gothic', YuGothic, sans-serif";
		this.x = this.y = 0;
		this.vx = this.vy = 0;
		this.baseline = 'top';
		this.size = 20;
		this.color = '#ffffff';
		this.weight = 'normal';
		this._width = 0;
		this._height = 0;
        this._isCenter = false;
		this._isMiddle = false;
	} 

    center() {
		this._isCenter = true;
		return this;
	}

	middle() {
		this.baseline = 'middle'
		this._isMiddle = true;
		return this;
	}

	update( canvas ) {

		const _ctx = canvas.getContext( '2d' );

		_ctx.font = `${this.weight} ${this.size}px ${this.font}`;
		_ctx.fillStyle = this.color;
		_ctx.textBaseline = this.baseline;

		this._width = _ctx.measureText( this.text ).width;
		this._height = Math.abs( _ctx.measureText( this.text ).actualBoundingBoxAscent ) + Math.abs( _ctx.measureText( this.text ).actualBoundingBoxDescent );
		
        if ( this._isCenter ) this.x = ( canvas.width - this._width ) / 2;
		if ( this._isMiddle ) this.y = canvas.height / 2;

		this.render( canvas, _ctx );
		this.onenterframe();

		this.x += this.vx;
		this.y += this.vy;
	} 

	render( canvas, ctx ) {

		if ( this.x < -1 * this._width || this.x > canvas.width ) return;
		if ( this.y < -1 * this._height || this.y > canvas.height + this._height ) return;
		ctx.fillText( this.text, this.x, this.y );
	}
	onenterframe() {}

}