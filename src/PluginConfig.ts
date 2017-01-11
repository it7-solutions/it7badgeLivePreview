import {PluginOptions} from "./models/PluginOptions";
import {canvasOptions} from "./models/canvasOptions";
export class PluginConfig {
    canvasOptions: canvasOptions;
    width: number;
    height: number;
    columns_count: number;
    top_margin: number;
    left_margin: number;
    paper_orientation: any[];
    content_position: any[];
    right_b_margin: number;
    bottom_b_margin: number;
    formats: any[];
    constructor(options: PluginOptions) {
        this.canvasOptions = options.canvasOptions;
        this.width = options.width;
        this.height = options.height;
        this.columns_count = options.columns_count;
        this.top_margin = options.top_margin;
        this.left_margin = options.left_margin;
        this.paper_orientation = options.paper_orientation;
        this.content_position = options.content_position;
        this.right_b_margin = options.right_b_margin;
        this.bottom_b_margin = options.bottom_b_margin;
        this.formats = options.formats;
    }
}