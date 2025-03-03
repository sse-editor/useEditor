import { EditorConfig } from "@sse-editor/editor.js";
import { EditorCore, WrapperProps as Props, ReactEditorJS } from "./core";
import SSEEditor, { OutputData } from "@sse-editor/types";
import Paragraph from "@sse-editor/plugins/paragraph";
import React from "react";

export class ClientEditorCore implements EditorCore {
  private _editorJS: SSEEditor;

  constructor({ tools, ...config }: EditorConfig) {
    const extendTools = {
      // default tools
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
      ...tools,
    };

    this._editorJS = new SSEEditor({
      tools: extendTools,
      ...config,
    });
  }

  public get dangerouslyLowLevelInstance() {
    return this._editorJS;
  }

  public async clear() {
    await this._editorJS.clear();
  }

  public async save() {
    return this._editorJS.save();
  }

  public async destroy() {
    await this._editorJS.isReady;
    await this._editorJS.destroy();
  }

  public async render(data: OutputData) {
    await this._editorJS.render(data);
  }
}

function ReactEditorJSClient(props: Props) {
  const factory = React.useCallback(
    (config: EditorConfig) => new ClientEditorCore(config),
    []
  );

  return <ReactEditorJS factory={factory} {...props} />;
}

export { ReactEditorJSClient }