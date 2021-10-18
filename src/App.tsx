import Vizzu from "vizzu";
import {
  useRef,
  useEffect,
  useReducer,
  useState,
  useLayoutEffect,
} from "react";
import * as d3 from "d3-fetch";
import { Data, Config } from "vizzu/dist/vizzu";

interface ChannelAction {
  type: "channel";
  channel: keyof Config.Channels;
  selection: Data.Series["name"][];
}

interface ChartAction {
  type: "chart";
  setting: keyof Config.Chart; // in reality this will never get 'channels' but I don't wanna go into mapped types now
  value: string | number | null | boolean; // this will depend on the setting, but again too complicated to set up properly
}
type Action = ChannelAction | ChartAction;

type NoOptional<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
type FullConfig = NoOptional<Config.Chart>;

function chartDescriptorReducer(
  config: FullConfig,
  action: Action
): FullConfig {
  let newConfig = config;
  switch (action.type) {
    case "channel":
      newConfig.channels![action.channel] = action.selection;
      return newConfig;
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

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Vizzu>();
  // const animRef = useRef<Promise<Vizzu>>();
  const [dataSet, setDataSet] = useState<Data.Set>();
  const [chartConfig, dispatchChartConfig] = useReducer(
    chartDescriptorReducer,
    {
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
    } as FullConfig
  );

  // first set up the chart reference
  useLayoutEffect(() => {
    if (!canvasRef.current) {
      console.error("There is no canvas to draw on! (yet?)");
      return;
    }

    if (chartRef.current) {
      console.log(
        "Vizzu already initialized. You probably hot-reloaded the page."
      );
      return;
    }

    chartRef.current = new Vizzu(canvasRef.current);
    console.log(chartRef.current);
  }, []);

  // also read the data in before the first paint
  useEffect(() => {
    d3.csv(process.env.PUBLIC_URL + "superstore.csv").then((data) => {
      const metaData = {
        numbers: ["Sales", "Quantity", "Discount", "Profit"],
      };
      let vizzuData = {
        series: Object.keys(data[0]).map((col) => {
          return {
            name: col,
            values: data.map((record) => {
              let value: number | string = record[col]!;
              if (metaData.numbers.includes(col)) {
                value = +value as number;
              }
              return value;
            }),
          };
        }),
      };
      setDataSet(vizzuData as Data.Set);
    });
  }, []);

  // whenever the dataset or the config changes
  useEffect(() => {
    console.log("React has noticed the change");
    if (!chartRef.current) {
      console.warn("there is no chart yet");
      // the canvas has not been mounted yet
      return;
    }
    if (!dataSet) {
      console.warn("The data hasn't loaded yet");
      return;
    }
    console.log("drawing with", chartConfig);
    chartRef.current.animate({ data: dataSet, config: chartConfig });
  }, [chartConfig, dataSet]);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "160px repeat(9, 1fr)",
    gridTemplateRows: "repeat(14, 1fr)",
    height: "100vh",
  };

  return (
    <div className="main" style={gridStyle}>
      {Object.keys(chartConfig.channels!).map((variableName, idx) => {
        return (
          <div
            style={{ gridRow: `${1 + idx * 2} / span 2`, gridColumn: "1 / 1" }}
            key={variableName}
          >
            {variableName}
          </div>
        );
      })}

      {Object.keys(chartConfig)
        .filter((k) => k !== "channels")
        .map((setting, idx) => {
          return (
            <div
              style={{ gridRow: `1/1`, gridColumn: `${2 + idx} / span 1` }}
              key={setting}
              onClick={() =>
                dispatchChartConfig({
                  type: "chart",
                  setting: "orientation",
                  value: "vertical",
                })
              }
            >
              {setting}
            </div>
          );
        })}
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          gridRow: "2 / span 13",
          gridColumn: "2 / span 9",
        }}
      />
    </div>
  );
}

export default App;
