namespace L03_BreakOut {
  import fc = FudgeCore;

  window.addEventListener("load", sceneLoad);
  // window.addEventListener("click", sceneLoad);

  export let viewport: fc.Viewport;
  let root: fc.Node = new fc.Node("Root");
  let ball: fc.Node;
  let border: fc.Node = new fc.Node("Border")
  let velocity: fc.Vector3 = new fc.Vector3(fc.Random.default.getRange(-1,1),fc.Random.default.getRange(-1,1),0);
  let speed: number = 10;
  velocity.normalize(speed);

  function sceneLoad(_event: Event): void {

    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    fc.Debug.log(canvas);
    
    ball = new fc.Node("Ball");
    ball.addComponent(new fc.ComponentTransform())
    let meshBall: fc.MeshQuad = new fc.MeshQuad();
    let cmpBall: fc.ComponentMesh = new fc.ComponentMesh(meshBall);
    ball.addComponent(cmpBall);

    let mtrSolidWhite: fc.Material = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("WHITE")));
    let mtrSolidBlack: fc.Material = new fc.Material("SolidBlack", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("BLACK")));
    
    let ballMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(mtrSolidBlack);
    ball.addComponent(ballMaterial);

    border.addComponent(new fc.ComponentTransform())
    let meshBorder: fc.MeshQuad = new fc.MeshQuad();
    let cmpBorder: fc.ComponentMesh = new fc.ComponentMesh(meshBorder);
    border.addComponent(cmpBorder);

    let borderMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(mtrSolidWhite);
    border.addComponent(borderMaterial);
    
    border.getComponent(fc.ComponentMesh).pivot.scaleX(40);
    border.getComponent(fc.ComponentMesh).pivot.scaleY(26);

    root.addChild(ball);
    root.addChild(border);
    
    let cmpCamera: fc.ComponentCamera = new fc.ComponentCamera();
    cmpCamera.pivot.translateZ(40);
    cmpCamera.pivot.rotateY(180);
    cmpCamera.pivot.rotateX(10);
    cmpCamera.pivot.translateY(10);
    
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

    switch(detectHit(ball.cmpTransform.local.translation, border)){
      case "Vertical": 
        velocity.reflect(new fc.Vector3(0,-1,0));
        console.log("Oben,Unten");
        break;
      case "Horizontal": 
        velocity.reflect(new fc.Vector3(-1,0,0));
        console.log("Rechts,Links");
        break;
      case "None": break;
    }

    viewport.draw();
  }

  function detectHit(_position: fc.Vector3, _node: fc.Node): String {
    let sclRect: fc.Vector3 = _node.getComponent(fc.ComponentMesh).pivot.scaling.copy;
    let posRect: fc.Vector3 = _node.cmpTransform.local.translation.copy;
    let rect: fc.Rectangle = new fc.Rectangle(posRect.x, posRect.y, sclRect.x, sclRect.y, fc.ORIGIN2D.CENTER);
    if(!rect.isInside(new fc.Vector2(0,_position.y)))
      return "Vertical";
    else if(!rect.isInside(new fc.Vector2(_position.x,0)))
      return "Horizontal";
    else
      return "None";
  }
}