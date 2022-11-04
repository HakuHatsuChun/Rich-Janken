'use strict'

class CharacterTile extends Tile {
	constructor( img, size ) {
		super( img, size );
		this.direction = 0;
		this.animation = 1;
	} 
    
	render( canvas ) {
		if ( this.x + this.shiftX < -1 * this.size || this.x + this.shiftX > canvas.width ) return;
		if ( this.y + this.shiftY < -1 * this.size || this.y + this.shiftY > canvas.height ) return;
		const _ctx = canvas.getContext( '2d' );
		_ctx.drawImage(
			this.img,
			this.size * this.animation,
			this.size * this.direction,
			this.size,
			this.size,
			this.x + this.shiftX,
			this.y + this.shiftY,
			this.size,
			this.size
		);
	} 

}