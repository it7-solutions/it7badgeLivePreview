export class CalculateData {
    k: number;

    constructor(private dataToCalculate: any) {

        this.k = this.getRatio(
            this.dataToCalculate.paperSize.width,
            this.dataToCalculate.paperSize.height,
            this.dataToCalculate.maxDrawArea.width,
            this.dataToCalculate.maxDrawArea.height,
        );

    }

    calculateData() {
        // console.log('calculateData!!', this.dataToCalculate);
        return this.sizeToAdapt(
            this.dataToCalculate.paperSize.width,
            this.dataToCalculate.paperSize.height,
            this.k
        )

    }

    sizeToAdapt(rectWidth: number, rectHeight: number, k: number) {
        return {
            height: rectHeight * k,
            width: rectWidth * k,
            k: k
        };
    }

    getRatio(paperWidth: number, paperHeight: number, maxDrawWidth: number, maxDrawHeight: number) : number {
        if(paperWidth / paperHeight < maxDrawWidth / maxDrawHeight) {
            return maxDrawHeight / paperHeight;
        } else {
            return maxDrawWidth / paperWidth;
        }
    }
}