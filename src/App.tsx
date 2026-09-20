import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
import CheckoutSummary from "./components/CheckoutSummary";

function App() {
  return (
    <div>
      <NavBar />

      <main>
        <ProductList />

        <CheckoutSummary />
      </main>
    </div>
  );
}

export default App;
