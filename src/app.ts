import {Draw} from "./Draw";
import {PluginOptions} from "./models/PluginOptions";
export class App {
    constructor(private options: PluginOptions) {
        var draw = new Draw(options);
        draw.drawCanvas();
    }
}