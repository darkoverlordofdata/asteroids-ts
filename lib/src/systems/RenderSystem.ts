module asteroids.systems {

  import Position = asteroids.components.Position;
  import Display = asteroids.components.Display;
  import Mapper = artemis.annotations.Mapper;
  import ImmutableBag = artemis.utils.ImmutableBag;

  import EntitySystem = artemis.EntitySystem;
  import ComponentMapper = artemis.ComponentMapper;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;


  export class RenderSystem extends EntitySystem {
    @Mapper(Position) pm:ComponentMapper<Position>;
    @Mapper(Display) dm:ComponentMapper<Display>;

    private graphic;

    /**
     * @constructor
     */
    constructor(graphic) {
      super(Aspect.getAspectForAll(Position, Display));
      this.graphic = graphic;
    }

    public processEntities(entities:ImmutableBag<Entity>) {

      var e:Entity;
      var position:Position;
      var display:Display;
      var graphic;

      this.graphic.save();
      this.graphic.translate(0, 0);
      this.graphic.rotate(0);
      this.graphic.clearRect(0, 0, this.graphic.canvas.width, this.graphic.canvas.height);

      for (var i=0, k=entities.size(); i<k; i++) {
        e = entities.get(i);
        position =  this.pm.get(e);
        display = this.dm.get(e);
        graphic = display.graphic;
        graphic.x = position.position.x;
        graphic.y = position.position.y;
        graphic.rotation = position.rotation;
        graphic.draw();

      }
      this.graphic.restore();
    }

  }
}