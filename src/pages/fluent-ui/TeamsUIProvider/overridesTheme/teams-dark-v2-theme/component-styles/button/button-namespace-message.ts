import { INamespaceStyles } from "../../../../types";

export default {
  root: {
    sendMessageButton: () => {
      return {
        color: "yellow",
        backgroundColor: "yellow"
      };
    },
    deleteItemButton: () => {
      return {
        color: "red"
      };
    }
  }
} as INamespaceStyles;
