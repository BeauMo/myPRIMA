namespace L08_Doom_Design {
    import ƒ = FudgeCore;

    export class FreeCam {
        
        private cntKeyHorizontal: ƒ.Control;
        private cntKeyVertical: ƒ.Control;

        public cmpCamera;
        private avatar: ƒ.Node;

        private avatarVelocity: ƒ.Vector3;
        
        public constructor(avatar: ƒ.Node){
            
            this.cntKeyHorizontal = new ƒ.Control("Keyboard", 1, ƒ.CONTROL_TYPE.PROPORTIONAL, true);
            this.cntKeyVertical = new ƒ.Control("Keyboard", 4, ƒ.CONTROL_TYPE.PROPORTIONAL, true);

            this.avatar = avatar;
            this.cmpCamera = new ƒ.ComponentCamera();

            this.avatar.addComponent(new ƒ.ComponentTransform());

            this.cmpCamera.pivot.translateY(1.5);
            this.cmpCamera.pivot.rotateY(180);
            this.cmpCamera.backgroundColor = ƒ.Color.CSS("darkblue");

            this.avatar.addComponent(this.cmpCamera);

        }

        // public hndAvatar(): void {

        //     //let tempPos: ƒ.Vector3 = this.avatar.mtxLocal.translation;
        
        //     this.hndKeyboardControls();
        
        // }

        public hndKeyboardControls(): void {
            this.cntKeyVertical.setInput(
                ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])
              + ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])
            );
            this.cntKeyHorizontal.setInput(
                ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
              + ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])
            );

            this.avatarVelocity = ƒ.Vector3.Z(-this.cntKeyVertical.getOutput());
            let frameTime: number = ƒ.Loop.timeFrameGame / 1000;

            let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.avatarVelocity, frameTime);
            this.translate(distance);
            this.rotate(this.cntKeyHorizontal.getOutput());
        }

        // For und Zurücklaufen 
        private translate(_distance: ƒ.Vector3): void {
            this.avatar.mtxLocal.translate(_distance);
        }

        // drehen 
        private rotate(_degree: number): void {
            this.avatar.mtxLocal.rotateY(_degree);
        }
    }
}