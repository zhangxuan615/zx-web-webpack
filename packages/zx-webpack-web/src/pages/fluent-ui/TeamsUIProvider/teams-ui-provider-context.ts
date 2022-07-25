import React from "react";
import { ITeamsThemeUI } from "./types";

export const TeamsThemeUIContext = React.createContext({} as ITeamsThemeUI);
export const useTeamsThemeUIContext = () => React.useContext(TeamsThemeUIContext);
