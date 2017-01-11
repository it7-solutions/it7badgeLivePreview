import {canvasOptions} from "./canvasOptions";
export interface PluginOptions  {
    canvasOptions: canvasOptions,
    width: number,
    height: number,
    columns_count: number,
    top_margin: number,
    left_margin: number,
    paper_orientation: any[],
    content_position: any[],
    right_b_margin: number,
    bottom_b_margin: number,
    formats: any[]
}
