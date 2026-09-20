import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

import { useCart } from "../context/CartContext";

interface CheckoutSummaryProps {
  isDark: boolean;
}

function CheckoutSummary({ isDark }: CheckoutSummaryProps) {
  const { state, dispatch } = useCart();

  const total = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const asideClass = isDark
    ? "rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-sm sm:p-6"
    : "rounded-3xl border border-blue-100 bg-white/80 p-5 shadow-xl shadow-blue-100/70 backdrop-blur-sm sm:p-6";
  const mutedText = isDark ? "text-slate-300" : "text-slate-600";
  const titleText = isDark ? "text-white" : "text-slate-900";
  const emptyStateClass = isDark
    ? "rounded-2xl border border-dashed border-slate-700 bg-slate-950/30 p-6 text-center text-slate-400"
    : "rounded-2xl border border-dashed border-blue-200 bg-blue-50 p-6 text-center text-slate-500";
  const itemClass = isDark
    ? "rounded-2xl border border-slate-800 bg-slate-950/50 p-3"
    : "rounded-2xl border border-blue-100 bg-sky-50 p-3";
  const controlsClass = isDark
    ? "flex items-center overflow-hidden rounded-lg border border-slate-700 bg-slate-900"
    : "flex items-center overflow-hidden rounded-lg border border-blue-200 bg-white";
  const controlsButtonClass = isDark
    ? "flex h-9 w-9 items-center justify-center text-slate-200 transition hover:bg-slate-800"
    : "flex h-9 w-9 items-center justify-center text-slate-700 transition hover:bg-blue-50";
  const totalCardClass = isDark
    ? "mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4"
    : "mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4";

  return (
    <aside className={asideClass}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p
            className={
              isDark
                ? "text-xs font-medium uppercase tracking-[0.24em] text-blue-300/80"
                : "text-xs font-medium uppercase tracking-[0.24em] text-blue-700/80"
            }
          >
            Checkout
          </p>
          <h2 className={`mt-2 text-2xl font-bold ${titleText}`}>
            Cart summary
          </h2>
        </div>
        <div
          className={
            isDark
              ? "flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300"
              : "flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700"
          }
        >
          <ShoppingCart className="h-5 w-5" />
        </div>
      </div>

      {state.items.length === 0 ? (
        <div className={emptyStateClass}>Your cart is empty.</div>
      ) : (
        <div className="space-y-4">
          {state.items.map((item) => (
            <div key={item.product.id} className={itemClass}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3
                    className={`truncate text-base font-semibold ${titleText}`}
                  >
                    {item.product.title}
                  </h3>
                  <p className={`mt-1 text-sm ${mutedText}`}>
                    ${item.product.price} each
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_ITEM",
                      productId: item.product.id,
                    })
                  }
                  className={
                    isDark
                      ? "inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-red-500/50 hover:text-red-300"
                      : "inline-flex h-8 w-8 items-center justify-center rounded-md border border-blue-200 bg-white text-slate-600 transition hover:border-red-300 hover:text-red-500"
                  }
                  aria-label={`Remove ${item.product.title}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div className={controlsClass}>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        productId: item.product.id,
                        quantity: item.quantity - 1,
                      })
                    }
                    className={controlsButtonClass}
                    aria-label={`Decrease quantity for ${item.product.title}`}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span
                    className={`min-w-10 text-center text-sm font-medium ${titleText}`}
                  >
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        productId: item.product.id,
                        quantity: item.quantity + 1,
                      })
                    }
                    className={controlsButtonClass}
                    aria-label={`Increase quantity for ${item.product.title}`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <p
                  className={
                    isDark
                      ? "text-sm font-semibold text-blue-200"
                      : "text-sm font-semibold text-blue-700"
                  }
                >
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={totalCardClass}>
        <div
          className={`flex items-center justify-between text-sm ${mutedText}`}
        >
          <span>Subtotal</span>
          <span>
            {state.items.reduce((sum, item) => sum + item.quantity, 0)} items
          </span>
        </div>
        <div
          className={`mt-3 flex items-center justify-between text-2xl font-bold ${titleText}`}
        >
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </aside>
  );
}

export default CheckoutSummary;
