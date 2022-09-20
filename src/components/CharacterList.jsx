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
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <button className="btn btn-primary" onClick={() => setPage(page - 1)}>
            Back
          </button>
          <a className="navbar-brand">Page {page}</a>
          <button className="btn btn-primary" onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      </nav>

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
    </div>
  );
}

export default CharacterList;
