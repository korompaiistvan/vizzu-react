import { Data, Config } from "vizzu/dist/vizzu";
export interface ChannelAction {
  type: "channel";
  channel: keyof Config.Channels;
  selection: Data.Series["name"][];
}
export interface ChartAction {
  type: "chart";
  setting: keyof Config.Chart; // in reality this will never get 'channels' but I don't wanna go into mapped types now
  value: string | number | null | boolean; // this will depend on the setting, but again too complicated to set up properly
}
export interface DataUpdateAction {
  type: "dataUpdate";
  data: Data.TableBySeries;
}
export type Action = ChannelAction | ChartAction | DataUpdateAction;

export type NoOptional<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

export type ChannelName = keyof Config.Channels;

export type FullConfig = NoOptional<Config.Chart>;
export interface AppState {
  chartConfig: FullConfig;
  dataset: Data.TableBySeries;
}
