import React from "react";
import { createSSEEditorJS } from "@sse-editor/use";
import Paragraph from "@sse-editor/plugins/paragraph";
// import Embed from "@sse-editor/plugins/embed";
import Table from "@sse-editor/plugins/table";
import List from "@sse-editor/plugins/list";
import Code from "@sse-editor/plugins/code";
import Image from "@sse-editor/plugins/image";
import Delimiter from "@sse-editor/plugins/delimiter";
// import Paragraph from "@sse-editor/plugins/paragraph";

const SSE_ReactEditorJS = createSSEEditorJS();

class ReactEditor extends React.Component {
  render() {
    return (
      <SSE_ReactEditorJS
        tools={{
          paragraph: Paragraph,
          table: Table,
          list: List,
          code: Code,
          image: Image,
          delimiter: Delimiter,
        }}
      />
    );
  }
}

export default ReactEditor