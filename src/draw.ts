export class Draw {
    k: number;
    x: number;
    y: number;

    constructor(private dataToDraw: any) {
        console.log('dataToDraw', dataToDraw);

        this.k = dataToDraw.paperSizeToAdapt.k;

        this.x = this.dataToDraw.maxDrawArea.width / 2 - this.dataToDraw.paperSizeToAdapt.width / 2 + this.dataToDraw.canvasOptions.borderSpace;
        this.y = this.dataToDraw.maxDrawArea.height / 2 - this.dataToDraw.paperSizeToAdapt.height / 2 + this.dataToDraw.canvasOptions.borderSpace;
    }

    canvas: any = document.createElement('canvas');
    ctx: any = this.canvas.getContext("2d");

    drawAll() {
        this.drawCanvas();

        this.drawPaper(
            0, //paper top corner x
            0, //paper top corner y
            this.dataToDraw.paperSizeToAdapt.width,
            this.dataToDraw.paperSizeToAdapt.height,
            this.dataToDraw.canvasOptions.paperBackground,
            this.k
        );

        this.drawBadge(
            0, //badge top corner x
            0, //badge top corner y

            this.dataToDraw.badge.width,
            this.dataToDraw.badge.height,

            this.dataToDraw.canvasOptions.badgeBackground,
            this.k
        );
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
            this.prepareSize(w),
            this.prepareSize(h)
        );
    }

    private prepareX(n: number): number {
        return (n * this.k) + this.x;
    }
    private prepareY(n: number): number {
        return (n * this.k) + this.y;
    }
    private prepareSize(n: number): number {
        return n * this.k;
    }

}