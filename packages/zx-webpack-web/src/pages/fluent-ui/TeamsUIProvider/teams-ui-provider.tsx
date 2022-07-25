import React from "react";
import { Provider } from "@fluentui/react-northstar";
import { NamespaceType, NamesType, ThemeTypeEn } from "./types";
import { getMergedThemeByType } from "./utils/merge-theme";
import { generateComponentNamespaceVariables } from "./utils/style-namespace";
import { TeamsThemeUIContext } from "./teams-ui-provider-context";

interface TeamsThemeUIProviderProps {
  themeType: ThemeTypeEn;
  children: React.ReactNode;
}

export const TeamsThemeUIProvider: React.FC<TeamsThemeUIProviderProps> = props => {
  const { themeType, children } = props;

  // 1. 获取主题样式
  const teamsTheme = getMergedThemeByType(themeType);

  // 2. 计算 ui context 值
  const siteVariables = teamsTheme.siteVariables;
  const makeVars = React.useCallback(
    (namespace: NamespaceType, names: NamesType) =>
      generateComponentNamespaceVariables({ zx: { themeType, namespace, names } }),
    [themeType]
  );
  const TeamsThemeUIContextProviderValue = {
    themeType,
    siteVariables,
    makeVars
  };

  return (
    <TeamsThemeUIContext.Provider value={TeamsThemeUIContextProviderValue}>
      <Provider theme={teamsTheme}>{children}</Provider>
    </TeamsThemeUIContext.Provider>
  );
};

export default TeamsThemeUIProvider;
