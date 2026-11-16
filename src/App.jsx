import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductCatalog from "./components/ProductCatalog";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import NotFound from "./components/NotFound";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("shopEase_theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("shopEase_theme", theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className={`min-vh-100 ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <NavBar 
        cartCount={cartCount} 
        user={user} 
        onLogout={() => setUser(null)} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      <Routes>
        <Route path="/" element={<ProductCatalog addToCart={addToCart} />} />
        <Route path="/products" element={<ProductCatalog addToCart={addToCart} />} />
        <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route
          path="/checkout"
          element={
            user ? (
              <Checkout cart={cart} clearCart={clearCart} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;