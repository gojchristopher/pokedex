import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Reference,
} from "@apollo/client";
import { useState } from "react";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";
import {
  offsetLimitPagination,
  concatPagination,
} from "@apollo/client/utilities";

const pokedexapi = new HttpLink({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
});

const authentication = new HttpLink({
  uri: "https://frontend-engineer-onboarding-api-thxaa.ondigitalocean.app/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const data = await getSession();
  const token = data?.user!;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemon_v2_pokemon: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "pokedexapi",
    pokedexapi,
    authLink.concat(authentication)
  ),
  cache,
});
export default client;
