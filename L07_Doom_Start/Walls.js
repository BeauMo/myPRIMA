"use strict";
var L07_Doom_Start;
(function (L07_Doom_Start) {
    var ƒ = FudgeCore;
    class Walls extends ƒ.Node {
        constructor(_name, _position, _size) {
            super(_name);
            this.rect = new ƒ.Rectangle(_position.x, _position.y, _size.x, _size.y, ƒ.ORIGIN2D.CENTER);
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
    L07_Doom_Start.Walls = Walls;
})(L07_Doom_Start || (L07_Doom_Start = {}));
//# sourceMappingURL=Walls.js.map