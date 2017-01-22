import {PluginConfig} from "./services/pluginConfig";
import {PluginData} from "./models/PluginData";
import {DataToDraw} from "./models/dataToDraw";
export class GrabData {
    constructor(private options: PluginConfig) {}

    badgeForm: string = '#badge_form';

    fieldsValues: PluginData = {
        width               : parseInt($(this.badgeForm).find('[name="width"]').val()),
        height              : parseInt($(this.badgeForm).find('[name="height"]').val()),
        paperOrientation    : $(this.badgeForm).find('[name="paper_orientation"]').val(),
        paperFormat         : $(this.badgeForm).find('[name="paper_format"]').val(),
        contentPosition     : $(this.badgeForm).find('[name="content_position"]').val(),
        columnsCount        : parseInt($(this.badgeForm).find('[name="columns_count"]').val()),
        leftMargin          : parseInt($(this.badgeForm).find('[name="left_margin"]').val()),
        topMargin           : parseInt($(this.badgeForm).find('[name="top_margin"]').val()),
        rightBadgeMargin    : parseInt($(this.badgeForm).find('[name="right_b_margin"]').val()),
        bottomBadgeMargin   : parseInt($(this.badgeForm).find('[name="bottom_b_margin"]').val()),
        // paperSize           : undefined
    };

    grabData(): any {
        console.log('grabData');

        // add paper size option to draw properties object and return it
        // return (<any>Object).assign(this.fieldsValues, {paperSize: this.getPaperSize()});
        return this.fieldsValues;
    }

    dataToDraw() {
        return {
            paperSize: this.getPaperSize(),
            maxDrawArea: this.getMaxDrawArea()
        };
    }

    getMaxDrawArea() {
        return {
            width: this.options.canvasOptions.width - 2 * this.options.canvasOptions.borderSpace,
            height: this.options.canvasOptions.height - 2 * this.options.canvasOptions.borderSpace
        };
    }

    getPaperSize() {
        // find orientation objects by format with sizes (L,P)
        let foundFormat = _.find(this.options.formats, (i, value: any) => {
            return value === this.fieldsValues.paperFormat;
        });

        // find needed width/height object by orientation
        return _.find(foundFormat, (i, value: any) => {
            return value === this.fieldsValues.paperOrientation;
        });
    }


}