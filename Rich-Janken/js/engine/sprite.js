'use strict'

class Sprite {

    constructor( img, width, height ){
        this.img = new Image();
        this.img.src = img;
        this.x = this.y = 0;
        this.width = width || 32;
        this.height = height || 32;
        this.frame = 0;
		this.vx = this.vy = 0;
		this.shiftX = this.shiftY = 0;
    }

    update( canvas ){
        this.render( canvas );
		this.onenterframe();
		this.x += this.vx;
		this.y += this.vy;
		this.shiftX = this.shiftY = 0;
    }
    
    render( canvas ){
		if ( this.x < -1 * this.width || this.x > canvas.width ) return;
		if ( this.y < -1 * this.height || this.y > canvas.height ) return;

		const _frameX = this.frame % ( this.img.width / this.width );
		const _frameY = ~~( this.frame / ( this.img.width / this.width ) );

		const _ctx = canvas.getContext( '2d' );

		_ctx.drawImage(
			this.img,
			this.width * _frameX,
			this.height * _frameY,
			this.width,
			this.height,
			this.x + this.shiftX,
			this.y + this.shiftY,
			this.width,
			this.height
		);


    }

	onenterframe() {}
}