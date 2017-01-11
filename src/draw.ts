import {PluginConfig} from "./services/pluginConfig";
export class Draw {
    constructor(private options: PluginConfig) {}

    drawCanvas(): void {
        console.log('drawCanvas');

        var canvas: any = document.createElement('canvas');
        $(document).find(this.options.canvasOptions.selector).append(canvas);

        canvas.width = this.options.canvasOptions.width;
        canvas.height = this.options.canvasOptions.height;

        var ctx: any = canvas.getContext("2d");
        ctx.fillStyle = this.options.canvasOptions.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);


        $(document).on('change', '#badge_form', function () {
            console.log('change');
        })
    }
}