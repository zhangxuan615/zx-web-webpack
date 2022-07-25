import {
  ComponentVariablesInput,
  SiteVariablesInput,
  ThemePrepared
} from "@fluentui/react-northstar";
import { CSSProperties } from "react";

/** 主题枚举值 */
export enum ThemeTypeEn {
  teamsDefaultTheme = "TeamsDefaultTheme",
  teamsV2Theme = "TeamsV2Theme",
  teamsDarkTheme = "TeamsDarkTheme",
  teamsDarkV2Theme = "TeamsDarkV2Theme"
}

/** 组件空间类型 */
export type NamespaceType = "message" | "user";
export type IExcludeCSSProperties = {
  [P: string]: string | number | boolean;
} & { [P in keyof CSSProperties]: never };
export type NamesType = string[] | { name: string; props?: IExcludeCSSProperties }[];
export interface IComponentNamespaceVairables {
  themeType: ThemeTypeEn;
  namespace: NamespaceType;
  names: NamesType;
}
export interface IZxComponentNamespaceVairables {
  zx: IComponentNamespaceVairables;
}

export interface IComponentNamespaceVairablesStringNames {
  themeType: ThemeTypeEn;
  namespace: NamespaceType;
  names: string[];
}
export interface IComponentNamespaceVairablesObjectNames {
  themeType: ThemeTypeEn;
  namespace: NamespaceType;
  names: { name: string; props?: IExcludeCSSProperties }[];
}
export interface IZxComponentNamespaceVairablesStringNames {
  zx: IComponentNamespaceVairablesStringNames;
}
export interface IZxComponentNamespaceVairablesObjectNames {
  zx: IComponentNamespaceVairablesObjectNames;
}

export type ComponentNamespaceVariablesBooleanType = Record<string, boolean>;

/** 组件样式空间 */
export interface IOverrideStyleFnProps {
  [key: string]: string | number | boolean;
}
export type IOverrideStyleFnParams = {
  colorSchemeDefault: Record<string, string | number>;
  colorSchemeBrand: Record<string, string | number>;
  fontSizes: Record<string, string>;
  shadow2: string;
} & {
  overrideStyleFnProps: IOverrideStyleFnProps;
};
export type IOverrideStyleFn = (params: IOverrideStyleFnParams) => Record<string, string | number>;
export interface INamespaceStyles {
  [key: string]: {
    [key: string]: IOverrideStyleFn;
  };
}

export type ITeamsThemeNamespaceMap = {
  [key in ThemeTypeEn]: {
    [key: string]: {
      [key: string]: INamespaceStyles;
    };
  };
};

export interface ITeamsThemeUI {
  themeType: ThemeTypeEn;
  siteVariables: SiteVariablesInput;
  makeVars: (
    namespace: NamespaceType,
    names: NamesType
  ) => IZxComponentNamespaceVairablesObjectNames | ComponentNamespaceVariablesBooleanType;
}

export interface ComponentStylesParamsType {
  props: Record<string, unknown>;
  variables: ComponentVariablesInput;
  theme: ThemePrepared;
}
