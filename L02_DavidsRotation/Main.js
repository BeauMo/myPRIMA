"use strict";
var L02_DavidsRotation;
(function (L02_DavidsRotation) {
    var fc = FudgeCore;
    window.addEventListener("load", sceneLoad);
    let root = new fc.Node("Root");
    function sceneLoad(_event) {
        const canvas = document.querySelector("canvas");
        fc.Debug.log(canvas);
        root.addComponent(new fc.ComponentTransform());
        let quad = new fc.Node("Quad");
        let meshQuad = new fc.MeshQuad();
        let cmpQuad = new fc.ComponentMesh(meshQuad);
        quad.addComponent(cmpQuad);
        let mtrSolidWhite = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("WHITE")));
        let cMaterial = new fc.ComponentMaterial(mtrSolidWhite);
        quad.addComponent(cMaterial);
        root.addChild(quad);
        let torus = new fc.Node("Torus");
        let meshTorus = new fc.MeshTorus("Torus", 1, 10, 1);
        let cmpTorus = new fc.ComponentMesh(meshTorus);
        cmpTorus.pivot.translateX(0);
        cmpTorus.pivot.rotateZ(90);
        cmpTorus.pivot.rotateX(90);
        torus.addComponent(cmpTorus);
        let orange = new fc.Material("Orange", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("ORANGE")));
        let corange = new fc.ComponentMaterial(orange);
        torus.addComponent(corange);
        root.appendChild(torus);
        let cube = new fc.Node("Cube");
        let meshCube = new fc.MeshCube();
        let cmpCube = new fc.ComponentMesh(meshCube);
        let red = new fc.Material("Red", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("RED")));
        let cred = new fc.ComponentMaterial(red);
        cmpCube.pivot.scaleX(0.5);
        cmpCube.pivot.scaleY(0.5);
        torus.addComponent(corange);
        cube.addComponent(cmpCube);
        cube.addComponent(cred);
        root.appendChild(cube);
        let cmpCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(4);
        cmpCamera.pivot.rotateY(180);
        L02_DavidsRotation.viewport = new fc.Viewport();
        L02_DavidsRotation.viewport.initialize("Viewport", root, cmpCamera, canvas);
        // fc.Debug.log(viewport);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 30);
    }
    function hndLoop(_event) {
        console.log("Tick");
        //viewport.getGraph().getComponent(fc.ComponentTransform).local.rotateZ(1);
        //viewport.getGraph().cmpTransform.local.rotateZ(1);
        root.mtxLocal.rotateZ(1);
        L02_DavidsRotation.viewport.draw();
    }
})(L02_DavidsRotation || (L02_DavidsRotation = {}));
//# sourceMappingURL=Main.js.map