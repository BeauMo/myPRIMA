"use strict";
var L08_Doom_Design;
(function (L08_Doom_Design) {
    var f = FudgeCore;
    class Enemy extends f.Node {
        constructor(_name, _position, _size) {
            super(_name);
            let cmpQuad = new ƒ.ComponentMesh(Enemy.meshQuad);
            cmpQuad.pivot.scale(_size.toVector3(1));
            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));
            this.addComponent(cmpQuad);
            let cMaterial = new f.ComponentMaterial(Enemy.mtrEnemy);
            this.addComponent(cMaterial);
            this.mtxLocal.translateY(_size.y / 2);
            cMaterial.pivot.translateY(-0.0);
            //cmpQuad.pivot.rotateX(-90);
            //this.mtxLocal.rotateX(90);
        }
        faceTo(_node) {
            this.mtxLocal.showTo(_node.mtxLocal.translation);
        }
        walkTo() {
            this.mtxLocal.translateZ(0.07);
        }
    }
    Enemy.meshQuad = new f.MeshQuad("Quad");
    Enemy.txtEnemy = new f.TextureImage("../DoomAssets/Pinky.png");
    Enemy.mtrEnemy = new f.Material("Floor", f.ShaderTexture, new f.CoatTextured(null, Enemy.txtEnemy));
    L08_Doom_Design.Enemy = Enemy;
})(L08_Doom_Design || (L08_Doom_Design = {}));
//# sourceMappingURL=Enemy.js.map