namespace L04_BreakOut_Reflection {
  import fc = FudgeCore;

  window.addEventListener("load", sceneLoad);
  // window.addEventListener("click", sceneLoad);

  export let viewport: fc.Viewport;
  let root: fc.Node = new fc.Node("Root");
  let walls: fc.Node = new fc.Node("Walls");
  let ball: GameObject;
  let velocity: fc.Vector3 = new fc.Vector3(fc.Random.default.getRange(-1,1),fc.Random.default.getRange(-1,1),0);
  let speed: number = 10;
  velocity.normalize(speed);

  function sceneLoad(_event: Event): void {

    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    //fc.Debug.log(canvas);

    root.addChild(walls)

    ball = new GameObject("Ball", new fc.Vector2(0,0), new fc.Vector2(1,1));

    walls.addChild(new GameObject("WallLeft", new fc.Vector2(-18,0), new fc.Vector2(1,25)));
    walls.addChild(new GameObject("WallLeft", new fc.Vector2(18,0), new fc.Vector2(1,25)));
    walls.addChild(new GameObject("WallLeft", new fc.Vector2(0,12), new fc.Vector2(35,1)));
    walls.addChild(new GameObject("WallLeft", new fc.Vector2(0,-12), new fc.Vector2(35,1)));

    root.addChild(ball);
    
    let cmpCamera: fc.ComponentCamera = new fc.ComponentCamera();
    cmpCamera.pivot.translateZ(40);
    cmpCamera.pivot.rotateY(180);
    
    viewport = new fc.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    // fc.Debug.log(viewport);

    fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, hndLoop);
    fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 30);
  }

  function hndLoop(_event: Event): void{
    //console.log("Tick");
    //viewport.getGraph().getComponent(fc.ComponentTransform).local.rotateZ(1);
    //viewport.getGraph().cmpTransform.local.rotateZ(1);
    let frameTime: number = fc.Time.game.getElapsedSincePreviousCall() / 1000;
    let tmpVelocity: fc.Vector3 = velocity.copy;
    tmpVelocity.scale(frameTime);
    ball.mtxLocal.translate(tmpVelocity);
    ball.move();

    hndCollision();

    viewport.draw();
  }

  function hndCollision(): void {
    for (let wall of walls.getChildren()) {
      let intersection: fc.Rectangle = ball.rect.getIntersection((<GameObject>wall).rect);
      if (intersection) {
        console.log("Ball collides");
        if (intersection.size.x > intersection.size.y)
          ball.velocity.y *= -1;
        else
          ball.velocity.x *= -1;
      }
    }
  }
}