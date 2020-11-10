"use strict";
var L04_BreakOut_Reflection;
(function (L04_BreakOut_Reflection) {
    var fc = FudgeCore;
    class GameObject extends fc.Node {
        constructor(_name, _position, _size) {
            super(_name);
            this.velocity = fc.Vector3.ZERO();
            this.rect = new fc.Rectangle(_position.x, _position.y, _size.x, _size.y, fc.ORIGIN2D.CENTER);
            this.addComponent(new fc.ComponentTransform(fc.Matrix4x4.TRANSLATION(_position.toVector3(0))));
            let cmpQuad = new fc.ComponentMesh(GameObject.meshQuad);
            this.addComponent(cmpQuad);
            cmpQuad.pivot.scale(_size.toVector3(0));
            let cMaterial = new fc.ComponentMaterial(GameObject.mtrSolidWhite);
            this.addComponent(cMaterial);
        }
        /**
         * move moves the game object and the collision detection reactangle
         */
        move() {
            let frame_time = fc.Time.game.getElapsedSincePreviousCall() / 1000;
            let distance = fc.Vector3.SCALE(this.velocity, frame_time);
            this.mtxLocal.translate(distance);
            this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxLocal.translation.x - this.rect.size.y / 2;
        }
    }
    GameObject.mtrSolidWhite = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("WHITE")));
    GameObject.meshQuad = new fc.MeshQuad();
    L04_BreakOut_Reflection.GameObject = GameObject;
})(L04_BreakOut_Reflection || (L04_BreakOut_Reflection = {}));
//# sourceMappingURL=GameObject.js.map