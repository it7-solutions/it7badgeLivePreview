/// <reference path="../types.d.ts" />
import {PluginConfig} from "./PluginConfig";
import {App} from './app';

export function RunApplication(options: PluginConfig) {
  console.log('options', options);

  new App(options);
}
window['RunApplication'] = RunApplication;