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
  const [loading, setLoading] = useState(true);

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
                name
                image
                origin {
                  name
                }
              }
            }
          }
        `,
      });
      setLoading(false);
      setCharacters(response.data.characters.results);
    }

    fetchData();
  }, []);
  return (
    <div className="container">
      {loading ? (
        <div class="spinner-border" role="status"></div>
      ) : (
        <div className="row">
          {characters.map((character) => {
            return (
              <div className="col-md-4" key={character.id}>
                <Character character={character} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CharacterList;
