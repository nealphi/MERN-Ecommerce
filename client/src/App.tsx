import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import AuthPage from "./pages/auth";
import ShopPage from "./pages/shop";
import CheckoutPage from "./pages/checkout";
import { ShopContextProvider } from "./context/shop-contex";
import PurchasedItemsPage from "./pages/purchased-items";
import NealphiPage from "./pages/nealphi";

function App() {

  return (
    <div className="App">
      <Router>
        <ShopContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<NealphiPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/purchased-items"  element={<PurchasedItemsPage/>} />
          </Routes>
        </ShopContextProvider>
      </Router>
    </div>
  );
}

export default App;
