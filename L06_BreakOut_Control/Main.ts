namespace L06_BreakOut_Control {
  import ƒ = FudgeCore;

  enum GAMESTATE {
    PLAY, GAMEOVER
  }

  window.addEventListener("load", hndLoad);
  // window.addEventListener("click", sceneLoad);
  let ball: Moveable;
  let walls: ƒ.Node;
  let paddle: Moveable;
  let bricks: ƒ.Node;
  let wallBottom: ƒ.Node;
  let gameState: GAMESTATE = GAMESTATE.PLAY;
  let score: number = 0;
  //let _gameOver: boolean = false;

  export let viewport: ƒ.Viewport;
  let root: ƒ.Node;

  let control: ƒ.Control = new ƒ.Control("PaddleControl", 20, ƒ.CONTROL_TYPE.PROPORTIONAL);
  control.setDelay(100);

  function hndLoad(_event: Event): void {

    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    // ƒ.Debug.log(canvas);

    root = new ƒ.Node("Root");

    ball = new Moveable("Ball", new ƒ.Vector2(0, 0), new ƒ.Vector2(1, 1));
    root.addChild(ball);

    paddle = new Moveable("Paddle", new ƒ.Vector2(0, -10), new ƒ.Vector2(5, 1));
    root.addChild(paddle);

    walls = new ƒ.Node("Walls");
    root.addChild(walls);

    walls.addChild(new GameObject("WallLeft", new ƒ.Vector2(-18, 0), new ƒ.Vector2(1, 30)));
    walls.addChild(new GameObject("WallRight", new ƒ.Vector2(18, 0), new ƒ.Vector2(1, 30)));
    walls.addChild(new GameObject("WallTop", new ƒ.Vector2(0, 12), new ƒ.Vector2(40, 1)));
    wallBottom = new GameObject("WallBottom", new ƒ.Vector2(0, -12), new ƒ.Vector2(40, 1));
    wallBottom.removeComponent(wallBottom.getComponent(ƒ.ComponentMesh));
    walls.appendChild(wallBottom);

    bricks = createBricks(24);
    root.addChild(bricks);


    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(40);
    cmpCamera.pivot.rotateY(180);

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    // ƒ.Debug.log(viewport);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, hndLoop);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30);
  }

  function createBricks(_amount: number): ƒ.Node {
    let bricks: ƒ.Node = new ƒ.Node("Bricks");
    let x: number = -15;
    let y: number = 10;
    for (let i: number = 0; i < _amount; i++) {
      if (x > 15) {
        x = -15;
        y -= 2;
      }

      bricks.addChild(new GameObject(`Brick-${i}`, new ƒ.Vector2(x, y), new ƒ.Vector2(3, 1)));
      x += 4;
    }

    return bricks;
  }

  function hndLoop(_event: Event): void {
    if (gameState == GAMESTATE.GAMEOVER)
      return;
    // console.log("Tick");
    ball.move();
    viewport.draw();

    // TODO Untere begrenzung entfernen
    // Schläger Begrenzen
    // Schläger Velocity des Balls ändern

    control.setInput(ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
    + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])
    );

    paddle.velocity = ƒ.Vector3.X(control.getOutput());
    // if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT]))
    //   paddle.velocity = ƒ.Vector3.X(-10);
    // if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
    //   paddle.velocity = ƒ.Vector3.X(10);

    let posPaddle: ƒ.Vector3 = paddle.mtxLocal.translation;
    paddle.velocity = ƒ.Vector3.X(control.getOutput());
    paddle.move();
    if(
      paddle.checkCollision(<GameObject>walls.getChildrenByName("WallLeft")[0]) ||
      paddle.checkCollision(<GameObject>walls.getChildrenByName("WallRight")[0])
    ) paddle.mtxLocal.translation = posPaddle;

    hndCollision();
  }

  function hndCollision(): void {
    for (let wall of walls.getChildren()) 
      if (ball.checkCollision(<GameObject>wall))
        if(wall == wallBottom){
          gameState = GAMESTATE.GAMEOVER;
          displayScore();
        }

    for (let brick of bricks.getChildren() as GameObject[]) {
      if (ball.checkCollision(brick)){
        bricks.removeChild(brick);
        score++;
        displayScore();
      }
    }
  

    ball.checkCollision(paddle);
  }

  function displayScore(){
    let output: HTMLHeadingElement = document.querySelector("h2#Score");
    output.innerHTML = "Score: " + score; 

    if(GAMESTATE.GAMEOVER)
    output.innerHTML += "<br/>GAME OVER"
  }
}