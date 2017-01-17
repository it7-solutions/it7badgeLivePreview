import {PluginData} from "./models/pluginData";
import {PluginOptions} from "./models/pluginOptions";
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
        console.log('calculateData', this.dataToCalculate);


        // console.log('paperSizeToAdapt', this.sizeToAdapt(
        //     this.dataToCalculate.paperSize.width,
        //     this.dataToCalculate.paperSize.height,
        //     this.dataToCalculate.maxDrawArea.width,
        //     this.dataToCalculate.maxDrawArea.height,
        // ));

        // (<any>Object).assign(this.dataToCalculate,
        //     {
        //         'paperSizeToAdapt': this.sizeToAdapt(
        //             this.dataToCalculate.paperSize.width,
        //             this.dataToCalculate.paperSize.height,
        //             this.dataToCalculate.maxDrawArea.width,
        //             this.dataToCalculate.maxDrawArea.height,
        //         )
        //     });

        return this.sizeToAdapt(
            this.dataToCalculate.paperSize.width,
            this.dataToCalculate.paperSize.height,
            this.k
        )

    }

    sizeToAdapt(rectWidth: number, rectHeight: number, k: number) {
        // if()
        return {
            height: rectHeight * k,
            width: rectWidth * k
        };


    }

    private getRatio(paperWidth: number, paperHeight: number, maxDrawWidth: number, maxDrawHeight: number) {
        if(paperWidth / paperHeight < 1) {
            return maxDrawHeight / paperHeight;
        } else {
            return maxDrawWidth / paperWidth;
        }
    }

    // getRatio(paperWidth: number, paperHeight: number, maxDrawWidth: number, maxDrawHeight: number) {
    //     if(paperWidth / paperHeight < 1) {
    //         if(maxDrawHeight / paperHeight === 1) {
    //             return 1;
    //         } else if(maxDrawHeight / paperHeight < 1) {
    //             return 1 / (maxDrawHeight / paperHeight);
    //         } else {
    //             return maxDrawHeight / paperHeight;
    //         }
    //     } else {
    //         if(maxDrawWidth / paperWidth === 1) {
    //             return 1;
    //         } else if(maxDrawWidth / paperWidth < 1) {
    //             return 1 / (maxDrawWidth / paperWidth);
    //         } else {
    //             return maxDrawWidth / paperWidth;
    //         }
    //     }
    // }


}