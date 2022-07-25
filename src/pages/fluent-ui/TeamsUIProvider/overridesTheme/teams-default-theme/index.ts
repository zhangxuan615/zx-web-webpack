import { ThemeInput, teamsTheme } from "@fluentui/react-northstar";

import { siteVariables } from "./site-variables";
import { componentStyles } from "./component-styles";

/** overridesTeamsTheme */
export const overrideTeamsDefaultTheme: ThemeInput = {
  siteVariables: {
    ...teamsTheme.siteVariables,
    ...siteVariables
  },
  componentVariables: {},
  componentStyles: {
    ...componentStyles
  },
  animations: {},
  fontFaces: [],
  staticStyles: []
};
