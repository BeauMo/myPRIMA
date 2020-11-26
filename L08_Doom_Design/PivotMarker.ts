namespace L08_Doom_Design {
    import f = FudgeCore;

    export function pivotMarker (root: f.Node){
        let pivotMarkers: f.Node = new f.Node("PivotMarkers")

        let elements = root.getChildren();

        for(let element of elements){

            let pivotMarker = new PivotMarker("PivotMarker");

            try{
                let coordPivot: f.Vector3 = element.mtxLocal.translation;

                pivotMarker.mtxLocal.translate(coordPivot);

                pivotMarkers.addChild(pivotMarker);
            }
            finally{
                continue;
            }
        }
        root.addChild(pivotMarkers);
    }

    export class PivotMarker extends f.Node {

        private meshCube: f.MeshCube = new f.MeshCube("Cube");
        private material: f.Material = new f.Material("SolidRed", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("RED")));
        private cmpCube: f.ComponentMesh = new f.ComponentMesh(this.meshCube);

        public constructor(_name: string){
            super(_name);

            this.addComponent(new f.ComponentTransform());
            this.addComponent(this.cmpCube);
            this.addComponent(new f.ComponentMaterial(this.material));
            this.cmpCube.pivot.scale(new f.Vector3(0.1,0.1,0.1));
        }
    }
}