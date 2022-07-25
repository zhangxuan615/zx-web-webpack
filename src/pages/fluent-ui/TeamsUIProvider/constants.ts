import {
  teamsTheme,
  teamsV2Theme,
  teamsDarkTheme,
  teamsDarkV2Theme
} from "@fluentui/react-northstar";
import {
  overrideTeamsDefaultTheme,
  overrideTeamsV2Theme,
  overrideTeamsDarkTheme,
  overrideTeamsDarkV2Theme
} from "./overridesTheme";
import {
  teamsDarkThemeNamespace,
  teamsDarkV2ThemeNamespace,
  teamsDefaultThemeNamespace,
  teamsV2ThemeNamespace
} from "./overridesTheme/index-namespace";
import { ITeamsThemeNamespaceMap, ThemeTypeEn } from "./types";

/** 默认主题 */
export const defaultTeamsThemeMap = {
  [ThemeTypeEn.teamsDefaultTheme]: teamsTheme,
  [ThemeTypeEn.teamsV2Theme]: teamsV2Theme,
  [ThemeTypeEn.teamsDarkTheme]: teamsDarkTheme,
  [ThemeTypeEn.teamsDarkV2Theme]: teamsDarkV2Theme
};
/** 定制主题 */
export const overridesTeamsThemeMap = {
  [ThemeTypeEn.teamsDefaultTheme]: overrideTeamsDefaultTheme,
  [ThemeTypeEn.teamsV2Theme]: overrideTeamsV2Theme,
  [ThemeTypeEn.teamsDarkTheme]: overrideTeamsDarkTheme,
  [ThemeTypeEn.teamsDarkV2Theme]: overrideTeamsDarkV2Theme
};

/** 样式空间 */
export const teamsThemeNamespaceMap = {
  [ThemeTypeEn.teamsDefaultTheme]: teamsDefaultThemeNamespace,
  [ThemeTypeEn.teamsV2Theme]: teamsV2ThemeNamespace,
  [ThemeTypeEn.teamsDarkTheme]: teamsDarkThemeNamespace,
  [ThemeTypeEn.teamsDarkV2Theme]: teamsDarkV2ThemeNamespace
} as ITeamsThemeNamespaceMap;
