import { CodegenConfig } from "@graphql-codegen/cli";
import { API_URL } from "./core/config/apollo-client";

const codegen: CodegenConfig = {
  schema: API_URL,
  documents: ["./{core,pages}/**/*.{ts,tsx,js,jsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./gql/": {
      preset: "client",
      plugins: [],
      config: {
        scalars: {
          JSONObject: "Record<string, any>",
        },
      },
    },
  },
};

export default codegen;
