import path from "path";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";

function createRollupConfig({ basePath }) {
  return {
    input: path.join(basePath, "index.ts"),
    output: [
      {
        file: path.join(
          process.cwd(),
          "dist",
          `${path.basename(basePath)}.cjs.js`
        ),
        format: "cjs",
      },
      {
        file: path.join(process.cwd(), "dist", `${path.basename(basePath)}.js`),
        format: "es",
      },
    ],
    plugins: [
      typescript({
        tsconfig: path.join(process.cwd(), "tsconfig.json"),
        cwd: basePath,
        clean: true,
      }),
      resolve({
        extensions: [".ts", ".js"],
      }),
      copy({
        targets: [
          {
            src: path.resolve("./README.md"),
            dest: basePath,
          },
        ],
      }),
    ],
    external: [
      "react",
      "@sse-editor/editor.js",
      "@sse-editor/plugins",
      "@sse-editor/types",
    ],
  };
}

export default [
  {
    input: path.join("./src/index.ts"),
    output: [
      {
        file: path.join(process.cwd(), "dist", `index.cjs.js`),
        format: "cjs",
      },
      {
        file: path.join(process.cwd(), "dist", `index.js`),
        format: "es",
      },
      {
        file: path.join(process.cwd(), "dist", `index.browser.js`),
        format: "iife",
      },
    ],
    plugins: [
      typescript({
        tsconfig: path.join(process.cwd(), "tsconfig.json"),
        clean: true,
      }),
      resolve({
        extensions: [".ts", ".js"],
      }),
      copy({
        targets: [
          {
            src: path.resolve("./README.md"),
            dest: path.join(process.cwd(), "dist"),
          },
        ],
      }),
    ],
    external: [
      "react",
      "@sse-editor/editor.js",
      "@sse-editor/plugins",
      "@sse-editor/types",
    ],
  },
];
