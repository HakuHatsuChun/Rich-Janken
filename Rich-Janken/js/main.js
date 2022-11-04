'use strict'
addEventListener( 'load', () => {

    const game = new Game();

    game.keybind( 'space', ' ' );

    const titleScene = () => {

      const scene = new Scene();
  
      const titleText = new Text( 'pokemon' );
      titleText.center().middle();
      scene.add( titleText );

      scene.onenterframe = () => {
        if ( game.input.space ) game.currentScene = mainScene();
      } 

      return scene;
  
    }

    const mainScene = () => {

    const map = [
      [2,2,2,2,2,2,2,2,2,2,2,2,2,2],
      [2,2,8,8,8,8,8,8,8,8,8,8,2,2],
      [2,4,0,0,0,0,0,0,0,0,0,0,9,2],
      [2,4,0,1,1,1,0,0,1,1,1,0,9,2],
      [2,4,0,1,1,1,0,0,1,1,1,0,9,2],
      [2,4,0,0,0,0,0,0,0,0,0,0,9,2],
      [2,4,0,1,1,1,0,0,1,1,1,0,9,2],
      [2,4,0,1,1,1,0,0,1,1,1,0,9,2],
      [2,4,0,0,0,0,0,0,0,0,0,0,9,2],
      [2,4,0,1,1,1,0,0,1,1,1,0,9,2],
      [2,4,0,1,1,1,0,0,1,1,1,0,9,2],
      [2,4,0,0,0,0,0,0,0,0,0,0,9,2],
      [2,4,0,1,1,1,0,0,1,1,1,0,9,2],
      [2,4,0,1,1,1,0,0,1,1,1,0,9,2],
      [2,4,0,0,0,0,0,0,0,0,0,0,9,2],
      [2,2,3,3,3,3,3,3,3,3,3,3,2,2],
      [2,2,2,2,2,2,2,2,2,2,2,2,2,2]
    
    ];

    const TILE_SIZE = 32;

    const WALKING_SPEED = 2;

    const scene = new Scene();

    const tilemap = new Tilemap( 'img/tile.png' );

    tilemap.data = map;

    tilemap.x = TILE_SIZE*4 - TILE_SIZE/2;
    tilemap.y = TILE_SIZE*3 - TILE_SIZE/2;

    tilemap.obstacles = [2,3,4,5,8,9];

    scene.add( tilemap );

    const trainer = new CharacterTile( 'img/trainers.png')

    trainer.x = trainer.y = TILE_SIZE*5 - TILE_SIZE/2;

    trainer.isSynchronize = false;

    tilemap.add( trainer );

    let toggleForAnimation = 0;

    let hasDisplayedGoalText = false;

    let isMovable = true;

    scene.onenterframe = () => {
      if ( ( tilemap.x - TILE_SIZE/2 ) % TILE_SIZE === 0 && ( tilemap.y - TILE_SIZE/2 ) % TILE_SIZE === 0 ) {
        tilemap.vx = tilemap.vy = 0;
        trainer.animation = 1;

        if ( isMovable ) {

              if ( game.input.left ) {
                tilemap.vx = WALKING_SPEED;
                trainer.direction = 1;
              }
              else if ( game.input.right ) {
                tilemap.vx = -1 * WALKING_SPEED;
                trainer.direction = 2;
              }
              else if ( game.input.up ) {
                tilemap.vy = WALKING_SPEED;
                trainer.direction = 3;
              }
              else if ( game.input.down ) {
                tilemap.vy = -1 * WALKING_SPEED;
                trainer.direction = 0;
              }

              const trainerCoordinateAfterMoveX = trainer.mapX - tilemap.vx/WALKING_SPEED;
              const trainerCoordinateAfterMoveY = trainer.mapY - tilemap.vy/WALKING_SPEED;
              if ( tilemap.hasObstacle( trainerCoordinateAfterMoveX, trainerCoordinateAfterMoveY ) ) tilemap.vx = tilemap.vy = 0;
            }
        }
            else if ( ( tilemap.x + TILE_SIZE/2 ) % ( TILE_SIZE/2 ) === 0 && ( tilemap.y + TILE_SIZE/2 ) % ( TILE_SIZE/2 ) === 0 ) {
              toggleForAnimation ^= 1;
              if ( toggleForAnimation === 0 ) trainer.animation = 2;
              else trainer.animation = 0;
            }
          }

          return scene;
        }
        game.add( titleScene() );
        game.add( mainScene() );

    game.start();

});