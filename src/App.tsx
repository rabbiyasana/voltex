import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import type { AppDispatch, RootState } from "./app/store";
import { fetchProductCategories } from "./slices/productSlice";

import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import CheckoutPage from "./pages/CheckoutPage";
import RegisterPage from "./pages/RegisterPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const dispatch = useDispatch<AppDispatch>();

  const categoriesFromApi = useSelector(
    (state: RootState) => state.products.categories
  );
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  useEffect(() => {
    dispatch(fetchProductCategories());
  }, [dispatch]);

  const categories = [
    "All",
    ...categoriesFromApi,
  ];
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Header
        categories={categories}
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
              categories={categories}
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
              categories={categories}
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
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/register"
          element={<RegisterPage />}
        />
      </Routes>
    </div>
  );
}

export default App;