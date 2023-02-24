import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import Storefront from "@nacelle/storefront-sdk";

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
      <h1 style={{ color: "#bd93f9" }}>Nacelle + Fuse Demo</h1>

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

      {/*
      <p>{products.length} products retrieved</p>
      <div
        style={{
          height: 350,
          overflow: "scroll",
          background: "#282a36",
          color: "#50fa7b",
          fontSize: 14,
          padding: 10,
        }}
      >
        <pre>{JSON.stringify(products, null, 2)}</pre>
      </div>
      */}

      <h2>Search</h2>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => searchForProducts(e.target.value)}
      />
      {searchResults.length > 0 && (
        <p style={{ color: "#50fa7b" }}>{searchResults.length} results found</p>
      )}

      {searchResults.map((product) => (
        <div key={product.id}>
          {product.content.featuredMedia !== null && (
            <img src={product.content.featuredMedia.thumbnailSrc} />
          )}
          <h3>{product.content.title}</h3>
        </div>
      ))}

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.content.title}</h3>
          {product.content.featuredMedia !== null && (
            <img src={product.content.featuredMedia.thumbnailSrc} />
          )}
        </div>
      ))}
    </>
  );
}

export default App;
