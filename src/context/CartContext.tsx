import { createContext, useContext, useReducer, type ReactNode } from "react";

import {
  cartReducer,
  type CartAction,
  type CartState,
} from "../reducers/cartReducer";

const initialState: CartState = {
  items: [],
};

const CartContext = createContext<
  | {
      state: CartState;
      dispatch: React.Dispatch<CartAction>;
    }
  | undefined
>(undefined);

function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

export {
  CartProvider,
  useCart,
};