import { Action, AppState } from "./types";

export function reducer(state: AppState, action: Action): AppState {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "dataUpdate":
      newState.dataset = action.data;
      console.log("data should have updated in state just now");
      console.log(newState);
      return newState;
    case "channel":
      newState.chartConfig.channels[action.channel] = action.selection;
      console.log(action, newState);
      return newState;
    case "chart":
      switch (action.setting) {
        case "title":
          newState.chartConfig.title = action.value as string;
          return newState;
        case "legend":
          newState.chartConfig.legend = action.value as
            | "color"
            | "lightness"
            | "size"
            | null;
          return newState;
        case "coordSystem":
          newState.chartConfig.coordSystem = action.value as
            | "cartesian"
            | "polar";
          return newState;
        case "geometry":
          newState.chartConfig.geometry = action.value as
            | "rectangle"
            | "circle"
            | "area"
            | "line";
          return newState;
        case "orientation":
          newState.chartConfig.orientation = action.value as
            | "horizontal"
            | "vertical";
          return newState;
        case "sort":
          newState.chartConfig.sort = action.value as "none" | "byValue";
          return newState;
        case "reverse":
          newState.chartConfig.reverse = action.value as boolean;
          return newState;
        case "align":
          newState.chartConfig.align = action.value as
            | "none"
            | "min"
            | "center"
            | "max"
            | "stretch";
          return newState;
        case "split":
          newState.chartConfig.split = action.value as boolean;
          return newState;
        default:
          return newState;
      }
    default:
      return newState;
  }
}
