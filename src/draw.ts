import {PluginConfig} from "./services/pluginConfig";
import {DataToDraw} from "./models/dataToDraw";
export class Draw {
    k: number;
    x: number;
    y: number;

    constructor(private options: PluginConfig, private dataToDraw: DataToDraw, private paperSizeToAdapt: any) {
        console.log('dataToDraw', dataToDraw);
        console.log('paperSizeToAdapt!!', paperSizeToAdapt);

        this.k = 1;
        this.x = this.dataToDraw.maxDrawArea.width / 2 - this.paperSizeToAdapt.width / 2 + this.options.canvasOptions.borderSpace;
        this.y = this.dataToDraw.maxDrawArea.height / 2 - this.paperSizeToAdapt.height / 2 + this.options.canvasOptions.borderSpace;
    }

    canvas: any = document.createElement('canvas');
    ctx: any = this.canvas.getContext("2d");

    drawAll() {
        this.drawCanvas();

        this.drawPaper(
            0, //paper top corner x
            0, //paper top corner y
            this.paperSizeToAdapt.width,
            this.paperSizeToAdapt.height,
            this.options.canvasOptions.paperBackground
        );

        // TODO Continue....
            this.drawBadge(
                0, //badge top corner x
                0, //badge top corner y

                this.options.width , //badge width * ratio
                this.options.height , //badge height * ratio

                this.options.canvasOptions.badgeBackground
            );

        // TODO end todo


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

    private drawBadge(x: number, y: number, width: number, height: number, fill: string) {
        this.drawShape(x, y, width, height, fill);
    }



    private drawShape(x: number, y: number, w: number, h: number, fill: string) {
        // console.log('args', arguments);
        this.ctx.fillStyle = fill;
        this.ctx.fillRect(
            this.prepareX(x),
            this.prepareY(y),
            this.prepareSize(w),
            this.prepareSize(h)
        );
    }

    private prepareX(n: number): number {
        // console.log('prepareX', n, this.k, this.x,(n * this.k) + this.x)
        return (n * this.k) + this.x;
    }
    private prepareY(n: number): number {
        // console.log('prepareY', n, this.k, this.y,(n * this.k) + this.y)
        return (n * this.k) + this.y;
    }
    private prepareSize(n: number): number {
        // console.log('prepareSize', n, this.k, this.y,n * this.k)
        return n * this.k;
    }


    // sizeToAdapt(paperWidth: number, paperHeight: number, maxDrawWidth: number, maxDrawHeight: number) {
    //     if(this.getRatio(paperWidth, paperHeight) < 1) {
    //         return {
    //             height: maxDrawHeight,
    //             width: (this.getRatio(paperWidth, paperHeight) * maxDrawHeight).toFixed(2),
    //             ratio: (this.getRatio(paperWidth, paperHeight)).toFixed(2)
    //         };
    //     } else if(this.getRatio(paperWidth, paperHeight) > 1) {
    //         return {
    //             height: (maxDrawWidth / this.getRatio(paperWidth, paperHeight)).toFixed(2),
    //             width: maxDrawWidth,
    //             ratio: (this.getRatio(paperWidth, paperHeight)).toFixed(2)
    //         };
    //     } else {
    //         return {
    //             height: maxDrawHeight,
    //             width: maxDrawWidth,
    //             ratio: 1
    //         }
    //     }
    // }
    

};