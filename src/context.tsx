import { createContext, Dispatch } from "react";
import { initialConfig } from "./initial_config";
import { FullConfig, Action } from "./types";

export const configContext = createContext<FullConfig>(initialConfig);
export const configDispatchContext = createContext<Dispatch<Action>>(
  () => undefined
);
