import { GraphQLClient } from "graphql-request";
import { API_URL } from "@/utils/consts";

export const graphqlClient = new GraphQLClient(API_URL);
