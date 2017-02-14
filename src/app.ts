import {DrawData} from "./drawData";
import {GrabData} from './grabData';
import {PluginOptions} from "./models/PluginOptions";
import {CalculateData} from "./calculateData";
export class App {
    constructor(private options: PluginOptions) {
        this.drawAll();
        this.setChangeListener();
    }

    drawData: any;
    drawAll() {
        // console.log('opt', this.options);
        var grabData = new GrabData(this.options);
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

        this.drawData = {
            canvasOptions: this.options.canvasOptions,
            badge: {
                width: grabbedData.width,
                height: grabbedData.height,
                contentPosition: grabbedData.contentPosition,
                leftMargin: grabbedData.leftMargin,
                topMargin: grabbedData.topMargin,
                bottomBadgeMargin: grabbedData.bottomBadgeMargin,
                rightBadgeMargin: grabbedData.rightBadgeMargin,
                columnsCount: grabbedData.columnsCount
            },
            paperSize: paperSize,
            maxDrawArea: maxDrawArea,
            paperSizeToAdapt: paperSizeToAdapt
        };

        var draw = new DrawData(this.drawData);

        if(this.checkForValidData()) {
            draw.drawAll();
        } else {
            this.destroyCanvas();
            draw.drawCanvas();
            draw.drawText(
                'Width and height can not be lower or equal zero!',
                this.drawData.canvasOptions.width / 2,
                this.drawData.canvasOptions.height / 2,
                'grey',
                'center',
                '17px Arial'
            );
        }
    }

    private destroyCanvas() {
        let $oldCanvas = $(this.options.canvasOptions.selector).find('canvas');
        $oldCanvas.remove();
    }

    private checkForValidData () {
        if(this.drawData.badge.width === 0 ||
            isNaN(this.drawData.badge.width) ||
            this.drawData.badge.height === 0 ||
            isNaN(this.drawData.badge.height)) {
            return false;
        } else {
            return true;
        }
    }

    setChangeListener() {
        $(document).on('change keyup', '#badge_form', () => {
            this.destroyCanvas();
            this.drawAll();
        })
    }

}