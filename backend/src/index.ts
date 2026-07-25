import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import fs from "fs";
import path from "path";

const dbPath = path.resolve(__dirname, "../sugestoes.json");
const dbData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

const typeDefs = `#graphql
    type Suggestion {
        id: Int!
        term: String!
    }
    
    type Query  {
        getSuggestions(query: String!): [Suggestion]
    }
`;

const resolvers = {
  Query: {
    getSuggestions: (_: any, args: { query: string }) => {
      const { query } = args;

      if (query.length < 4) return [];

      const lowerQuery = query.toLowerCase();
      const filtered = dbData.filter((item: any) =>
        item.term.toLowerCase().includes(lowerQuery),
      );

      return filtered.slice(0, 20);
    },
  },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

async function startServer() {
    const {url} = await startStandaloneServer(server, {
        listen: {port:4000},
    });
    console.log("Server started");
}

startServer();