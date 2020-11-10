"use strict";
var L04_BreakOut_Reflection;
(function (L04_BreakOut_Reflection) {
    var fc = FudgeCore;
    window.addEventListener("load", sceneLoad);
    let root = new fc.Node("Root");
    let walls = new fc.Node("Walls");
    let ball;
    let velocity = new fc.Vector3(fc.Random.default.getRange(-1, 1), fc.Random.default.getRange(-1, 1), 0);
    let speed = 10;
    velocity.normalize(speed);
    function sceneLoad(_event) {
        const canvas = document.querySelector("canvas");
        //fc.Debug.log(canvas);
        root.addChild(walls);
        ball = new L04_BreakOut_Reflection.GameObject("Ball", new fc.Vector2(0, 0), new fc.Vector2(1, 1));
        walls.addChild(new L04_BreakOut_Reflection.GameObject("WallLeft", new fc.Vector2(-18, 0), new fc.Vector2(1, 25)));
        walls.addChild(new L04_BreakOut_Reflection.GameObject("WallLeft", new fc.Vector2(18, 0), new fc.Vector2(1, 25)));
        walls.addChild(new L04_BreakOut_Reflection.GameObject("WallLeft", new fc.Vector2(0, 12), new fc.Vector2(35, 1)));
        walls.addChild(new L04_BreakOut_Reflection.GameObject("WallLeft", new fc.Vector2(0, -12), new fc.Vector2(35, 1)));
        root.addChild(ball);
        let cmpCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        L04_BreakOut_Reflection.viewport = new fc.Viewport();
        L04_BreakOut_Reflection.viewport.initialize("Viewport", root, cmpCamera, canvas);
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
        ball.move();
        hndCollision();
        L04_BreakOut_Reflection.viewport.draw();
    }
    function hndCollision() {
        for (let wall of walls.getChildren()) {
            let intersection = ball.rect.getIntersection(wall.rect);
            if (intersection) {
                console.log("Ball collides");
                if (intersection.size.x > intersection.size.y)
                    ball.velocity.y *= -1;
                else
                    ball.velocity.x *= -1;
            }
        }
    }
})(L04_BreakOut_Reflection || (L04_BreakOut_Reflection = {}));
//# sourceMappingURL=Main.js.map