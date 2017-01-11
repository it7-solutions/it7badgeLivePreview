import {PluginConfig} from "./services/pluginConfig";
import {PluginData} from "./models/PluginData";
export class GrabData {
    constructor(private options: PluginConfig) {}

    badgeForm: string = '#badge_form';

    fieldsValues: PluginData = {
        width               : $(this.badgeForm).find('[name="width"]').val(),
        height              : $(this.badgeForm).find('[name="height"]').val(),
        paperOrientation    : $(this.badgeForm).find('[name="paper_orientation"]').val(),
        paperFormat         : $(this.badgeForm).find('[name="paper_format"]').val(),
        contentPosition     : $(this.badgeForm).find('[name="content_position"]').val(),
        columnsCount        : $(this.badgeForm).find('[name="columns_count"]').val(),
        leftMargin          : $(this.badgeForm).find('[name="left_margin"]').val(),
        topMargin           : $(this.badgeForm).find('[name="top_margin"]').val(),
        rightBadgeMargin    : $(this.badgeForm).find('[name="right_b_margin"]').val(),
        bottomBadgeMargin   : $(this.badgeForm).find('[name="bottom_b_margin"]').val()
    };

    grabData(): PluginData {
        console.log('grabData');
        console.log(this.fieldsValues);

        return this.fieldsValues;
    }


}