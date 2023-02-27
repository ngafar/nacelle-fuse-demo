export default function ProductList({ products }) {
  return (
    <>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.content.title}</h3>

          {product.content.featuredMedia !== null && (
            <img
              src={product.content.featuredMedia.thumbnailSrc}
              style={{ border: "1px solid #50fa7b", borderRadius: 5 }}
            />
          )}
        </div>
      ))}
    </>
  );
}
