import { INamespaceStyles } from "../../../../types";

export default {
  root: {
    sendMessageButton: () => {
      return {
        color: "purple",
        backgroundColor: "purple"
      };
    },
    deleteItemButton: () => {
      return {
        color: "red"
      };
    }
  }
} as INamespaceStyles;
