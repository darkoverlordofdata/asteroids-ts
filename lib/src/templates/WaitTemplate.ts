module asteroids.templates {

  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;
  import EntitySystem = artemis.EntitySystem;
  import TagManager = artemis.managers.TagManager;

  import WaitForStartView = asteroids.graphics.WaitForStartView;
  import WaitForStart = asteroids.components.WaitForStart;
  import GameState = asteroids.components.GameState;
  import Display = asteroids.components.Display;
  import Position = asteroids.components.Position;

  @EntityTemplate('start_game')
  export class WaitTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, state:GameState):artemis.Entity {

      var waitView = new WaitForStartView(<CanvasRenderingContext2D>EntitySystem.blackBoard.getEntry('2d'));
      entity.addComponent(state);
      entity.addComponent(WaitForStart, waitView, false);
      entity.addComponent(Display, waitView);
      entity.addComponent(Position, 0, 0);
      world.getManager<TagManager>(TagManager).register(Constants.Tags.START, entity);
      return entity;
    }
  }
}
