"use strict";
var L10_Doom_Mouse;
(function (L10_Doom_Mouse) {
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
    L10_Doom_Mouse.pivotMarker = pivotMarker;
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
    L10_Doom_Mouse.PivotMarker = PivotMarker;
})(L10_Doom_Mouse || (L10_Doom_Mouse = {}));
//# sourceMappingURL=PivotMarker.js.map