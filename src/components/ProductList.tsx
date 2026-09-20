import { ShoppingCart, Star } from "lucide-react";

import { useCart } from "../context/CartContext";
import useFetch from "../hooks/useFetch";
import type { Product } from "../types";

interface ProductResponse {
  products: Product[];
}

interface ProductListProps {
  isDark: boolean;
}

function ProductList({ isDark }: ProductListProps) {
  const { data, loading, error } = useFetch<ProductResponse>(
    "https://dummyjson.com/products",
  );

  const { dispatch } = useCart();

  const panelClass = isDark
    ? "rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl shadow-slate-950/20 backdrop-blur-sm sm:p-6"
    : "rounded-3xl border border-blue-100 bg-white/80 p-4 shadow-xl shadow-blue-100/70 backdrop-blur-sm sm:p-6";

  const labelClass = isDark ? "text-blue-300/80" : "text-blue-700/80";
  const titleClass = isDark ? "text-white" : "text-slate-900";
  const pageBadgeClass = isDark
    ? "border border-blue-500/30 bg-blue-500/10 text-blue-200"
    : "border border-blue-200 bg-blue-50 text-blue-700";
  const cardClass = isDark
    ? "group overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/50 transition duration-200 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10"
    : "group overflow-hidden rounded-2xl border border-blue-100 bg-sky-50 transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-200";
  const imageOverlayClass = isDark
    ? "bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"
    : "bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent";
  const chipClass = isDark
    ? "border border-slate-700 bg-slate-900/80 text-slate-200"
    : "border border-blue-200 bg-white text-slate-700";

  if (loading) {
    return (
      <section className={panelClass}>
        <div
          className={`flex items-center justify-center gap-3 ${isDark ? "text-slate-300" : "text-slate-600"}`}
        >
          <div
            className={`h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent`}
          />
          Loading products...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className={
          isDark
            ? "rounded-3xl border border-red-500/30 bg-red-500/5 p-8 text-red-200"
            : "rounded-3xl border border-red-200 bg-red-50 p-8 text-red-600"
        }
      >
        {error}
      </section>
    );
  }

  return (
    <section className={panelClass}>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p
            className={`text-xs font-medium uppercase tracking-[0.24em] ${labelClass}`}
          >
            Featured
          </p>
          <h2 className={`mt-2 text-3xl font-bold ${titleClass}`}>Products</h2>
        </div>
        <div className={`rounded-full px-3 py-1 text-sm ${pageBadgeClass}`}>
          {data?.products.length ?? 0} items
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data?.products.map((product) => (
          <article key={product.id} className={cardClass}>
            <div className="relative h-44 overflow-hidden bg-slate-900">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div
                className={`absolute inset-x-0 bottom-0 p-3 ${imageOverlayClass}`}
              >
                <div
                  className={`flex items-center justify-between text-xs ${isDark ? "text-slate-200" : "text-slate-100"}`}
                >
                  <span className={chipClass}>New arrival</span>
                  <span className="flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-500/10 px-2 py-1 text-amber-500">
                    <Star className="h-3 w-3 fill-current" />
                    4.8
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-4">
              <div className="flex items-start justify-between gap-3">
                <h3
                  className={`line-clamp-2 text-lg font-semibold ${titleClass}`}
                >
                  {product.title}
                </h3>
                <p
                  className={
                    isDark
                      ? "text-lg font-bold text-blue-300"
                      : "text-lg font-bold text-blue-700"
                  }
                >
                  ${product.price}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: "ADD_ITEM",
                    product,
                  })
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProductList;
