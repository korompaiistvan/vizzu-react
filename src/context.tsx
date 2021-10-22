import { createContext, Dispatch } from "react";
import { initialState } from "./initialState";
import { Action, AppState } from "./types";

export const stateContext = createContext<AppState>(initialState);
export const dispatchContext = createContext<Dispatch<Action>>(() => undefined);
