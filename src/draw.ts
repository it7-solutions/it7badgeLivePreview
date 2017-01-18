import {PluginConfig} from "./services/pluginConfig";
import {DataToDraw} from "./models/dataToDraw";
export class Draw {
    k: number;
    x: number;
    y: number;

    constructor(private dataToDraw: any, private paperSizeToAdapt: any) {
        console.log('dataToDraw', dataToDraw);
        console.log('paperSizeToAdapt', paperSizeToAdapt);

        this.k = this.getRatio(
            this.dataToDraw.paperSize.width,
            this.dataToDraw.paperSize.height,
            this.dataToDraw.maxDrawArea.width,
            this.dataToDraw.maxDrawArea.height,
        );

        console.log('this.k', this.k);

        this.x = this.dataToDraw.maxDrawArea.width / 2 - this.paperSizeToAdapt.width / 2 + this.dataToDraw.canvasOptions.borderSpace;
        this.y = this.dataToDraw.maxDrawArea.height / 2 - this.paperSizeToAdapt.height / 2 + this.dataToDraw.canvasOptions.borderSpace;
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
            this.dataToDraw.canvasOptions.paperBackground,
            this.k
        );

        // TODO Continue....
            this.drawBadge(
                0, //badge top corner x
                0, //badge top corner y

                this.dataToDraw.badge.width , //badge width * ratio
                this.dataToDraw.badge.height , //badge height * ratio

                this.dataToDraw.canvasOptions.badgeBackground,
                this.k
            );

        // TODO end todo


    }

    private drawCanvas() {
        console.log('drawCanvas');


        $(document).find(this.dataToDraw.canvasOptions.selector).append(this.canvas);

        this.canvas.width = this.dataToDraw.canvasOptions.width;
        this.canvas.height = this.dataToDraw.canvasOptions.height;


        this.ctx.fillStyle = this.dataToDraw.canvasOptions.canvasBackground;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);



        $(document).on('change', '#badge_form', function () {
            console.log('change');
        })
    }

    private drawPaper(x: number, y: number, width: number, height: number, fill: string, k: number) {
        this.drawShape(x, y, width / k, height / k, fill, k);
    }

    private drawBadge(x: number, y: number, width: number, height: number, fill: string, k: number) {
        this.drawShape(x, y, width , height , fill, k);
    }



    private drawShape(x: number, y: number, w: number, h: number, fill: string, k: number) {
        this.ctx.fillStyle = fill;
        this.ctx.fillRect(
            this.prepareX(x),
            this.prepareY(y),
            this.prepareSize(w) ,
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

    getRatio(paperWidth: number, paperHeight: number, maxDrawWidth: number, maxDrawHeight: number) {
        if(paperWidth / paperHeight < 1) {
            return maxDrawHeight / paperHeight;
        } else {
            return maxDrawWidth / paperWidth;
        }
    }


};