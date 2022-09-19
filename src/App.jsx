import { useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { useState } from "react";

function App() {
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
      <h1> Rick and Morty </h1>
      {characters.map((character) => {
        return (
          <div key = {character.id}>
            <p>{character.name}</p>
            <img src={character.image} alt={character.name} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
