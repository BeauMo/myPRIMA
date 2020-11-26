"use strict";
var L08_Doom_Design;
(function (L08_Doom_Design) {
    var f = FudgeCore;
    var ƒaid = FudgeAid;
    window.addEventListener("load", hndLoad);
    let avatar = new f.Node("Avatar");
    let enemy1;
    let cam = new L08_Doom_Design.FreeCam(avatar);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        let root = new f.Node("Root");
        let meshQuad = new f.MeshQuad("Quad");
        let txtFloor = new f.TextureImage("../DoomAssets/DEM1_5.png");
        let mtrFloor = new f.Material("Floor", f.ShaderTexture, new f.CoatTextured(null, txtFloor));
        let floor = new ƒaid.Node("Floor", f.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
        floor.mtxLocal.scale(f.Vector3.ONE(20));
        floor.getComponent(f.ComponentMaterial).pivot.scale(f.Vector2.ONE(10));
        root.appendChild(floor);
        let txtWall = new f.TextureImage("../DoomAssets/CEMPOIS.png");
        let mtrWall = new f.Material("Wall", f.ShaderTexture, new f.CoatTextured(null, txtWall));
        let wall = new ƒaid.Node("Wall", f.Matrix4x4.TRANSLATION(f.Vector3.Y(1)), mtrWall, meshQuad);
        let wall2 = new ƒaid.Node("Wall2", f.Matrix4x4.TRANSLATION(f.Vector3.Y(1)), mtrWall, meshQuad);
        wall2.mtxLocal.translateX(2);
        wall.mtxLocal.scale(f.Vector3.ONE(2));
        wall2.mtxLocal.scale(f.Vector3.ONE(2));
        wall.getComponent(f.ComponentMaterial).pivot.scale(f.Vector2.ONE(1));
        root.appendChild(wall);
        root.appendChild(wall2);
        root.addChild(avatar);
        enemy1 = new L08_Doom_Design.Enemy("Enemy1", new f.Vector3(1, 0, 1), f.Vector2.ONE(2.0));
        root.appendChild(enemy1);
        L08_Doom_Design.viewport = new f.Viewport();
        L08_Doom_Design.viewport.initialize("Viewport", root, cam.cmpCamera, canvas);
        canvas.addEventListener("mousemove", cam.hndMouse);
        canvas.addEventListener("click", canvas.requestPointerLock);
        L08_Doom_Design.pivotMarker(root);
        console.log(root);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 60);
    }
    function hndLoop(_event) {
        cam.hndControls();
        L08_Doom_Design.viewport.draw();
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
})(L08_Doom_Design || (L08_Doom_Design = {}));
//# sourceMappingURL=Main.js.map