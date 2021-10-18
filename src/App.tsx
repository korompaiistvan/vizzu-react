import Vizzu from "vizzu";
import { useRef, useEffect, useReducer } from "react";
import * as d3 from "d3-fetch";
import { Data, Config } from "vizzu/dist/vizzu";

function chartDescriptorReducer(
  state: Config.Chart,
  action: any
): Config.Chart {
  return state;
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Vizzu | null>(null);
  const [chartConfig, dispatchChartConfig] = useReducer(
    chartDescriptorReducer,
    {
      channels: {
        x: null,
        y: null,
        color: null,
        lightness: null,
        size: null,
        label: null,
        noop: null,
      },
      title: null,
      legend: null,
      coordSystem: "cartesian",
      rotation: 0,
      geometry: "rectangle",
      orientation: "horizontal",
      sort: "none",
      reverse: false,
      align: "none",
      split: false,
    }
  );

  useEffect(() => {
    // load the data first
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

      if (!canvasRef.current) {
        console.error("There is no canvas to draw on! (yet?)");
      }

      if (chartRef.current) {
        console.log(
          "Vizzu already initialized. You probably hot-reloaded the page."
        );
        return;
      }

      chartRef.current = new Vizzu(canvasRef.current!, {
        data: vizzuData as Data.Set,
      });

      chartRef.current.animate({
        x: "Category",
        y: "Sales",
      });
    });
  }, []);

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
