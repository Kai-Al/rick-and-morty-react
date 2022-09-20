import { useState } from "react";
import { useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import Character from "./Character";
import NavPage from "./NavPage";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    async function fetchData() {
      const response = await client.query({
        query: gql`
          query {
            characters(page: ${page}) {
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
  }, [page]);
  return (
    <div className="container">
      <NavPage page={page} setPage={setPage} />

      {loading ? (
        <div className="spinner-border" role="status"></div>
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
      <NavPage page={page} setPage={setPage} />
    </div>
  );
}

export default CharacterList;
