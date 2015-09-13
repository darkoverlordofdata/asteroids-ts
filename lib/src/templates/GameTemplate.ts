module asteroids.templates {

  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;
  import EntitySystem = artemis.EntitySystem;
  import TagManager = artemis.managers.TagManager;

  import HudView = asteroids.graphics.HudView;
  import GameState = asteroids.components.GameState;
  import Display = asteroids.components.Display;
  import Position = asteroids.components.Position;
  import Hud = asteroids.components.Hud;
  import Constants = asteroids.Constants;

  @EntityTemplate('game')
  export class GameTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, state:GameState):artemis.Entity {

      var hud = new HudView(EntitySystem.blackBoard.getEntry('2d'));
      entity.addComponent(state);
      entity.addComponent(Display, hud);
      entity.addComponent(Position, 0, 0);
      entity.addComponent(Hud, hud);
      world.getManager<TagManager>(TagManager).register(Constants.Tags.GAME, entity);
      return entity;
    }
  }
}
