import useFetch from "../hooks/useFetch";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";

interface ProductResponse {
  products: Product[];
}

function ProductList() {
  const { data, loading, error } = useFetch<ProductResponse>(
    "https://dummyjson.com/products",
  );

  const { dispatch } = useCart();

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Products</h1>

      {data?.products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>

          <p>${product.price}</p>

          <button
            onClick={() =>
              dispatch({
                type: "ADD_ITEM",
                product,
              })
            }
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
