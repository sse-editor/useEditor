import { WrapperProps } from "./core";
import { ReactEditorJSServer } from "./server";
import { ReactEditorJSClient } from "./client";

export function createSSEEditorJS(): (props: WrapperProps) => JSX.Element {
  if (typeof window !== "undefined") {
    return ReactEditorJSClient;
  } else {
    return ReactEditorJSServer;
  }
}

// export function createSSEEditorJS(): (props: WrapperProps) => JSX.Element {
//   if (typeof window !== "undefined") {
//     const Component = require("./client");
//     return Component.deault || Component;
//   } else {
//     const Component = require("./server");
//     return Component.deault || Component;
//   }
// }
