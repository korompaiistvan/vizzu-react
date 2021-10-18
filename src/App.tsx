import Vizzu from "vizzu";
import {
  useRef,
  useEffect,
  useReducer,
  useState,
  useLayoutEffect,
} from "react";
import * as d3 from "d3-fetch";
import { Data } from "vizzu/dist/vizzu";
import { configContext, configDispatchContext } from "./context";
import { chartDescriptorReducer } from "./reducer";
import { initialConfig } from "./initial_config";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Vizzu>();
  // const animRef = useRef<Promise<Vizzu>>();
  const [dataSet, setDataSet] = useState<Data.Set>();
  const [chartConfig, dispatchChartConfig] = useReducer(
    chartDescriptorReducer,
    initialConfig
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
    <configDispatchContext.Provider value={dispatchChartConfig}>
      <configContext.Provider value={chartConfig}>
        <div className="main" style={gridStyle}>
          {Object.keys(chartConfig.channels!).map((variableName, idx) => {
            return (
              <div
                style={{
                  gridRow: `${1 + idx * 2} / span 2`,
                  gridColumn: "1 / 1",
                }}
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
      </configContext.Provider>
    </configDispatchContext.Provider>
  );
}

export default App;
