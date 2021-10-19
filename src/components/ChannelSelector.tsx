import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { ChannelName } from "../types";
import { configContext, configDispatchContext } from "../context";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  channelName: ChannelName;
  seriesList: string[];
}

export default function ChannelSelector(props: Props) {
  const chartConfig = useContext(configContext);
  const dispatchChartConfig = useContext(configDispatchContext);
  const theme = useTheme();

  const handleChange = (event: any) => {
    const { options } = event.target;
    const selection: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        selection.push(options[i].value);
      }
    }
    console.log(selection);
    dispatchChartConfig({
      type: "channel",
      channel: props.channelName,
      selection,
    });
    console.log(chartConfig.channels[props.channelName]);
  };

  let selectedValues: string[];
  if (typeof chartConfig.channels[props.channelName] === "string") {
    selectedValues = [chartConfig.channels[props.channelName]] as string[];
  } else if (chartConfig.channels[props.channelName] !== null) {
    selectedValues = chartConfig.channels[props.channelName] as string[];
  } else {
    selectedValues = [] as string[];
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">
          {props.channelName}
        </InputLabel>
        <Select
          multiple
          native
          value={selectedValues as string[]}
          onChange={handleChange}
          inputProps={{
            id: "select-multiple-native",
          }}
          // renderValue={(selected) => {
          //   console.log(props.channelName, selected);
          //   if (!selected) {
          //     return;
          //   }
          //   return (
          //     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          //       {selected.map((value) => (
          //         <Chip key={value} label={value} />
          //       ))}
          //     </Box>
          //   );
          // }}
          MenuProps={MenuProps}
        >
          {props.seriesList.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
