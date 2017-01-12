import {PluginConfig} from "./services/pluginConfig";
import {DataToDraw} from "./models/dataToDraw";
export class Draw {
    constructor(private options: PluginConfig, private dataToDraw: DataToDraw) {
        console.log('dataToDraw', dataToDraw);
    }

    canvas: any = document.createElement('canvas');
    ctx: any = this.canvas.getContext("2d");

    drawAll() {
        this.drawCanvas();

        this.drawPaper(
            this.options.canvasOptions.width / 2 - this.dataToDraw.paperSize.width / 2,
            this.options.canvasOptions.height / 2 - this.dataToDraw.paperSize.height / 2,
            this.dataToDraw.paperSize.width,
            this.dataToDraw.paperSize.height,
            this.options.canvasOptions.paperBackground);
    }

    private drawCanvas() {
        console.log('drawCanvas');


        $(document).find(this.options.canvasOptions.selector).append(this.canvas);

        this.canvas.width = this.options.canvasOptions.width;
        this.canvas.height = this.options.canvasOptions.height;


        this.ctx.fillStyle = this.options.canvasOptions.canvasBackground;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);



        $(document).on('change', '#badge_form', function () {
            console.log('change');
        })
    }

    private drawPaper(x: number, y: number, width: number, height: number, fill: string) {
        this.drawShape(x, y, width, height, fill);
    }



    private drawShape(x: number, y: number, w: number, h: number, fill: string) {
        this.ctx.fillStyle = fill;
        this.ctx.fillRect(x, y, w, h);
    }
}