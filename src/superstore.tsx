import * as d3 from "d3-fetch";
import { Data } from "vizzu/dist/vizzu";

export async function getSuperstoreDataset() {
  return await d3
    .csv(process.env.PUBLIC_URL + "superstore.csv")
    .then((data) => {
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
      return vizzuData as Data.TableBySeries;
    });
}
