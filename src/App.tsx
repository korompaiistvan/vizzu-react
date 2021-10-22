import Vizzu from "vizzu";
import {
  useRef,
  useEffect,
  useReducer,
  useState,
  useLayoutEffect,
} from "react";
import { stateContext, dispatchContext } from "./context";
import { reducer } from "./reducer";
import { initialState } from "./initialState";
import { getSuperstoreDataset } from "./superstore";
import ChannelSelector from "./components/ChannelSelector";
import { ChannelName } from "./types";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Vizzu>();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [datasetIsLoading, setDatasetIsLoading] = useState<boolean>(true);

  // first set up the chart reference
  useLayoutEffect(() => {
    console.log("useLayoutEffect");
    if (!canvasRef.current) {
      console.error("  There is no canvas to draw on! (yet?)");
      return;
    }

    if (chartRef.current) {
      console.log(
        "  Vizzu already initialized. You probably hot-reloaded the page."
      );
      return;
    }

    chartRef.current = new Vizzu(canvasRef.current);
  }, []);

  useEffect(() => {
    console.log("first useeffect");
    getSuperstoreDataset().then((data) => {
      dispatch({ type: "dataUpdate", data });
    });
  }, []);

  useEffect(() => {
    console.log("second useffect", datasetIsLoading, state);
    if (!datasetIsLoading) {
      return;
    }

    if (!chartRef.current) {
      console.error("  no chart yet");
      return;
    }
    if (!state.dataset.series.length) {
      console.error("  data was not loaded yet");
      return;
    }

    chartRef.current.animate({
      data: state.dataset,
      config: state.chartConfig,
    });
    setDatasetIsLoading(false);
  }, [state, datasetIsLoading]);

  useEffect(() => {
    console.log("third useffect", state);
    if (datasetIsLoading) {
      console.log("  dataset is still loading");
      return;
    }
    if (!chartRef.current) {
      console.error("  no chart yet");
      return;
    }

    chartRef.current.animate({
      config: state.chartConfig,
    });
  }, [state]);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "160px repeat(9, 1fr)",
    gridTemplateRows: "repeat(14, 1fr)",
    height: "100vh",
  };

  const seriesList = state.dataset.series.map((s) => s.name);
  const channelList = Object.keys(state.chartConfig.channels);
  const chartSettingsList = Object.keys(state.chartConfig).filter(
    (k) => k !== "channels"
  );

  return (
    <dispatchContext.Provider value={dispatch}>
      <stateContext.Provider value={state}>
        <div className="main" style={gridStyle}>
          {channelList.map((variableName) => {
            return (
              !datasetIsLoading && (
                <ChannelSelector
                  channelName={variableName as ChannelName}
                  seriesList={seriesList}
                  key={variableName}
                />
              )
            );
          })}

          {chartSettingsList.map((setting, idx) => {
            return (
              <div
                style={{ gridRow: `1/1`, gridColumn: `${2 + idx} / span 1` }}
                key={setting}
                onClick={() =>
                  dispatch({
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
      </stateContext.Provider>
    </dispatchContext.Provider>
  );
}

export default App;
