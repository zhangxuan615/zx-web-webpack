import buttonNamespaceMessage from "./component-styles/button/button-namespace-message";
import buttonNamespaceUser from "./component-styles/button/button-namespace-user";
import textNamespaceMessage from "./component-styles/text/text-namespace-message";
import textNamespaceUser from "./component-styles/text/text-namespace-user";

/** overridesTeamsTheme component style namespaces */
export const teamsDarkThemeNamespace = {
  Button: {
    message: buttonNamespaceMessage,
    user: buttonNamespaceUser
  },
  Text: {
    message: textNamespaceMessage,
    user: textNamespaceUser
  }
};
