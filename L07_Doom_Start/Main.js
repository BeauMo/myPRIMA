"use strict";
var L07_Doom_Start;
(function (L07_Doom_Start) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    let root = new ƒ.Node("Root");
    let floor1 = new ƒ.Node("Floor1");
    let wall1 = new L07_Doom_Start.Walls("Wall1", new ƒ.Vector3(0, 0, 0), new ƒ.Vector2(2, 2));
    let wall2 = new L07_Doom_Start.Walls("Wall2", new ƒ.Vector3(1, 0, 0), new ƒ.Vector2(2, 2));
    let wall3 = new L07_Doom_Start.Walls("Wall3", new ƒ.Vector3(2, 0, 0), new ƒ.Vector2(2, 2));
    let wall4 = new L07_Doom_Start.Walls("Wall4", new ƒ.Vector3(3, 0, 0), new ƒ.Vector2(2, 2));
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        //ƒ.Debug.log(canvas);
        let mesh = new ƒ.MeshQuad();
        let cmpMesh = new ƒ.ComponentMesh(mesh);
        floor1.addComponent(cmpMesh);
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("BLUE")));
        let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        floor1.addComponent(cmpMaterial);
        floor1.addComponent(new ƒ.ComponentTransform());
        cmpMesh.pivot.scale(new ƒ.Vector3(15, 2, 2));
        floor1.mtxLocal.rotateX(-90);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(20);
        cmpCamera.pivot.rotateY(180);
        cmpCamera.pivot.rotateX(10);
        cmpCamera.pivot.translateY(3);
        wall1.mtxLocal.translateX(-2);
        floor1.addChild(wall1);
        floor1.addChild(wall2);
        floor1.addChild(wall3);
        floor1.addChild(wall4);
        root.addChild(floor1);
        L07_Doom_Start.viewport = new ƒ.Viewport();
        L07_Doom_Start.viewport.initialize("Viewport", root, cmpCamera, canvas);
        ƒ.Debug.log(L07_Doom_Start.viewport);
        L07_Doom_Start.viewport.draw();
    }
})(L07_Doom_Start || (L07_Doom_Start = {}));
//# sourceMappingURL=Main.js.map