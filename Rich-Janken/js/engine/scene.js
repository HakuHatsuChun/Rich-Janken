'use strict'

class Scene {

	constructor() {
		this.objs = [];
	} 
	add( obj ) {
        if ( obj instanceof Sprite || obj instanceof Text || obj instanceof Tilemap ) this.objs.push( obj );

		else console.error( 'Sceneに追加できるのはSprite、Text、Tilemapだけだよ！' );
	}

    update( canvas ) {

		this.onenterframe();
	} 

	onenterframe() {}

	onchangescene() {}

}