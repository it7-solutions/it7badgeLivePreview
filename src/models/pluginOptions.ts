import {canvasOptions} from "./canvasOptions";
export interface PluginOptions  {
    canvasOptions: canvasOptions,
    width: number,
    height: number,
    columnsCount: number,
    topMargin: number,
    leftMargin: number,
    paperOrientation: string,
    paperFormat: string,
    contentPosition: string,
    rightBadgeMargin: number,
    bottomBadgeMargin: number,
    formats: any[]
}
