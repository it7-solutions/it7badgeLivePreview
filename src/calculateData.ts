import {PluginData} from "./models/pluginData";
export class CalculateData {
    constructor(private dataToCalculate: PluginData) {
        console.log('dataToCalculate', dataToCalculate);
    }

    calculateData() {
        console.log('calculateData');
    }
}