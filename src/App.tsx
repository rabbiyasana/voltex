import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./pages/Home";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onSearchChange={setSearchTerm}
            />
          }
        />
        <Route
          path="/products"
          element={
            <HomePage
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onSearchChange={setSearchTerm}
            />
          }
        />
        <Route
          path="/products/:id"
          element={<ProductDetailsPage />}
        />
        <Route
          path="/cart"
          element={<CartPage />}
        />
        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />
      </Routes>
    </div>
  );
}

export default App;