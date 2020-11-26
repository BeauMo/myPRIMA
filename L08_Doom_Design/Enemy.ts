namespace L08_Doom_Design {
    import f = FudgeCore;

    export class Enemy extends f.Node {
        private static readonly meshQuad: f.MeshQuad = new f.MeshQuad("Quad");
        private static readonly txtEnemy: f.TextureImage = new f.TextureImage("../DoomAssets/Pinky.png");
        private static readonly mtrEnemy: f.Material = new f.Material("Floor", f.ShaderTexture, new f.CoatTextured(null, Enemy.txtEnemy));

        public constructor(_name: string, _position: f.Vector3, _size: f.Vector2){
            super(_name);

            let cmpQuad: ƒ.ComponentMesh = new ƒ.ComponentMesh(Enemy.meshQuad);
            cmpQuad.pivot.scale(_size.toVector3(1));

            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)))
            this.addComponent(cmpQuad);

            let cMaterial: f.ComponentMaterial = new f.ComponentMaterial(Enemy.mtrEnemy);
            this.addComponent(cMaterial);

            this.mtxLocal.translateY(_size.y/2);
            cMaterial.pivot.translateY(-0.0);

            //cmpQuad.pivot.rotateX(-90);

            //this.mtxLocal.rotateX(90);

        }

        public faceTo(_node: f.Node): void {
            this.mtxLocal.showTo(_node.mtxLocal.translation);
        }

        public walkTo(): void {
            this.mtxLocal.translateZ(0.07);
        }
    }
}