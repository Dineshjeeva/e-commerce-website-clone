import { BrowserRouter, Route, Routes } from "react-router-dom";

import Cart from "./pages/cart";
import Footer from "./components/appFooter";
import Header from "./components/appHeader";
import Home from "./pages/Home";
import ProductDetail from "./pages/productDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
