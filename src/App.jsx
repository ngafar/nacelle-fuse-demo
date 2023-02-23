import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import Storefront from "@nacelle/storefront-sdk";

function App() {
  const [spaceId, setSpaceId] = useState("");
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);

  const storefrontEndpoint = `https://storefront.api.nacelle.com/graphql/v1/spaces/${spaceId}`;

  async function getProducts() {
    const client = new Storefront({
      token,
      storefrontEndpoint,
    });

    const productsResp = await client.products();

    const productTitles = [];

    productsResp.forEach((product) => {
      productTitles.push(product.content.title);
    });

    setProducts(productsResp);
  }

  return (
    <>
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
    </>
  );
}

export default App;
