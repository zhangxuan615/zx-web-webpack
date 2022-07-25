import { INamespaceStyles } from "../../../../types";

export default {
  root: {
    sendMessageButton: () => {
      return {
        color: "green",
        backgroundColor: "green"
      };
    },
    deleteItemButton: () => {
      return {
        color: "red"
      };
    }
  }
} as INamespaceStyles;
