"use strict";
var L03_BreakOut;
(function (L03_BreakOut) {
    var fc = FudgeCore;
    window.addEventListener("load", sceneLoad);
    let root = new fc.Node("Root");
    let ball;
    let velocity = new fc.Vector3(fc.Random.default.getRange(-1, 1), fc.Random.default.getRange(-1, 1), 0);
    let speed = 10;
    velocity.normalize(speed);
    function sceneLoad(_event) {
        const canvas = document.querySelector("canvas");
        fc.Debug.log(canvas);
        ball = new fc.Node("Ball");
        ball.addComponent(new fc.ComponentTransform());
        let meshBall = new fc.MeshQuad();
        let cmpBall = new fc.ComponentMesh(meshBall);
        ball.addComponent(cmpBall);
        let mtrSolidWhite = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("WHITE")));
        let cMaterial = new fc.ComponentMaterial(mtrSolidWhite);
        ball.addComponent(cMaterial);
        root.addChild(ball);
        let cmpCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        L03_BreakOut.viewport = new fc.Viewport();
        L03_BreakOut.viewport.initialize("Viewport", root, cmpCamera, canvas);
        // fc.Debug.log(viewport);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 30);
    }
    function hndLoop(_event) {
        //console.log("Tick");
        //viewport.getGraph().getComponent(fc.ComponentTransform).local.rotateZ(1);
        //viewport.getGraph().cmpTransform.local.rotateZ(1);
        let frameTime = fc.Time.game.getElapsedSincePreviousCall() / 1000;
        let tmpVelocity = velocity.copy;
        tmpVelocity.scale(frameTime);
        ball.mtxLocal.translate(tmpVelocity);
        L03_BreakOut.viewport.draw();
    }
})(L03_BreakOut || (L03_BreakOut = {}));
//# sourceMappingURL=Main.js.map