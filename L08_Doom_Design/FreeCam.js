"use strict";
var L08_Doom_Design;
(function (L08_Doom_Design) {
    var ƒ = FudgeCore;
    class FreeCam {
        constructor(avatar) {
            this.cntKeyHorizontal = new ƒ.Control("Keyboard", 1, 0 /* PROPORTIONAL */, true);
            this.cntKeyVertical = new ƒ.Control("Keyboard", 4, 0 /* PROPORTIONAL */, true);
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
        hndKeyboardControls() {
            this.cntKeyVertical.setInput(ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])
                + ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]));
            this.cntKeyHorizontal.setInput(ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
                + ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]));
            this.avatarVelocity = ƒ.Vector3.Z(-this.cntKeyVertical.getOutput());
            let frameTime = ƒ.Loop.timeFrameGame / 1000;
            let distance = ƒ.Vector3.SCALE(this.avatarVelocity, frameTime);
            this.translate(distance);
            this.rotate(this.cntKeyHorizontal.getOutput());
        }
        // For und Zurücklaufen 
        translate(_distance) {
            this.avatar.mtxLocal.translate(_distance);
        }
        // drehen 
        rotate(_degree) {
            this.avatar.mtxLocal.rotateY(_degree);
        }
    }
    L08_Doom_Design.FreeCam = FreeCam;
})(L08_Doom_Design || (L08_Doom_Design = {}));
//# sourceMappingURL=FreeCam.js.map