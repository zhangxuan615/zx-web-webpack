import React from "react";
import { TeamsThemeUIProvider } from "../TeamsUIProvider";

import { ThemeTypeEn } from "../TeamsUIProvider/types";
import Message from "../Message";

const QuickStart = () => {
  return (
    <>
      <h1>fluentui</h1>
      <TeamsThemeUIProvider themeType={ThemeTypeEn.teamsDefaultTheme}>
        <Message />
      </TeamsThemeUIProvider>
      <TeamsThemeUIProvider themeType={ThemeTypeEn.teamsV2Theme}>
        <Message />
      </TeamsThemeUIProvider>
      <TeamsThemeUIProvider themeType={ThemeTypeEn.teamsDarkTheme}>
        <Message />
      </TeamsThemeUIProvider>
      <TeamsThemeUIProvider themeType={ThemeTypeEn.teamsDarkV2Theme}>
        <Message />
      </TeamsThemeUIProvider>
    </>
  );
};

export default QuickStart;
