import Vizzu from "vizzu";
import { useRef, useEffect } from "react";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let data = {
      series: [
        {
          name: "Foo",
          values: ["Alice", "Bob", "Ted"],
          type: "dimension" as const,
        },
        { name: "Bar", values: [15, 32, 12], type: "measure" as const },
        { name: "Baz", values: [5, 3, 2], type: "measure" as const },
      ],
    };
    if (canvasRef.current) {
      const chart = new Vizzu(canvasRef.current, { data });
      chart.animate({
        x: "Foo",
        y: "Bar",
      });
    }
  }, []);
  return (
    <div>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default App;
