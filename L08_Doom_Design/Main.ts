namespace L08_Doom_Design {
  import ƒ = FudgeCore;
  import ƒaid = FudgeAid;

  window.addEventListener("load", hndLoad);

  export let viewport: ƒ.Viewport;
  let root: ƒ.Node;
  let avatar: ƒ.Node = new ƒ.Node("Avatar");
  let cam: FreeCam = new FreeCam(avatar);

  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    root = new ƒ.Node("Root");

    let meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad("Quad");
    
    let txtFloor: ƒ.TextureImage = new ƒ.TextureImage("../DoomAssets/DEM1_5.png");
    let mtrFloor: ƒ.Material = new ƒ.Material("Floor", ƒ.ShaderTexture, new ƒ.CoatTextured(null, txtFloor));
    let floor: ƒaid.Node = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
    floor.mtxLocal.scale(ƒ.Vector3.ONE(20));
    floor.getComponent(ƒ.ComponentMaterial).pivot.scale(ƒ.Vector2.ONE(10));

    root.appendChild(floor);
    
    let txtWall: ƒ.TextureImage = new ƒ.TextureImage("../DoomAssets/CEMPOIS.png");
    let mtrWall: ƒ.Material = new ƒ.Material("Wall", ƒ.ShaderTexture, new ƒ.CoatTextured(null, txtWall));
    let wall: ƒaid.Node = new ƒaid.Node("Wall", ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(1)), mtrWall, meshQuad);
    wall.mtxLocal.scale(ƒ.Vector3.ONE(2));
    wall.getComponent(ƒ.ComponentMaterial).pivot.scale(ƒ.Vector2.ONE(1));
    
    root.appendChild(wall);
    root.addChild(avatar);

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", root, cam.cmpCamera, canvas);

    ƒ.Loop.addEventListener( ƒ.EVENT.LOOP_FRAME, hndLoop);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 60);
  }

  function hndLoop(_event: Event): void {
    cam.hndKeyboardControls();
    viewport.draw();
  }
}