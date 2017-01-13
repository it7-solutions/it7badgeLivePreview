import {PluginData} from "./models/pluginData";
import {PluginOptions} from "./models/pluginOptions";
export class CalculateData {
    constructor(private dataToCalculate: PluginOptions) {}

    calculateData() {
        console.log('calculateData', (<any>Object).assign(this.dataToCalculate, {'test': 'test'}));

    }
}