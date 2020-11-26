"use strict";
var L08_Doom_Design;
(function (L08_Doom_Design) {
    var f = FudgeCore;
    class FreeCam {
        constructor(avatar) {
            // public hndAvatar(): void {
            //     //let tempPos: ƒ.Vector3 = this.avatar.mtxLocal.translation;
            //     this.hndKeyboardControls();
            // }
            this.hndMouse = (_event) => {
                // console.log(_event.movementX, _event.movementY);
                // this.ctrRotationBuffer = this.ctrRotation.getOutput();
                // console.log(this);
                this.ctrRotation.setInput(_event.movementX);
            };
            this.ctrSpeedSide = new f.Control("AvatarSpeedSide", 8, 0 /* PROPORTIONAL */, true);
            this.ctrSpeed = new f.Control("AvatarSpeed", 8, 0 /* PROPORTIONAL */, true);
            this.ctrRotation = new f.Control("AvatarRotation", -0.1, 0 /* PROPORTIONAL */);
            this.avatar = avatar;
            this.cmpCamera = new f.ComponentCamera();
            this.avatar.addComponent(new f.ComponentTransform());
            this.cmpCamera.pivot.translateY(1.5);
            this.cmpCamera.pivot.rotateY(180);
            this.cmpCamera.backgroundColor = f.Color.CSS("darkblue");
            this.avatar.addComponent(this.cmpCamera);
        }
        hndControls() {
            this.ctrSpeed.setInput(f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.W, f.KEYBOARD_CODE.ARROW_UP])
                + f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.S, f.KEYBOARD_CODE.ARROW_DOWN]));
            this.ctrSpeedSide.setInput(f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT])
                + f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT]));
            // if(this.ctrRotationBuffer != this.ctrRotation.getOutput())
            this.avatar.mtxLocal.rotateY(this.ctrRotation.getOutput());
            this.ctrRotation.setInput(0);
            this.avatarVelocity = new f.Vector3(-this.ctrSpeedSide.getOutput(), 0, -this.ctrSpeed.getOutput());
            let frameTime = f.Loop.timeFrameGame / 1000;
            let distance = f.Vector3.SCALE(this.avatarVelocity, frameTime);
            this.translate(distance);
        }
        // Laufen
        translate(_distance) {
            this.avatar.mtxLocal.translate(_distance);
        }
    }
    L08_Doom_Design.FreeCam = FreeCam;
})(L08_Doom_Design || (L08_Doom_Design = {}));
//# sourceMappingURL=FreeCam.js.map