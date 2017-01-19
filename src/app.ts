import {Draw} from "./Draw";
import {GrabData} from './grabData';
import {PluginOptions} from "./models/PluginOptions";
import {CalculateData} from "./calculateData";
export class App {
    constructor(private options: PluginOptions) {
        console.log('opt', options);

        var grabData = new GrabData(options);

        let paperSize = grabData.getPaperSize();
        let maxDrawArea = grabData.getMaxDrawArea();

        let calculateData = new CalculateData(
            {
                paperSize: paperSize,
                maxDrawArea: maxDrawArea
            }
        );

        let grabbedData = grabData.grabData();

        let paperSizeToAdapt = calculateData.calculateData();

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
            paperSize: paperSize,
            maxDrawArea: maxDrawArea,
            paperSizeToAdapt: paperSizeToAdapt
        };

        var draw = new Draw(drawData);
        draw.drawAll();
        draw.change();
    }
}