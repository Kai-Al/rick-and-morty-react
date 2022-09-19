import { useState } from "react";
import { useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import Character from "./Character";

function CharacterList() {
  const [characters, setCharacters] = useState([]);

  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    async function fetchData() {
      const response = await client.query({
        query: gql`
          query {
            characters {
              results {
                id
                name
                image
              }
            }
          }
        `,
      });
      setCharacters(response.data.characters.results);
    }

    fetchData();
  }, []);
  return (
    <div>
      {" "}
      {characters.map((character) => {
        return (
            <Character character={character} />
        );
      })}
    </div>
  );
}

export default CharacterList;
