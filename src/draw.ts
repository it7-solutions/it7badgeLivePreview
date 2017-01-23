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
            0 + this.dataToDraw.badge.leftMargin, //badge top corner x + margin left
            0 + this.dataToDraw.badge.topMargin, //badge top corner y + margin top

            this.dataToDraw.badge.width,
            this.dataToDraw.badge.height,

            this.dataToDraw.canvasOptions.badgeBackground
        );

        // Borders
        // drawTopBorder
        this.drawBorder(
            0,
            0 + this.dataToDraw.badge.topMargin,
            this.dataToDraw.paperSizeToAdapt.width / this.k,
            0 + this.dataToDraw.badge.topMargin,
            this.dataToDraw.canvasOptions.borders.top,
            [0, 0]
        );

        // drawLeftBorder
        this.drawBorder(
            0 + this.dataToDraw.badge.leftMargin,
            0,
            0 + this.dataToDraw.badge.leftMargin,
            this.dataToDraw.paperSizeToAdapt.height / this.k - this.dataToDraw.canvasOptions.borders.marginBottomToPrint,
            this.dataToDraw.canvasOptions.borders.left,
            [0, 0]
        );

        // drawRightBorder
        this.drawBorder(
            this.dataToDraw.paperSizeToAdapt.width / this.k - this.dataToDraw.canvasOptions.borders.marginRightToPrint,
            0,
            this.dataToDraw.paperSizeToAdapt.width / this.k - this.dataToDraw.canvasOptions.borders.marginRightToPrint,
            this.dataToDraw.paperSizeToAdapt.height / this.k - this.dataToDraw.canvasOptions.borders.marginBottomToPrint,
            this.dataToDraw.canvasOptions.borders.right,
            [0, 0]
        );

        // drawBottomBorder
        this.drawBorder(
            0,
            this.dataToDraw.paperSizeToAdapt.height / this.k - this.dataToDraw.canvasOptions.borders.marginBottomToPrint,
            this.dataToDraw.paperSizeToAdapt.width / this.k,
            this.dataToDraw.paperSizeToAdapt.height / this.k - this.dataToDraw.canvasOptions.borders.marginBottomToPrint,
            this.dataToDraw.canvasOptions.borders.bottom,
            [0, 0]
        );

        // Rulers
        // drawRightRuler
        this.drawBorder(
            this.dataToDraw.badge.leftMargin + this.dataToDraw.badge.width,
            0,
            this.dataToDraw.badge.leftMargin + this.dataToDraw.badge.width,
            this.dataToDraw.paperSizeToAdapt.height / this.k,
            this.dataToDraw.canvasOptions.borders.rulers,
            [5, 3]
        );

        // drawBottomRuler
        this.drawBorder(
            0,
            this.dataToDraw.badge.topMargin + this.dataToDraw.badge.height,
            this.dataToDraw.paperSizeToAdapt.width / this.k,
            this.dataToDraw.badge.topMargin + this.dataToDraw.badge.height,
            this.dataToDraw.canvasOptions.borders.rulers,
            [5, 3]
        );

        // drawRightBorderMargin
        this.drawBorder(
            this.dataToDraw.badge.leftMargin + this.dataToDraw.badge.width + this.dataToDraw.badge.rightBadgeMargin,
            0,
            this.dataToDraw.badge.leftMargin + this.dataToDraw.badge.width + this.dataToDraw.badge.rightBadgeMargin,
            this.dataToDraw.paperSizeToAdapt.height / this.k,
            this.dataToDraw.canvasOptions.borders.rulers,
            [5, 3]
        );

        // drawBottomBorderMargin
        this.drawBorder(
            0,
            this.dataToDraw.badge.topMargin + this.dataToDraw.badge.height + this.dataToDraw.badge.bottomBadgeMargin,
            this.dataToDraw.paperSizeToAdapt.width / this.k,
            this.dataToDraw.badge.topMargin + this.dataToDraw.badge.height + this.dataToDraw.badge.bottomBadgeMargin,
            this.dataToDraw.canvasOptions.borders.rulers,
            [5, 3]
        );

    }

    private drawCanvas() {
        console.log('drawCanvas');

        $(document).find(this.dataToDraw.canvasOptions.selector).append(this.canvas);

        this.canvas.width = this.dataToDraw.canvasOptions.width;
        this.canvas.height = this.dataToDraw.canvasOptions.height;

        this.ctx.fillStyle = this.dataToDraw.canvasOptions.canvasBackground;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private drawPaper(x: number, y: number, width: number, height: number, fill: string, k: number) {
        this.drawShape(x, y, width / k, height / k, fill);
    }

    private drawBadge(x: number, y: number, width: number, height: number, fill: string) {
        this.drawShape(x, y, width, height, fill);
    }

    private drawShape(x: number, y: number, w: number, h: number, fill: string) {
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

    private drawLine(xFrom: number, yFrom: number, xTo: number, yTo: number, fill: string, dash: any) {
        this.ctx.strokeStyle = fill;
        this.ctx.setLineDash(dash);
        this.ctx.beginPath();
        this.ctx.moveTo(xFrom, yFrom);
        this.ctx.lineTo(xTo, yTo);
        this.ctx.stroke();
    }

    private drawBorder(xFrom: number, yFrom: number, xTo: number, yTo: number, fill: string, dash: any) {
        this.drawLine(
            this.prepareX(xFrom),
            this.prepareY(yFrom),
            this.prepareX(xTo),
            this.prepareY(yTo),
            fill,
            dash
        );
    }

}