module asteroids.systems {

  import WaitForStart = asteroids.components.WaitForStart;
  import GameState = asteroids.components.GameState;
  import Asteroid = asteroids.components.Asteroid;
  import Position = asteroids.components.Position;
  import Collision = asteroids.components.Collision;
  import Audio = asteroids.components.Audio;
  import Mapper = artemis.annotations.Mapper;

  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
  import ComponentMapper = artemis.ComponentMapper;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;


  export class WaitForStartSystem extends EntityProcessingSystem {
    @Mapper(WaitForStart) wm:ComponentMapper<WaitForStart>;
    @Mapper(GameState) gm:ComponentMapper<GameState>;

    /**
     * @constructor
     */
    constructor() {
      super(Aspect.getAspectForAll(WaitForStart, GameState));
    }

    protected processEach(e:Entity) {


      var wait:WaitForStart = this.wm.get(e);
      if (wait.startGame) {
        var game:GameState = this.gm.get(e);
        game.setForStart();
        wait.startGame = false;
        this.world.deleteEntity(e);
        // also remove stray asteroids left over from prior games...
      }

      //var asteroid, game, node;
      //node = this.waitNodes.head;
      //game = this.gameNodes.head;
      //
      //if (node && node.wait.startGame && game) {
      //  asteroid = this.asteroids.head;
      //  while (asteroid) {
      //    this.creator.destroyEntity(asteroid.entity);
      //    asteroid = asteroid.next;
      //  }
      //
      //  game.state.setForStart();
      //  node.wait.startGame = false;
      //  this.engine.removeEntity(node.entity);  // Void
      //}
    }
  }
}