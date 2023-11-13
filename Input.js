export class Input {
    constructor() {
        this.horizontal = 0;
        this.vertical = 0;
    }

    update() {
        this.horizontal = 0;
        this.vertical = 0;
    }
}
var input = new Input();
onkeydown = onkeyup = change;
function change(e) {
    e = e;
    if(e.type == 'keydown')
    {
        switch (e.keyCode) {
            case 65:
                input.horizontal = -1;
                break;
            case 87:
                input.vertical = 1;
                break;
            case 83:
                input.vertical = -1;
                break;
            case 68:
                input.horizontal = 1;
                break;
        }
    }else{
        switch (e.keyCode) {
            case 65:
                input.horizontal = 0;
                break;
            case 87:
                input.vertical = 0;
                break;
            case 83:
                input.vertical = 0;
                break;
            case 68:
                input.horizontal = 0;
                break;
        }
    }
}
export {input};