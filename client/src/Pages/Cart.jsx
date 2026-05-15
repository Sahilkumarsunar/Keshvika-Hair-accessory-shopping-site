import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../components/Context/ShopContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateCartQuantity,
    getTotalCartAmount,
    delivery_fee
  } = useContext(ShopContext);

  // Convert cartItems object to array safely
  const cartArray = cartItems ? Object.values(cartItems) : [];
  const isEmpty = cartArray.length === 0;

  const subtotal = getTotalCartAmount();
  const total = subtotal + (subtotal > 0 ? delivery_fee : 0);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  if (isEmpty) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-empty">
            <h2>Your Cart is Empty</h2>
            <p>Add some products to your cart to see them here.</p>
            <button 
              className="continue-shopping-btn"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>

        <div className="cart-content">
          <div className="cart-items">
            {cartArray.map((item) => {
              const productId = item._id || item.id;
              const price = parseFloat(item.price || 0);
              const quantity = parseInt(item.quantity || 0);
              const itemTotal = (price * quantity).toFixed(2);

              return (
                <div key={productId} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <p className="item-price">₹{price.toFixed(2)}</p>
                  </div>

                  <div className="item-quantity">
                    <button
                      className="qty-btn"
                      onClick={() => handleQuantityChange(productId, quantity - 1)}
                    >
                      -
                    </button>
                    <span className="qty-display">{quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => handleQuantityChange(productId, quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-total">
                    <p>₹{itemTotal}</p>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(productId)}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Fee:</span>
              <span>₹{subtotal > 0 ? delivery_fee.toFixed(2) : '0.00'}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>

            <button 
              className="continue-shopping-btn-outline"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;