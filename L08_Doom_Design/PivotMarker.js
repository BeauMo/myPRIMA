"use strict";
var L08_Doom_Design;
(function (L08_Doom_Design) {
    var f = FudgeCore;
    function pivotMarker(root) {
        let pivotMarkers = new f.Node("PivotMarkers");
        let elements = root.getChildren();
        for (let element of elements) {
            let pivotMarker = new PivotMarker("PivotMarker");
            try {
                let coordPivot = element.mtxLocal.translation;
                pivotMarker.mtxLocal.translate(coordPivot);
                pivotMarkers.addChild(pivotMarker);
            }
            finally {
                continue;
            }
        }
        root.addChild(pivotMarkers);
    }
    L08_Doom_Design.pivotMarker = pivotMarker;
    class PivotMarker extends f.Node {
        constructor(_name) {
            super(_name);
            this.meshCube = new f.MeshCube("Cube");
            this.material = new f.Material("SolidRed", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("RED")));
            this.cmpCube = new f.ComponentMesh(this.meshCube);
            this.addComponent(new f.ComponentTransform());
            this.addComponent(this.cmpCube);
            this.addComponent(new f.ComponentMaterial(this.material));
            this.cmpCube.pivot.scale(new f.Vector3(0.1, 0.1, 0.1));
        }
    }
    L08_Doom_Design.PivotMarker = PivotMarker;
})(L08_Doom_Design || (L08_Doom_Design = {}));
//# sourceMappingURL=PivotMarker.js.map