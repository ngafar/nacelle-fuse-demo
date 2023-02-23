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
      
      {JSON.stringify(products)}
    </>
  );
}

export default App;
