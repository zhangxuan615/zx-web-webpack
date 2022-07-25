import { INamespaceStyles } from "../../../../types";

export default {
  root: {
    sendMessageButton: () => {
      return {
        color: "blue"
      };
    },
    deleteItemButton: () => {
      return {
        color: "red"
      };
    }
  }
} as INamespaceStyles;
