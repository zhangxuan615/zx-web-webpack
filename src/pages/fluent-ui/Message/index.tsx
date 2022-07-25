import React from "react";
import { Button } from "@fluentui/react-northstar";
import { useTeamsThemeUIContext } from "../TeamsUIProvider";

const Message = () => {
  const { makeVars } = useTeamsThemeUIContext();
  return (
    <>
      <h2>message</h2>
      <Button variables={makeVars("message", ["sendMessageButton"])}>点击</Button>
    </>
  );
};

export default Message;
