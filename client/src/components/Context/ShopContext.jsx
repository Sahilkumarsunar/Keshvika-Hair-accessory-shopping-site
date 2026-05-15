import { createContext, useState, useEffect } from "react";
import { products } from "../assets/products";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [menu, setMenu] = useState("home");
  const [cartItems, setCartItems] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const delivery_fee = 10;

  // Load cart and auth from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedUser = localStorage.getItem('user');
    
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems({});
      }
    }

    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Login function
  const login = async (email, password) => {
    try {
      // For demo purposes - replace with actual API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      if (!email || !password) {
        return { success: false, message: 'Please provide email and password' };
      }

      // Demo validation - accept any email/password for now
      const userData = { 
        email, 
        name: email.split('@')[0],
        id: Date.now()
      };
      
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true, message: 'Login successful' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      // For demo purposes - replace with actual API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      if (!name || !email || !password) {
        return { success: false, message: 'Please fill in all fields' };
      }

      if (password.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters' };
      }

      // Demo - accept registration
      const userData = { 
        email, 
        name,
        id: Date.now()
      };
      
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCartItems({});
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  };

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    if (!product) {
      console.error('Product is undefined');
      return;
    }

    const productId = product._id || product.id;
    
    setCartItems((prev) => {
      const currentQty = prev[productId]?.quantity || 0;
      return {
        ...prev,
        [productId]: {
          ...product,
          quantity: currentQty + quantity
        }
      };
    });

    console.log('Item added to cart successfully');
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  // Update item quantity
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantity: quantity
      }
    }));
  };

  // Get total cart amount
  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const item = cartItems[itemId];
      total += (item.price || 0) * (item.quantity || 0);
    }
    return total;
  };

  // Get total cart items count
  const getTotalCartItems = () => {
    let total = 0;
    for (const itemId in cartItems) {
      total += cartItems[itemId]?.quantity || 0;
    }
    return total;
  };

  // Alias function for backward compatibility
  const getCartCount = () => {
    return getTotalCartItems();
  };

  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem('cart');
  };

  const value = {
    products,
    delivery_fee,
    menu,
    setMenu,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getTotalCartAmount,
    getTotalCartItems,
    getCartCount,
    clearCart,
    isAuthenticated,
    user,
    login,
    register,
    logout
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;