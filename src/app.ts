import {Draw} from "./Draw";
import {GrabData} from './grabData';
import {PluginOptions} from "./models/PluginOptions";
import {CalculateData} from "./calculateData";
export class App {
    constructor(private options: PluginOptions) {
        console.log('opt', options);

        var grabData = new GrabData(options);

        let paperSize = grabData.getPaperSize();
        let getMaxDrawArea = grabData.getMaxDrawArea();

        let calculateData = new CalculateData(
            (<any>Object).assign(options,
                {paperSize: paperSize},
                {maxDrawArea: getMaxDrawArea}
            )
        );

        let grabbedData = grabData.grabData();

        let drawData: any = {
            canvasOptions: this.options.canvasOptions,
            badge: {
                width: grabbedData.width,
                height: grabbedData.height,
                contentPosition: grabbedData.contentPosition,
                leftMargin: grabbedData.leftMargin,
                topMargin: grabbedData.topMargin,
                bottomBadgeMargin: grabbedData.bottomBadgeMargin,
                rightBadgeMargin: grabbedData.rightBadgeMargin
            },
            paperSize: grabData.getPaperSize(),
            maxDrawArea: grabData.getMaxDrawArea()
        };

        var draw = new Draw(drawData, calculateData.calculateData());
        draw.drawAll();
    }
}