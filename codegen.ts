import { CodegenConfig } from "@graphql-codegen/cli";
import exp from "constants";
import { API_URL } from "./config/apollo-client";

const codegen: CodegenConfig = {
  schema: API_URL,
  documents: ["./{pages,components}/**/*.{ts,tsx,js,jsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default codegen;