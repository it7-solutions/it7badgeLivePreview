import {Draw} from "./Draw";
import {GrabData} from './grabData';
import {PluginOptions} from "./models/PluginOptions";
import {CalculateData} from "./calculateData";
export class App {
    constructor(private options: PluginOptions) {
        console.log('opt', options);

        var grabData = new GrabData(options);
        // let fieldsData = grabData.grabData();
        let dataToDraw: any = grabData.dataToDraw();


        let paperSize = grabData.getPaperSize();
        let getMaxDrawArea = grabData.getMaxDrawArea();

        let calculateData = new CalculateData(
            (<any>Object).assign(options,
                {paperSize: paperSize},
                {maxDrawArea: getMaxDrawArea}
            )
        );

        var draw = new Draw(options, dataToDraw, calculateData.calculateData());
        draw.drawAll();
    }
}