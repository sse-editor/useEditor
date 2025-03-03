import React from "react";
import { ReactEditorJS } from "./core";
import type { EditorConfig, OutputData } from "@sse-editor/types";
import type { EditorCore, WrapperProps as Props } from "./core";

export class ServerEditorCore implements EditorCore {
  private _memoizedData: OutputData;
  constructor({ data }: EditorConfig) {
    if (data) {
      this._memoizedData = data;
    }
  }

  public get dangerouslyLowLevelInstance() {
    return null;
  }

  public async clear() {}
  public async save() {
    return this._memoizedData;
  }

  public async destroy() {}
  public async render() {}
}

function ReactEditorJSServer(props: Props) {
  const factory = React.useCallback(
    (config: EditorConfig) => new ServerEditorCore(config),
    []
  );

  return <ReactEditorJS factory={factory} {...props} />;
}

export { ReactEditorJSServer };
