import {PluginData} from "./models/pluginData";
import {PluginOptions} from "./models/pluginOptions";
export class CalculateData {
    constructor(private dataToCalculate: any) {}

    calculateData() {
        console.log('calculateData', this.dataToCalculate);


        console.log('paperSizeToAdapt', this.sizeToAdapt(
            this.dataToCalculate.paperSize.width,
            this.dataToCalculate.paperSize.height,
            this.dataToCalculate.maxDrawArea.width,
            this.dataToCalculate.maxDrawArea.height,
        ));

        (<any>Object).assign(this.dataToCalculate,
            {
                'paperSizeToAdapt': this.sizeToAdapt(
                    this.dataToCalculate.paperSize.width,
                    this.dataToCalculate.paperSize.height,
                    this.dataToCalculate.maxDrawArea.width,
                    this.dataToCalculate.maxDrawArea.height,
                )
            });

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
        if(this.getRatio(paperWidth, paperHeight) < 1) {
            return {
                height: maxDrawHeight,
                width: (this.getRatio(paperWidth, paperHeight) * maxDrawHeight).toFixed(2),
                ratio: (this.getRatio(paperWidth, paperHeight)).toFixed(2)
            };
        } else if(this.getRatio(paperWidth, paperHeight) > 1) {
            return {
                height: (maxDrawWidth / this.getRatio(paperWidth, paperHeight)).toFixed(2),
                width: maxDrawWidth,
                ratio: (this.getRatio(paperWidth, paperHeight)).toFixed(2)
            };
        } else {
            return {
                height: maxDrawHeight,
                width: maxDrawWidth,
                ratio: 1
            }
        }
    }
}