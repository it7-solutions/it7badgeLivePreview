/// <reference path="../types.d.ts" />
import {PluginConfig} from "./services/pluginConfig";
import {App} from './app';

export function it7badgeLivePreview(options: PluginConfig) {
  // console.log('options', options);
  new App(options);
}
window['it7badgeLivePreview'] = it7badgeLivePreview;