module asteroids.systems {

  import Mapper = artemis.annotations.Mapper;

  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
  import ComponentMapper = artemis.ComponentMapper;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;

  import GameState = asteroids.components.GameState;
  import Hud = asteroids.components.Hud;

  export class HudSystem extends EntityProcessingSystem {

    @Mapper(GameState) gm:ComponentMapper<GameState>;
    @Mapper(Hud) hm:ComponentMapper<Hud>;

    /**
     * @constructor
     */
    constructor() {
      super(Aspect.getAspectForAll(GameState, Hud));
    }

    protected processEach(e:Entity) {
      //var c:Animation = this.am.get(e);
      //node.hud.view.setLives(node.state.lives);
      //node.hud.view.setScore(node.state.hits);  // Void
    }
  }
}