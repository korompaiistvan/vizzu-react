import { FullConfig } from "./types";
export const initialConfig = {
  channels: {
    x: "Region",
    y: "Sales",
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
} as FullConfig;
