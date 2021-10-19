import { FullConfig, Action } from "./types";

export function chartDescriptorReducer(
  config: FullConfig,
  action: Action
): FullConfig {
  let newConfig = config;
  switch (action.type) {
    case "channel":
      const updatedChannels = config.channels;
      updatedChannels[action.channel] = action.selection;
      console.log("setting the new channel config");
      return { ...config };
    case "chart":
      switch (action.setting) {
        case "title":
          newConfig.title = action.value as string;
          return newConfig;
        case "legend":
          newConfig.legend = action.value as
            | "color"
            | "lightness"
            | "size"
            | null;
          return newConfig;
        case "coordSystem":
          newConfig.coordSystem = action.value as "cartesian" | "polar";
          return newConfig;
        case "geometry":
          newConfig.geometry = action.value as
            | "rectangle"
            | "circle"
            | "area"
            | "line";
          return newConfig;
        case "orientation":
          newConfig.orientation = action.value as "horizontal" | "vertical";
          console.log(config);
          console.log(newConfig);
          return newConfig;
        case "sort":
          newConfig.title = action.value as "none" | "byValue";
          return newConfig;
        case "reverse":
          newConfig.reverse = action.value as boolean;
          return newConfig;
        case "align":
          newConfig.align = action.value as
            | "none"
            | "min"
            | "center"
            | "max"
            | "stretch";
          return newConfig;
        case "split":
          newConfig.split = action.value as boolean;
          return newConfig;
        default:
          return newConfig;
      }
    default:
      return newConfig;
  }
}
