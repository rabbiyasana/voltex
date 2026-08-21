import { useState } from "react";
import Header from "./components/Header";
import HomePage from "./pages/Home";

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

      <HomePage
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}

export default App;