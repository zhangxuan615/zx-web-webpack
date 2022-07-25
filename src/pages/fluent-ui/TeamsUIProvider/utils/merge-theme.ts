import { mergeThemes, ThemePrepared } from "@fluentui/react-northstar";

import { defaultTeamsThemeMap, overridesTeamsThemeMap } from "../constants";
import { ThemeTypeEn } from "../types";

export const getMergedTeamsTheme = () => {
  return mergeThemes(
    defaultTeamsThemeMap[ThemeTypeEn.teamsDefaultTheme],
    overridesTeamsThemeMap[ThemeTypeEn.teamsDefaultTheme]
  );
};
export const getMergedTeamsV2Theme = () => {
  return mergeThemes(getMergedTeamsTheme(), overridesTeamsThemeMap[ThemeTypeEn.teamsV2Theme]);
};
export const getMergedTeamsDarkTheme = () => {
  return mergeThemes(
    mergeThemes(
      defaultTeamsThemeMap[ThemeTypeEn.teamsDarkTheme],
      overridesTeamsThemeMap[ThemeTypeEn.teamsDefaultTheme]
    ),
    overridesTeamsThemeMap[ThemeTypeEn.teamsDarkTheme]
  );
};
export const getMergedTeamsDarkV2Theme = () => {
  return mergeThemes(
    getMergedTeamsDarkTheme(),
    overridesTeamsThemeMap[ThemeTypeEn.teamsDarkV2Theme]
  );
};

export const getMergedThemeByType = (themeType?: ThemeTypeEn) => {
  let mergedTheme: ThemePrepared;
  switch (themeType) {
    case ThemeTypeEn.teamsDefaultTheme:
      mergedTheme = getMergedTeamsTheme();
      break;
    case ThemeTypeEn.teamsV2Theme:
      mergedTheme = getMergedTeamsV2Theme();
      break;
    case ThemeTypeEn.teamsDarkTheme:
      mergedTheme = getMergedTeamsDarkTheme();
      break;
    case ThemeTypeEn.teamsDarkV2Theme:
      mergedTheme = getMergedTeamsDarkV2Theme();
      break;
    default:
      mergedTheme = getMergedTeamsTheme();
      break;
  }

  return mergedTheme;
};
