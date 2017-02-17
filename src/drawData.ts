export class DrawData {
    k: number;
    x: number;
    y: number;

    offsetX: number; // this makes offset horizontally between two badges including spacing between them
    offsetY: number; // this makes offset vertically between two badges including spacing between them
    countX: number; // we use this as counter inside loop while drawing badges
    countY: number;

    maxBadgeCountByVertical: number;
    maxBadgeCountByHorizontal: number;

    constructor(private dataToDraw: any) {
        // console.log('dataToDraw', dataToDraw);

        this.k = dataToDraw.paperSizeToAdapt.k;

        this.x = this.dataToDraw.maxDrawArea.width / 2 - this.dataToDraw.paperSizeToAdapt.width / 2 + this.dataToDraw.canvasOptions.borderSpace;
        this.y = this.dataToDraw.maxDrawArea.height / 2 - this.dataToDraw.paperSizeToAdapt.height / 2 + this.dataToDraw.canvasOptions.borderSpace;

        this.maxBadgeCountByVertical = this.calculateMaxNumberOfBadgesByHeight(
            this.dataToDraw.paperSize.height,
            this.dataToDraw.badge.topMargin,
            this.dataToDraw.canvasOptions.borders.marginBottomToPrint,
            this.dataToDraw.badge.height,
            this.dataToDraw.badge.bottomBadgeMargin
        );

        this.maxBadgeCountByHorizontal = this.calculateMaxNumberOfBadgesByWidth(
            this.dataToDraw.paperSize.width,
            this.dataToDraw.badge.leftMargin,
            this.dataToDraw.canvasOptions.borders.marginRightToPrint,
            this.dataToDraw.badge.width,
            this.dataToDraw.badge.rightBadgeMargin
        );

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
            this.calculateBadgePositionX(),
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
        this.offsetX = 0;
        for (this.countX = 1; this.countX <= this.dataToDraw.badge.columnsCount; this.countX ++) {
            if (this.countX <= this.maxBadgeCountByHorizontal) {
                this.drawBorder(
                    this.calculateRightMarginRulerPositionX(),
                    0,
                    this.calculateRightMarginRulerPositionX(),
                    this.dataToDraw.paperSizeToAdapt.height / this.k,
                    this.dataToDraw.canvasOptions.borders.rulers,
                    [5, 3]
                );
                this.offsetX += (this.dataToDraw.badge.width + this.dataToDraw.badge.rightBadgeMargin);
            }
        }

        // drawBottomRuler
        this.offsetY = 0;
        for (this.countY = 1; this.countY <= this.maxBadgeCountByVertical; this.countY ++) {
        this.drawBorder(
            0,
            this.dataToDraw.badge.topMargin + this.dataToDraw.badge.height + this.offsetY,
            this.dataToDraw.paperSizeToAdapt.width / this.k,
            this.dataToDraw.badge.topMargin + this.dataToDraw.badge.height + this.offsetY,
            this.dataToDraw.canvasOptions.borders.rulers,
            [5, 3]
        );
            this.offsetY += (this.dataToDraw.badge.height + this.dataToDraw.badge.bottomBadgeMargin);
        }

        // drawRightBorderMargin
        this.offsetX = 0;
        // draw border on last column of badges if they are centered
        if(this.dataToDraw.badge.contentPosition === 'center') {
            this.countX = 0;
        } else {
            this.countX = 1;
        }
        for (this.countX; this.countX < this.dataToDraw.badge.columnsCount; this.countX ++) {
            if (this.countX < this.maxBadgeCountByHorizontal) {
                this.drawBorder(
                    this.calculateRightRulerPositionX(),
                    0,
                    this.calculateRightRulerPositionX(),
                    this.dataToDraw.paperSizeToAdapt.height / this.k,
                    this.dataToDraw.canvasOptions.borders.rulers,
                    [5, 3]
                );
                this.offsetX += (this.dataToDraw.badge.width + this.dataToDraw.badge.rightBadgeMargin);
            }
        }

        // drawBottomBorderMargin
        this.offsetY = 0;
        for (this.countY = 1; this.countY < this.maxBadgeCountByVertical; this.countY ++) {
            this.drawBorder(
                0,
                this.dataToDraw.badge.topMargin + this.dataToDraw.badge.height + this.offsetY + this.dataToDraw.badge.bottomBadgeMargin,
                this.dataToDraw.paperSizeToAdapt.width / this.k,
                this.dataToDraw.badge.topMargin + this.dataToDraw.badge.height + this.offsetY + this.dataToDraw.badge.bottomBadgeMargin,
                this.dataToDraw.canvasOptions.borders.rulers,
                [5, 3]
            );
            this.offsetY += (this.dataToDraw.badge.height + this.dataToDraw.badge.bottomBadgeMargin);
        }

        this.drawInfoPanelHTML(
            this.dataToDraw.canvasOptions.infoPanel.texts.maxColumnsNumber + ': ' + '<span style="font-weight: bold">' + this.checkForValidData(this.maxBadgeCountByHorizontal) + '</span>',
            this.dataToDraw.canvasOptions.infoPanel.texts.maxRowsNumber + ': ' + '<span style="font-weight: bold">' + this.checkForValidData(this.maxBadgeCountByVertical) + '</span>',
            this.dataToDraw.canvasOptions.infoPanel.texts.badgesQuantity + ': ' + '<span style="font-weight: bold">' + this.checkForValidData(this.maxBadgeCountByVertical *
                this.dataToDraw.badge.columnsCount) + ' / ' + this.checkForValidData(this.maxBadgeCountByHorizontal * this.maxBadgeCountByVertical) + '</span>'
        );
    }

    private drawCanvas() {
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
        this.offsetY = 0;
        this.offsetX = 0;

        for (this.countY = 1; this.countY <= this.maxBadgeCountByVertical; this.countY ++) {
            for (this.countX = 1; this.countX <= this.dataToDraw.badge.columnsCount; this.countX ++) {
                if(this.countX <= this.maxBadgeCountByHorizontal) {
                    this.drawShape(x + this.offsetX, y + this.offsetY, width, height, fill); // do not allow to draw more badges, than width allows
                }
                this.offsetX += (this.dataToDraw.badge.rightBadgeMargin + this.dataToDraw.badge.width);
            }
            this.offsetX = 0; // reset offset by X after every iteration
            this.offsetY += (this.dataToDraw.badge.bottomBadgeMargin + this.dataToDraw.badge.height);
        }

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

    // Here we calculate how much badges we can draw vertically
    private calculateMaxNumberOfBadgesByHeight(
        paperHeight: number,
        topMargin: number,
        marginBottomToPrint: number,
        badgeHeight: number,
        bottomBadgeMargin: number
    ) {
        // we add bottomBadgeMargin here in first part because we want to ignore adding bottomBadgeMargin on last iteration
        return Math.floor((paperHeight - topMargin - marginBottomToPrint + bottomBadgeMargin) / (badgeHeight + bottomBadgeMargin));
    }

    private calculateMaxNumberOfBadgesByWidth(
        paperWidth: number,
        leftMargin: number,
        marginRightToPrint: number,
        badgeWidth: number,
        rightBadgeMargin: number
    ) {
        return Math.floor((paperWidth - leftMargin - marginRightToPrint + rightBadgeMargin) / (badgeWidth + rightBadgeMargin));
    }

    private calculateBadgePositionX() {
        // we can calculate here the badge x position
        if(this.dataToDraw.badge.columnsCount > this.maxBadgeCountByHorizontal) {
            this.dataToDraw.badge.columnsCount = this.maxBadgeCountByHorizontal;
        }
        if(this.dataToDraw.badge.contentPosition === 'center') {
            return (this.dataToDraw.paperSizeToAdapt.width / this.k + this.dataToDraw.badge.leftMargin +
                this.dataToDraw.badge.rightBadgeMargin) / 2  - (this.dataToDraw.badge.width +
                this.dataToDraw.badge.rightBadgeMargin) / 2 * this.dataToDraw.badge.columnsCount
        } else {
            return this.dataToDraw.badge.leftMargin;
        }
    }

    private calculateRightMarginRulerPositionX () {
        if(this.dataToDraw.badge.columnsCount > this.maxBadgeCountByHorizontal) {
            this.dataToDraw.badge.columnsCount = this.maxBadgeCountByHorizontal;
        }
        if(this.dataToDraw.badge.contentPosition === 'center') {
            return ((this.dataToDraw.paperSizeToAdapt.width / this.k + this.dataToDraw.badge.leftMargin +
                this.dataToDraw.badge.rightBadgeMargin) / 2  - (this.dataToDraw.badge.width +
                this.dataToDraw.badge.rightBadgeMargin) / 2 * this.dataToDraw.badge.columnsCount) + this.offsetX;

        } else {
            return this.dataToDraw.badge.leftMargin + this.dataToDraw.badge.width + this.offsetX;
        }
    }

    private calculateRightRulerPositionX() {
        if(this.dataToDraw.badge.contentPosition === 'center') {

            return ((this.dataToDraw.paperSizeToAdapt.width / this.k + this.dataToDraw.badge.leftMargin +
                this.dataToDraw.badge.rightBadgeMargin) / 2  - (this.dataToDraw.badge.width +
                this.dataToDraw.badge.rightBadgeMargin) / 2 * this.dataToDraw.badge.columnsCount) +
                this.offsetX + this.dataToDraw.badge.width;
        } else {
            return this.dataToDraw.badge.leftMargin + this.dataToDraw.badge.width + this.offsetX + this.dataToDraw.badge.rightBadgeMargin;
        }
    }

    private drawInfoPanelHTML(maxColumnsNumberText: string, maxRowsNumberText: string, badgesQuantityText: string) {
        var infoPanelHTML = [
            '<div class="infoPanel" style="background: #ffefd3; width: '+this.dataToDraw.canvasOptions.width+"px"+'">',
                '<table width="100%" style="font-size: 11px; color: #b47301; font-family: Arial; text-transform: uppercase">',
                    '<tr>',
                        '<td align="center">'+maxColumnsNumberText+'</td>',
                        '<td align="center">'+maxRowsNumberText+'</td>',
                        '<td align="center">'+badgesQuantityText+'</td>',
                    '</tr>',
                '</table>',
            '</div>'
        ].join('');
        var canvasContainer = $(this.dataToDraw.canvasOptions.selector);
        if(!canvasContainer.find('.infoPanel').length) {
            $(canvasContainer).append(infoPanelHTML);
        }
    }

    drawErrorText(text: string) {
        var textHTML = [
            '<div class="errorBox" style="height: '+this.dataToDraw.canvasOptions.height+"px"+'; background: '+this.dataToDraw.canvasOptions.canvasBackground+'">',
                '<table style="height: 100%; width: 100%">',
                    '<tr>',
                        '<td align="center"><div style="color: #6f6f6f">'+text+'</div></td>',
                    '</tr>',
                '</table>',
            '</div>'
        ].join('');
        var canvasContainer = $(this.dataToDraw.canvasOptions.selector);
        if(!canvasContainer.find('.errorBox').length) {
            $(canvasContainer).append(textHTML);
        }
    }

    private checkForValidData(val) {
        return (val > 0 && val) ? val : 0;
    }

}