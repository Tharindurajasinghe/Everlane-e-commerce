// File: src/context/CartContext.jsx
// This context is used to store items in the cart and update them from any component.

import { createContext, useState, useEffect } from "react";

// Create the context (we can use this in any component)
export const CartContext = createContext();

// Provider component (wraps the whole app)
export function CartProvider({ children }) {

  // Cart state – will store all cart items
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage when app starts
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addItem = (item) => {
    setCartItems((prev) => {
      // If item already in cart → increase quantity
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      // Else → add new item
      return [...prev, item];
    });
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
