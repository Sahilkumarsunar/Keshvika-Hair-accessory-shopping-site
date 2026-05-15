import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ProductDetail.css";
import { ShopContext } from "../components/Context/ShopContext";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    if (!products || products.length === 0) {
      setProductData(null);
      setLoading(false);
      return;
    }

    const found = products.find(
      (p) => String(p._id ?? p.id) === String(productId)
    );
    setProductData(found ?? null);
    setQty(1);
    setLoading(false);
  }, [productId, products]);

  const increment = () => setQty((q) => q + 1);
  const decrement = () => setQty((q) => (q > 1 ? q - 1 : q));

  const handleAddToCart = () => {
    if (!productData) {
      setMessage('Product data not available');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      addToCart(productData, qty);
      setMessage('✓ Added to cart successfully!');

      setTimeout(() => {
        setMessage('');
        navigate("/cart");
      }, 1000);

    } catch (error) {
      console.error('Error adding to cart:', error);
      setMessage('Failed to add to cart');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="pd-page">
        <div className="pd-container">
          <p className="pd-loading">Loading...</p>
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="pd-page">
        <div className="pd-container pd-empty">
          <h2>Product not found</h2>
          <p>We couldn't find the product you're looking for.</p>
          <div className="pd-actions">
            <Link to="/products" className="pd-link-btn">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const price = productData.price ?? 0;

  return (
    <div className="pd-page">
      <div className="pd-container">
        <div className="pd-card">
          <div className="pd-image">
            <img
              src={productData.image || "/placeholder.jpg"}
              alt={productData.title}
            />
          </div>

          <div className="pd-details">
            <h1 className="pd-title">{productData.title}</h1>
            <p className="pd-price">₹{price}</p>

            {/* Rating Removed */}

            <p className="pd-desc">
              {productData.description || "No description available."}
            </p>

            {message && (
              <div className={`pd-message ${message.includes('✓') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <div className="pd-quantity-row">
              <div className="quantity-control">
                <button className="quantity-btn" onClick={decrement}>
                  -
                </button>
                <span className="quantity-display">{qty}</span>
                <button className="quantity-btn" onClick={increment}>
                  +
                </button>
              </div>

              <button className="pd-add-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>

            <div className="pd-bottom-links">
              <Link to="/products" className="pd-link-btn">
                Back to Products
              </Link>
              <button
                className="pd-link-btn-outline"
                onClick={() => {
                  navigate("/products");
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
