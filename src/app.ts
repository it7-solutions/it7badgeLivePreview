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
            this.destroyErrorBox();
        } else {
            this.destroyCanvas();
            this.destroyPanelInfo();
            draw.drawText('Bad input data!');
        }
    }

    private destroyCanvas() {
        let $oldCanvas = $(this.options.canvasOptions.selector).find('canvas');
        $oldCanvas.remove();
    }

    private destroyPanelInfo() {
        let $oldPanel = $(this.options.canvasOptions.selector).find('.infoPanel');
        $oldPanel.remove();
    }

    private destroyErrorBox() {
        let $oldErrorBox = $(this.options.canvasOptions.selector).find('.errorBox');
        $oldErrorBox.remove();
    }

    private checkForValidData () {
        if(this.drawData.badge.width < 1 ||
            isNaN(this.drawData.badge.width) ||
            this.drawData.badge.height < 1 ||
            isNaN(this.drawData.badge.height)) {
            return false;
        } else if(this.drawData.badge.columnsCount < 1 ||
            isNaN(this.drawData.badge.columnsCount)) {
            return false;
        } else if(this.drawData.badge.leftMargin < 0 ||
            isNaN(this.drawData.badge.leftMargin)) {
            return false;
        } else if(this.drawData.badge.topMargin < 0 ||
            isNaN(this.drawData.badge.topMargin)) {
            return false;
        } else if(this.drawData.badge.rightBadgeMargin < 0 ||
            isNaN(this.drawData.badge.rightBadgeMargin)) {
            return false;
        } else if(this.drawData.badge.bottomBadgeMargin < 0 ||
            isNaN(this.drawData.badge.bottomBadgeMargin)) {
            return false;
        } else {
            return true
        }
    }

    setChangeListener() {
        $(document).on('change keyup', '#badge_form', () => {
            this.destroyCanvas();
            this.destroyPanelInfo();
            this.destroyErrorBox();
            this.drawAll();
        })
    }

}