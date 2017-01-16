import {PluginData} from "./models/pluginData";
import {PluginOptions} from "./models/pluginOptions";
export class CalculateData {
    constructor(private dataToCalculate: any) {}

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
            this.dataToCalculate.maxDrawArea.width,
            this.dataToCalculate.maxDrawArea.height,
        )

    }

    private getRatio(paperWidth: number, paperHeight: number) {
        return  paperWidth / paperHeight;
    }


    sizeToAdapt(paperWidth: number, paperHeight: number, maxDrawWidth: number, maxDrawHeight: number) {

        return {
            height: paperHeight,
            width: paperWidth
        };


    }

}