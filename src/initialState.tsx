import { FullConfig } from "./types";
import { Data } from "vizzu";

export const initialState = {
  dataset: {
    series: [],
  } as Data.TableBySeries,
  chartConfig: {
    channels: {
      x: ["Region"],
      y: ["Sales"],
      color: null,
      lightness: null,
      size: null,
      label: null,
      noop: null,
    },
    title: null,
    legend: null,
    coordSystem: "cartesian",
    geometry: "rectangle",
    orientation: "horizontal",
    sort: "none",
    reverse: false,
    align: "none",
    split: false,
  } as FullConfig,
};
