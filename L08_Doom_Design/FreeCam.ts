namespace L08_Doom_Design {
    import f = FudgeCore;

    export class FreeCam {
        
        private ctrSpeedSide: f.Control;
        private ctrSpeed: f.Control;
        private ctrRotation: f.Control;

        public cmpCamera;
        public avatar: f.Node;
        
        // private ctrRotationBuffer: number;

        private avatarVelocity: f.Vector3;
        
        public constructor(avatar: f.Node){
            
            this.ctrSpeedSide = new f.Control("AvatarSpeedSide", 8, f.CONTROL_TYPE.PROPORTIONAL, true);
            this.ctrSpeed = new f.Control("AvatarSpeed", 8, f.CONTROL_TYPE.PROPORTIONAL, true);
            this.ctrRotation = new f.Control("AvatarRotation", -0.1, f.CONTROL_TYPE.PROPORTIONAL);

            this.avatar = avatar;
            this.cmpCamera = new f.ComponentCamera();

            this.avatar.addComponent(new f.ComponentTransform());

            this.cmpCamera.pivot.translateY(1.5);
            this.cmpCamera.pivot.rotateY(180);
            this.cmpCamera.backgroundColor = f.Color.CSS("darkblue");

            this.avatar.addComponent(this.cmpCamera);

        }

        // public hndAvatar(): void {

        //     //let tempPos: ƒ.Vector3 = this.avatar.mtxLocal.translation;
        
        //     this.hndKeyboardControls();
        
        // }

        public hndMouse = (_event: MouseEvent): void => {
            // console.log(_event.movementX, _event.movementY);
            // this.ctrRotationBuffer = this.ctrRotation.getOutput();
            // console.log(this);
            this.ctrRotation.setInput(_event.movementX);
        }

        public hndControls(): void {
            this.ctrSpeed.setInput(
                f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.W, f.KEYBOARD_CODE.ARROW_UP])
              + f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.S, f.KEYBOARD_CODE.ARROW_DOWN])
            );
            this.ctrSpeedSide.setInput(
                f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT])
              + f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT])
            );
            
            // if(this.ctrRotationBuffer != this.ctrRotation.getOutput())
            this.avatar.mtxLocal.rotateY(this.ctrRotation.getOutput());
            this.ctrRotation.setInput(0);

            this.avatarVelocity = new f.Vector3(-this.ctrSpeedSide.getOutput(), 0, -this.ctrSpeed.getOutput());
            let frameTime: number = f.Loop.timeFrameGame / 1000;

            let distance: f.Vector3 = f.Vector3.SCALE(this.avatarVelocity, frameTime);
            this.translate(distance);
        }

        // Laufen
        private translate(_distance: f.Vector3): void {
            this.avatar.mtxLocal.translate(_distance);
        }
    }
}