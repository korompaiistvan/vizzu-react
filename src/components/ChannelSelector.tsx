import { useContext } from "react";
// import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { ChannelName } from "../types";
import { stateContext, dispatchContext } from "../context";

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
  const state = useContext(stateContext);
  const dispatch = useContext(dispatchContext);
  // const theme = useTheme();

  const handleChange = (event: any) => {
    const selection: string[] = event.target.value;
    dispatch({
      type: "channel",
      channel: props.channelName,
      selection,
    });
    console.log(state.chartConfig.channels[props.channelName]);
  };

  let selectedValues: string[];
  if (typeof state.chartConfig.channels[props.channelName] === "string") {
    selectedValues = [
      state.chartConfig.channels[props.channelName],
    ] as string[];
  } else if (state.chartConfig.channels[props.channelName] !== null) {
    selectedValues = state.chartConfig.channels[props.channelName] as string[];
  } else {
    selectedValues = [] as string[];
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: "160px" }}>
        <InputLabel id="demo-multiple-chip-label">
          {props.channelName}
        </InputLabel>
        <Select
          multiple
          value={selectedValues as string[]}
          onChange={handleChange}
          input={
            <OutlinedInput
              id={`select${props.channelName}`}
              label={props.channelName}
            />
          }
          renderValue={(selected) => {
            if (!selected) {
              return;
            }
            console.log("selected", selected);
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            );
          }}
          MenuProps={MenuProps}
        >
          {props.seriesList.map((series) => (
            <MenuItem key={series} value={series}>
              {series}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
