import { useCart } from "../context/CartContext";

function CheckoutSummary() {
  const { state, dispatch } = useCart();

  const total = state.items.reduce(
    (sum, item) =>
      sum +
      item.product.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Checkout</h2>

      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        state.items.map((item) => (
          <div key={item.product.id}>
            <h3>{item.product.title}</h3>

            <p>
              ${item.product.price} ×{" "}
              {item.quantity}
            </p>

            <button
              onClick={() =>
                dispatch({
                  type: "UPDATE_QUANTITY",
                  productId: item.product.id,
                  quantity:
                    item.quantity - 1,
                })
              }
            >
              -
            </button>

            <button
              onClick={() =>
                dispatch({
                  type: "UPDATE_QUANTITY",
                  productId: item.product.id,
                  quantity:
                    item.quantity + 1,
                })
              }
            >
              +
            </button>

            <button
              onClick={() =>
                dispatch({
                  type: "REMOVE_ITEM",
                  productId: item.product.id,
                })
              }
            >
              Remove
            </button>
          </div>
        ))
      )}

      <h3>
        Total: ${total.toFixed(2)}
      </h3>
    </div>
  );
}

export default CheckoutSummary;