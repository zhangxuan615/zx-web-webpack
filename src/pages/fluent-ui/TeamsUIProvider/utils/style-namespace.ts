import { teamsThemeNamespaceMap } from "../constants";
import {
  ComponentNamespaceVariablesBooleanType,
  ComponentStylesParamsType,
  IComponentNamespaceVairables,
  IComponentNamespaceVairablesObjectNames,
  IComponentNamespaceVairablesStringNames,
  IOverrideStyleFn,
  IOverrideStyleFnParams,
  IOverrideStyleFnProps,
  IZxComponentNamespaceVairables,
  IZxComponentNamespaceVairablesObjectNames,
  NamespaceType,
  ThemeTypeEn
} from "../types";

const VARIABLES_PREFIX = "zx_";
const VARIABLES_THEME_TYPE_PREFIX = `${VARIABLES_PREFIX}theme_type_`;
const VARIABLES_NAMESPACE_PREFIX = `${VARIABLES_PREFIX}namespace_`;
const VARIABLES_NAME_PREFIX = `${VARIABLES_PREFIX}name_`;

export function generateComponentNamespaceVariables(
  componentNamespaceVariables: IZxComponentNamespaceVairables
): IZxComponentNamespaceVairablesObjectNames | ComponentNamespaceVariablesBooleanType {
  const { themeType, namespace, names } = componentNamespaceVariables.zx;
  if (typeof names[0] === "object") {
    return componentNamespaceVariables as IZxComponentNamespaceVairablesObjectNames;
  }

  const componentNamespaceVariablesBoolean = {} as ComponentNamespaceVariablesBooleanType;
  names.forEach(name => {
    componentNamespaceVariablesBoolean[`${VARIABLES_NAME_PREFIX}${name}`] = true;
  });

  return {
    [VARIABLES_PREFIX]: true,
    [`${VARIABLES_THEME_TYPE_PREFIX}${themeType}`]: true,
    [`${VARIABLES_NAMESPACE_PREFIX}${namespace}`]: true,
    ...componentNamespaceVariablesBoolean
  } as ComponentNamespaceVariablesBooleanType;
}

function parseComponentNamespaceVariables(
  componentNamespaceVariables:
    | IZxComponentNamespaceVairablesObjectNames
    | ComponentNamespaceVariablesBooleanType
): IComponentNamespaceVairables | undefined {
  if (componentNamespaceVariables.zx) {
    return componentNamespaceVariables.zx as IComponentNamespaceVairablesObjectNames;
  }

  if ((componentNamespaceVariables as ComponentNamespaceVariablesBooleanType)[VARIABLES_PREFIX]) {
    const zxObj = {} as IComponentNamespaceVairablesStringNames;
    for (const key of Object.keys(componentNamespaceVariables)) {
      switch (true) {
        case key.startsWith(VARIABLES_THEME_TYPE_PREFIX):
          zxObj.themeType = key.replace(VARIABLES_THEME_TYPE_PREFIX, "") as ThemeTypeEn;
          break;
        case key.startsWith(VARIABLES_NAMESPACE_PREFIX):
          zxObj.namespace = key.replace(VARIABLES_NAMESPACE_PREFIX, "") as NamespaceType;
          break;
        case key.startsWith(VARIABLES_NAME_PREFIX):
          if (!zxObj.names) {
            zxObj.names = [];
          }
          (zxObj.names as string[]).push(key.replace(VARIABLES_NAME_PREFIX, ""));
          break;
        default:
          break;
      }
    }
    return zxObj;
  }

  return;
}

function getComponentNamespaceStyleFnsWithProps({
  componentNamespaceVariables,
  themeType,
  component,
  slot
}: {
  componentNamespaceVariables: IComponentNamespaceVairables;
  themeType: ThemeTypeEn;
  component: string;
  slot: string;
}): [IOverrideStyleFn, IOverrideStyleFnProps?][] {
  const { namespace, names } = componentNamespaceVariables;

  const stylesFns = teamsThemeNamespaceMap[themeType][component][namespace][slot];

  const overrideStyleFnsWithProps = [] as [IOverrideStyleFn, IOverrideStyleFnProps?][];
  names.forEach(item => {
    if (typeof item === "object") {
      const { name, props } = item;
      overrideStyleFnsWithProps.push([stylesFns[name], { ...props }]);
      return;
    }

    overrideStyleFnsWithProps.push([stylesFns[item], {}]);
  });

  return overrideStyleFnsWithProps;
}

export function getOverrideComponentStylesFromNamespace(
  componentStylesParams: ComponentStylesParamsType,
  themeType: ThemeTypeEn,
  component: string,
  slot = "root"
) {
  const {
    variables,
    theme: { siteVariables }
  } = componentStylesParams;
  const { ...componentNamespaceVariablesContainer } = variables;
  const { colorScheme, shadow2 } = siteVariables;

  /** 1. 从 variables 中提取组件样式空间参数 */
  const componentNamespaceVariables = parseComponentNamespaceVariables(
    componentNamespaceVariablesContainer
  );
  if (!componentNamespaceVariables) {
    return {};
  }

  /** 2. 根据样式空间参数提取样式 Fn */
  const overrideStyleFnsWithProps = getComponentNamespaceStyleFnsWithProps({
    componentNamespaceVariables,
    themeType,
    component,
    slot
  });

  /** 3. 根据样式 Fn 计算 style */
  const overrideFnParams: IOverrideStyleFnParams = {
    colorSchemeDefault: colorScheme.default,
    colorSchemeBrand: colorScheme.brand,
    fontSizes: {},
    shadow2,
    overrideStyleFnProps: {}
  };
  const overrideStyles = overrideStyleFnsWithProps.reduce((pre, cur) => {
    const [overrideStyleFn, overrideStyleFnProps = {}] = cur;
    return {
      ...pre,
      ...overrideStyleFn({ ...overrideFnParams, overrideStyleFnProps })
    };
  }, {});

  return overrideStyles;
}
