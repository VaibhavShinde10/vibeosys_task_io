import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<ProductForm />} />
        <Route
          path="/edit/:id"
          element={
            <ProductForm
              isEdit
              initialData={
                // Assuming you use a dynamic way to fetch products
                // You might handle this using Redux logic in the ProductForm component
                {}
              }
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
