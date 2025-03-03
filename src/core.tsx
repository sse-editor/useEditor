import type { EditorConfig, OutputData } from "@sse-editor/types";
import React from "react";

export interface EditorCore {
  destroy(): Promise<void>;
  clear(): Promise<void>;
  save(): Promise<OutputData>;
  render(data: OutputData): Promise<void>;
  get dangerouslyLowLevelInstance(): any | null;
}

export interface Props extends Omit<EditorConfig, "data"> {
  factory: EditorCoreFactory;
  holder?: string;
  children?: React.ReactElement;
  value?: EditorConfig["data"];
  defaultValue?: EditorConfig["data"];
  onInitialize?: (core: EditorCore) => void;
}

export type EditorCoreFactory = (config: EditorConfig) => EditorCore;
export type WrapperProps = Omit<Props, "factory">;

function ReactEditorJS({
  factory,
  holder,
  defaultValue,
  children,
  value,

  onInitialize,
  ...restProps
}: Props): React.ReactElement {
  const memoizedHolder = React.useRef(
    holder ?? `react-editor-js-${Date.now().toString(16)}`
  );

  const editorJS = React.useRef<EditorCore | null>(null);

  React.useEffect(() => {
    editorJS.current = factory({
      holder: memoizedHolder.current,
      ...(defaultValue && { data: defaultValue }),
      ...restProps,
    });

    onInitialize?.(editorJS.current);

    return () => {
      editorJS.current?.destroy();
    };
  }, []);

  React.useEffect(() => {
    if (value) {
      editorJS.current?.render(value);
    }
  }, [value]);

  return children || <div id={memoizedHolder.current} />;
}

export { ReactEditorJS };
