import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000",
  documents: "src/graphql/*.ts",
  generates: {
    "src/graphql/generated": {
      preset: "client",
      plugins: [],
      // plugins: ["typescript"],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
