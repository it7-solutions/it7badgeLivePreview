import {PluginOptions} from "../models/PluginOptions";
import {canvasOptions} from "../models/canvasOptions";
export class PluginConfig {
    canvasOptions: canvasOptions;
    width: number;
    height: number;
    columnsCount: number;
    topMargin: number;
    leftMargin: number;
    paperOrientation: string;
    contentPosition: string;
    rightBadgeMargin: number;
    bottomBadgeMargin: number;
    formats: any[];
    constructor(options: PluginOptions) {
        this.canvasOptions = options.canvasOptions;
        this.width = options.width;
        this.height = options.height;
        this.columnsCount = options.columnsCount;
        this.topMargin = options.topMargin;
        this.leftMargin = options.leftMargin;
        this.paperOrientation = options.paperOrientation;
        this.contentPosition = options.contentPosition;
        this.rightBadgeMargin = options.rightBadgeMargin;
        this.bottomBadgeMargin = options.bottomBadgeMargin;
        this.formats = options.formats;
    }
}