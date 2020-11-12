namespace L07_Doom_Start {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);
    export let viewport: ƒ.Viewport;

    let root: ƒ.Node = new ƒ.Node("Root");
    let floor1: ƒ.Node = new ƒ.Node("Floor1");
    let wall1: Walls = new Walls("Wall1", new ƒ.Vector3(0,0,0), new ƒ.Vector2(2,2));
    let wall2: Walls = new Walls("Wall2", new ƒ.Vector3(1,0,0), new ƒ.Vector2(2,2));
    let wall3: Walls = new Walls("Wall3", new ƒ.Vector3(2,0,0), new ƒ.Vector2(2,2));
    let wall4: Walls = new Walls("Wall4", new ƒ.Vector3(3,0,0), new ƒ.Vector2(2,2));

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        //ƒ.Debug.log(canvas);

        let mesh: ƒ.MeshQuad = new ƒ.MeshQuad();
        let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
        floor1.addComponent(cmpMesh);
        
        let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("BLUE")));
        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        floor1.addComponent(cmpMaterial);

        floor1.addComponent(new ƒ.ComponentTransform());
        cmpMesh.pivot.scale(new ƒ.Vector3(15,2,2));
        floor1.mtxLocal.rotateX(-90);

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(20);
        cmpCamera.pivot.rotateY(180);
        cmpCamera.pivot.rotateX(10);

        cmpCamera.pivot.translateY(3);

        wall1.mtxLocal.translateX(-2);

        floor1.addChild(wall1);
        floor1.addChild(wall2);
        floor1.addChild(wall3);
        floor1.addChild(wall4);
        
        root.addChild(floor1);

        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        ƒ.Debug.log(viewport);

        viewport.draw();
    }
}