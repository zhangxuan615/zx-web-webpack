import { INamespaceStyles } from "../../../../types";

export default {
  root: {
    sendMessageButton: () => {
      return {
        color: "red",
        background: "red"
      };
    },
    deleteItemButton: () => {
      return {
        color: "red"
      };
    }
  }
} as INamespaceStyles;
