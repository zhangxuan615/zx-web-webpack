import { getOverrideComponentStylesFromNamespace } from "../../../../utils/style-namespace";
import { ComponentStylesParamsType, ThemeTypeEn } from "../../../../types";

export default {
  root: (componentStylesParams: ComponentStylesParamsType) => {
    const overrideStyles = getOverrideComponentStylesFromNamespace(
      componentStylesParams,
      ThemeTypeEn.teamsV2Theme,
      "Button"
    );
    return {
      ...overrideStyles
    };
  }
};
