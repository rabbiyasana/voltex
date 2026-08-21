import { Search, ShoppingCart } from "lucide-react";
function App() {

  return (
  <>
 <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-600">
       Voltex
      </h1>
      <div className="flex gap-4">
        <Search />
        <ShoppingCart />
      </div>
    </div>
  </>
  )
}

export default App
