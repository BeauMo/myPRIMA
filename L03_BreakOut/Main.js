"use strict";
var L03_BreakOut;
(function (L03_BreakOut) {
    var fc = FudgeCore;
    window.addEventListener("load", sceneLoad);
    let root = new fc.Node("Root");
    let ball;
    let border = new fc.Node("Border");
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
        let mtrSolidBlack = new fc.Material("SolidBlack", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("BLACK")));
        let ballMaterial = new fc.ComponentMaterial(mtrSolidBlack);
        ball.addComponent(ballMaterial);
        border.addComponent(new fc.ComponentTransform());
        let meshBorder = new fc.MeshQuad();
        let cmpBorder = new fc.ComponentMesh(meshBorder);
        border.addComponent(cmpBorder);
        let borderMaterial = new fc.ComponentMaterial(mtrSolidWhite);
        border.addComponent(borderMaterial);
        border.getComponent(fc.ComponentMesh).pivot.scaleX(40);
        border.getComponent(fc.ComponentMesh).pivot.scaleY(26);
        root.addChild(ball);
        root.addChild(border);
        let cmpCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        cmpCamera.pivot.rotateX(10);
        cmpCamera.pivot.translateY(10);
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
        switch (detectHit(ball.cmpTransform.local.translation, border)) {
            case "Vertical":
                velocity.reflect(new fc.Vector3(0, -1, 0));
                console.log("Oben,Unten");
                break;
            case "Horizontal":
                velocity.reflect(new fc.Vector3(-1, 0, 0));
                console.log("Rechts,Links");
                break;
            case "None": break;
        }
        L03_BreakOut.viewport.draw();
    }
    function detectHit(_position, _node) {
        let sclRect = _node.getComponent(fc.ComponentMesh).pivot.scaling.copy;
        let posRect = _node.cmpTransform.local.translation.copy;
        let rect = new fc.Rectangle(posRect.x, posRect.y, sclRect.x, sclRect.y, fc.ORIGIN2D.CENTER);
        if (!rect.isInside(new fc.Vector2(0, _position.y)))
            return "Vertical";
        else if (!rect.isInside(new fc.Vector2(_position.x, 0)))
            return "Horizontal";
        else
            return "None";
    }
})(L03_BreakOut || (L03_BreakOut = {}));
//# sourceMappingURL=Main.js.map