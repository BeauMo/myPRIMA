"use strict";
var L08_Doom_Design;
(function (L08_Doom_Design) {
    var ƒ = FudgeCore;
    class Walls extends ƒ.Node {
        //public rect: ƒ.Rectangle;
        constructor(_name, _position, _size) {
            super(_name);
            // this.rect = new ƒ.Rectangle(_position.x, _position.y, _size.x, _size.y, ƒ.ORIGIN2D.CENTER);
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position)));
            let cmpQuad = new ƒ.ComponentMesh(Walls.meshQuad);
            this.addComponent(cmpQuad);
            cmpQuad.pivot.scale(_size.toVector3(0));
            let cMaterial = new ƒ.ComponentMaterial(Walls.mtrSolidWhite);
            this.addComponent(cMaterial);
            this.mtxLocal.rotateX(90);
        }
    }
    Walls.mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("GREEN")));
    Walls.meshQuad = new ƒ.MeshQuad();
    L08_Doom_Design.Walls = Walls;
})(L08_Doom_Design || (L08_Doom_Design = {}));
//# sourceMappingURL=Walls.js.map