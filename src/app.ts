import {Draw} from "./Draw";
import {GrabData} from './grabData';
import {PluginOptions} from "./models/PluginOptions";
import {CalculateData} from "./calculateData";
export class App {
    constructor(private options: PluginOptions) {
        var grabData = new GrabData(options);
        let fieldsData = grabData.grabData();
        let dataToDraw: any = grabData.dataToDraw();

        var calculateData = new CalculateData(fieldsData);
        calculateData.calculateData();

        var draw = new Draw(options, dataToDraw);
        draw.drawAll();
    }
}