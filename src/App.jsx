import { useState } from "react";
import Fuse from "fuse.js";
import Storefront from "@nacelle/storefront-sdk";

import ProductList from "./ProductList";

function App() {
  const [spaceId, setSpaceId] = useState("");
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const storefrontEndpoint = `https://storefront.api.nacelle.com/graphql/v1/spaces/${spaceId}`;

  async function getProducts() {
    const client = new Storefront({
      token,
      storefrontEndpoint,
    });

    const productsResp = await client.products();
    setProducts(productsResp);
  }

  function searchForProducts(query) {
    const fuse = new Fuse(products, {
      keys: ["content.title", "content.description"],
    });

    const results = fuse.search(query);
    setSearchResults(results.map((result) => result.item));
  }

  return (
    <>
      <h1 style={{ color: "#bd93f9" }}>Nacelle + Fuse.js Demo</h1>

      <input
        type="text"
        placeholder="Space ID"
        onChange={(e) => setSpaceId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Token"
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={getProducts}>Load Products</button>

      <h2 style={{ color: "#bd93f9" }}>Search</h2>

      <input
        type="text"
        placeholder="Search"
        onChange={(e) => searchForProducts(e.target.value)}
      />

      {searchResults.length > 0 && (
        <p style={{ color: "#50fa7b" }}>{searchResults.length} results found</p>
      )}

      {searchResults.length > 0 ? (
        <ProductList products={searchResults} />
      ) : (
        <ProductList products={products} />
      )}
    </>
  );
}

export default App;
