// namespace L06_BreakOut_Control {
//     import ƒ = FudgeCore;


//     export class Brick extends GameObject { 
//         private static readonly livecolors: string[] = ["#F7B538", "#DB7C26", "#D8572A", "#C32F27", "#8A1016" ];
//         private lives: number = 1;

//         public constructor(_name: string, _position: ƒ.Vector2, _size: ƒ.Vector2, _lives?: number, _color?: string) {
//             super(_name, _position, _size, _color );

//             if (_lives) {
//                 if (_lives <=  Brick.livecolors.length && _lives >= 1) {
//                     this.lives  = _lives;
//                     this.setcolor(Brick.livecolors[this.lives - 1]);
//                 }
//             }

//         }

//         public hit(): void {
//             this.lives--;
//             if (this.lives == 0) {
//                 this.getParent().removeChild(this);
//             }
//             this.setcolor(Brick.livecolors[this.lives - 1]);
//         }

        


//     }
// }