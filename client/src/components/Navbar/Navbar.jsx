// client/src/components/Navbar/Navbar.jsx
import React, { useState, useContext } from "react";
import Logo from "../assets/Keshvika-logo1.png";
import "./Navbar.css";
import { CiSearch, CiShoppingCart, CiMenuBurger } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { menu, setMenu, isAuthenticated, user, logout, getCartCount } = useContext(ShopContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <div>
      <div className="navbar">
        <div className="nav-logo" onClick={() => setMenu("home")}>
          <Link to="/">
            <img className="logo" src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className="hamburger-menu" onClick={toggleMobileMenu}>
          <CiMenuBurger size={30} />
        </div>

        <div
          className={`nav-menu ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}
        >
          <div className="nav-search">
            <CiSearch size={25} />
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
          </div>
          <div className="nav-pages">
            <ul className="nav-page-ul">
              <li
                onClick={() => {
                  setMenu("home");
                  setIsMobileMenuOpen(false);
                }}
              >
                <Link to="/" className="navlink">
                  Home
                </Link>
                {menu === "home" ? <hr /> : <></>}
              </li>
              <li
                onClick={() => {
                  setMenu("products");
                  setIsMobileMenuOpen(false);
                }}
              >
                <Link to="/products" className="navlink">
                  Product
                </Link>
                {menu === "products" ? <hr /> : <></>}
              </li>
              <li
                onClick={() => {
                  setMenu("offers");
                  setIsMobileMenuOpen(false);
                }}
              >
                <Link to="/offers" className="navlink">
                  Offers
                </Link>
                {menu === "offers" ? <hr /> : <></>}
              </li>
              <li
                onClick={() => {
                  setMenu("contact");
                  setIsMobileMenuOpen(false);
                }}
              >
                <Link to="/contact" className="navlink">
                  Contact
                </Link>
                {menu === "contact" ? <hr /> : <></>}
              </li>
            </ul>
          </div>
          <div className="nav-button-cart">
            {isAuthenticated ? (
              <>
                <div className="user-info">
                  <span className="user-name">Hi, {user?.name?.split(' ')[0]}</span>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="butn-login">
                <Link to="/login">
                  <button>Login</button>
                </Link>
              </div>
            )}
            <div className="nav-cart">
              <Link to="/cart">
                <CiShoppingCart
                  size={30}
                  onClick={() => setMenu("cart")}
                  className="cart-logo"
                />
              </Link>
              <div className="nav-cart-count">{getCartCount()}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="navwhite"></div>
    </div>
  );
};

export default Navbar;