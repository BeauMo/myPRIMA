namespace L08_Doom_Design {
    import ƒ = FudgeCore;

    export class Walls extends ƒ.Node {
        private static readonly mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("GREEN")));
        private static readonly meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();

        //public rect: ƒ.Rectangle;

        public constructor(_name: string, _position: ƒ.Vector3, _size: ƒ.Vector2){
            super(_name);
            // this.rect = new ƒ.Rectangle(_position.x, _position.y, _size.x, _size.y, ƒ.ORIGIN2D.CENTER);

            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position)))
            let cmpQuad: ƒ.ComponentMesh = new ƒ.ComponentMesh(Walls.meshQuad);
            this.addComponent(cmpQuad);
            cmpQuad.pivot.scale(_size.toVector3(0));

            let cMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Walls.mtrSolidWhite);
            this.addComponent(cMaterial);

            this.mtxLocal.rotateX(90);

        }
    }
}