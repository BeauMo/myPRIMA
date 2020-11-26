namespace L08_Doom_Design {
  import f = FudgeCore;
  import ƒaid = FudgeAid;

  window.addEventListener("load", hndLoad);

  export let viewport: f.Viewport;
  let avatar: f.Node = new f.Node("Avatar");
  let enemy1: Enemy;
  
  let cam: FreeCam = new FreeCam(avatar);

  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");


    let root = new f.Node("Root");

    let meshQuad: f.MeshQuad = new f.MeshQuad("Quad");
    
    let txtFloor: f.TextureImage = new f.TextureImage("../DoomAssets/DEM1_5.png");
    let mtrFloor: f.Material = new f.Material("Floor", f.ShaderTexture, new f.CoatTextured(null, txtFloor));
    let floor: ƒaid.Node = new ƒaid.Node("Floor", f.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
    floor.mtxLocal.scale(f.Vector3.ONE(20));
    floor.getComponent(f.ComponentMaterial).pivot.scale(f.Vector2.ONE(10));

    root.appendChild(floor);
    
    let txtWall: f.TextureImage = new f.TextureImage("../DoomAssets/CEMPOIS.png");
    let mtrWall: f.Material = new f.Material("Wall", f.ShaderTexture, new f.CoatTextured(null, txtWall));
    
    let wall: ƒaid.Node = new ƒaid.Node("Wall", f.Matrix4x4.TRANSLATION(f.Vector3.Y(1)), mtrWall, meshQuad);
    let wall2: ƒaid.Node = new ƒaid.Node("Wall2", f.Matrix4x4.TRANSLATION(f.Vector3.Y(1)), mtrWall, meshQuad);

    wall2.mtxLocal.translateX(2);

    wall.mtxLocal.scale(f.Vector3.ONE(2));
    wall2.mtxLocal.scale(f.Vector3.ONE(2));

    wall.getComponent(f.ComponentMaterial).pivot.scale(f.Vector2.ONE(1));
    
    root.appendChild(wall);
    root.appendChild(wall2);
    root.addChild(avatar);

    enemy1 = new Enemy("Enemy1", new f.Vector3(1,0,1), f.Vector2.ONE(2.0)); 
    root.appendChild(enemy1);

    viewport = new f.Viewport();
    viewport.initialize("Viewport", root, cam.cmpCamera, canvas);

    canvas.addEventListener("mousemove", cam.hndMouse);
    canvas.addEventListener("click", canvas.requestPointerLock);

    pivotMarker(root);

    console.log(root)

    f.Loop.addEventListener( f.EVENT.LOOP_FRAME, hndLoop);
    f.Loop.start(f.LOOP_MODE.TIME_GAME, 60);
  }

  function hndLoop(_event: Event): void {
    cam.hndControls();
    viewport.draw();
    enemy1.faceTo(avatar);
  }

  // function hndEnemy(): void {
  //   let tempPos: f.Vector3 = enemy.mtxLocal.translation;
  //   let neartarget: Boolean = true;
  //   enemy.faceTo(avatar);

  //   for (let walls of root.getChildrenByName("Walls"))
  //     for (let wall of walls.getChildren() as GameObject[]) {
  //       if (enemy.isTargetbetween(avatar, wall)) {
  //         neartarget = false;
  //         break;
  //       }
  //     }
  //   if (enemy.detectHit(avatar.mtxLocal.translation, cameraRadius)) {
  //     neartarget = false;
  //   }
  //   if (neartarget) {
  //     enemy.walkTo();
  //     hndCollision(enemy, tempPos, 0.8);

  //   }

  // }
}