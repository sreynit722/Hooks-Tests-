import { useState } from "react";

import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
import CheckoutSummary from "./components/CheckoutSummary";

function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div
      className={
        isDark
          ? "min-h-screen bg-slate-950 text-slate-100"
          : "min-h-screen bg-sky-50 text-slate-900"
      }
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <NavBar
          isDark={isDark}
          onToggleTheme={() => setIsDark((value) => !value)}
        />

        <main className="mt-8 grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
          <ProductList isDark={isDark} />
          <CheckoutSummary isDark={isDark} />
        </main>
      </div>
    </div>
  );
}

export default App;
